import express from "express";
import cors from "cors";
import { PrismaClient } from "./generated/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";

dotenv.config();

// initialize the db client
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const app = express();

// middleware to allow nextjs frontend to talk to this api
app.use(cors());
app.use(express.json());

// test route to check if api is awake
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "API is running!" });
});

// route to fetch portfolio projects
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(projects);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
