import "dotenv/config";
import express from "express";
import cors from "cors";
import { prisma } from "./db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import projectRoutes from "./routes/project.routes.js";
import blogRoutes from "./routes/blog.routes.js";

dotenv.config();

// initialize the db client
const app = express();

// middleware to allow nextjs frontend to talk to this api
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
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

// routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/blog", blogRoutes);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Local server is running on http://localhost:${PORT}`);
  });
}

export default app;
