import "dotenv/config";
import express from "express";
import cors from "cors";
import { prisma } from "./db";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import uploadRoutes from "./routes/upload.routes";

dotenv.config();

// initialize the db client
const app = express();

// middleware to allow nextjs frontend to talk to this api
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use("/api/uploadthing", uploadRoutes);

app.use(express.json());
app.use(cookieParser());

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

// routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
