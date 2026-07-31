import { Router } from "express";
import {
  getProjectById,
  createProject,
  updateProject,
} from "../controller/project.controller";

const router = Router();

router.get("/:id", getProjectById);

router.post("/", createProject);

router.patch("/:id", updateProject);

export default router;
