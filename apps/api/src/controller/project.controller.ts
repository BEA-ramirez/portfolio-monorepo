import { Request, Response } from "express";
import { prisma } from "../db";

// GET : fetch single project using id
export const getProjectById = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST : Create new project
export const createProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = req.body;

    // prisma creates record to neon
    const newProject = await prisma.project.create({
      data: {
        ...data,
        tags: data.tags || [], // default to empty array if none provide
      },
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PATCH : update existing project
export const updateProject = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedProject = await prisma.project.update({
      where: { id },
      data,
    });

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
