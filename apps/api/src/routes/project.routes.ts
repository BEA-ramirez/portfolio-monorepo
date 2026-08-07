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

const router = Router();
router.get("/", getAllProjects);

router.get("/live", getAllLiveProjects);

router.get("/:id", getProjectById);

router.get("/:slug/details", getProjectBySlug);

router.post("/", createProject);

router.patch("/:id", updateProject);

router.patch("/:id/del", deleteProject);

export default router;
