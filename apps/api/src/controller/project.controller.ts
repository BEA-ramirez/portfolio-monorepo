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

// GET : fetch all projects
export const getAllProjects = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany({
      where: { isArchived: false },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching all projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//GET : fetch all live projects
export const getAllLiveProjects = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany({
      where: { isArchived: false, isPublished: true },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching live projects:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//GET : fetch project by slug
export const getProjectBySlug = async (
  req: Request<{ slug: string }>,
  res: Response,
): Promise<void> => {
  const { slug } = req.params;
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
    });
    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE : delete project by id
export const deleteProject = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedProject = await prisma.project.update({
      where: { id },
      data: { isArchived: true },
    });
    res.status(200).json(deletedProject);
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
