import { Router } from "express";
import {
  getProjectById,
  createProject,
  updateProject,
  getAllProjects,
  deleteProject,
} from "../controller/project.controller";

const router = Router();
router.get("/", getAllProjects);

router.get("/:id", getProjectById);

router.post("/", createProject);

router.patch("/:id", updateProject);

router.patch("/del/:id", deleteProject);

export default router;
