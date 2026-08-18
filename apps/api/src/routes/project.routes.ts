import { Router } from "express";
import {
  getProjectById,
  createProject,
  updateProject,
  toggleFeaturedProject,
  getAllProjects,
  getAllLiveProjects,
  getAllFeaturedProjects,
  getProjectBySlug,
  deleteProject,
} from "../controller/project.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();
router.get("/", getAllProjects);

router.get("/live", getAllLiveProjects);

router.get("/featured", getAllFeaturedProjects);

router.get("/:id", getProjectById);

router.get("/:slug/details", getProjectBySlug);

router.post("/", authenticateToken, createProject);

router.patch("/:id", authenticateToken, updateProject);

router.patch("/:id/del", authenticateToken, deleteProject);

router.patch("/:id/feat", toggleFeaturedProject);

export default router;
