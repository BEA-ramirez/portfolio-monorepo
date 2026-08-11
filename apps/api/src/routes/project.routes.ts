import { Router } from "express";
import {
  getProjectById,
  createProject,
  updateProject,
  getAllProjects,
  getAllLiveProjects,
  getProjectBySlug,
  deleteProject,
} from "../controller/project.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();
router.get("/", getAllProjects);

router.get("/live", getAllLiveProjects);

router.get("/:id", getProjectById);

router.get("/:slug/details", getProjectBySlug);

router.post("/", authenticateToken, createProject);

router.patch("/:id", authenticateToken, updateProject);

router.patch("/:id/del", authenticateToken, deleteProject);

export default router;
