import { Router } from "express";
import {
  getProjectById,
  createProject,
  updateProject,
  getAllProjects,
} from "../controller/project.controller";

const router = Router();
router.get("/", getAllProjects);

router.get("/:id", getProjectById);

router.post("/", createProject);

router.patch("/:id", updateProject);

export default router;
