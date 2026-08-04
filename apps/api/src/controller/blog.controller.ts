import { Request, Response } from "express";
import { prisma } from "../db";

// GET : fetch single blog post using id
export const getBlogById = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const blog = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!blog) {
      res.status(404).json({ error: "Blog post not found" });
      return;
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST : Create new blog post
export const createBlogPost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data = req.body;

    // prisma creates record to neon
    const newBlogPost = await prisma.blogPost.create({
      data: {
        ...data,
        tags: data.tags || [], // default to empty array if none provide
      },
    });

    res.status(201).json(newBlogPost);
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PATCH : update existing blog post
export const updateBlogPost = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedBlogPost = await prisma.blogPost.update({
      where: { id },
      data,
    });

    res.status(200).json(updatedBlogPost);
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET : fetch all blog posts
export const getAllBlogPosts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const blogPosts = await prisma.blogPost.findMany({
      where: { isArchived: false },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(blogPosts);
  } catch (error) {
    console.error("Error fetching all blog posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE : delete blog post by id
export const deleteBlogPost = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedBlogPost = await prisma.blogPost.update({
      where: { id },
      data: { isArchived: true },
    });
    res.status(200).json(deletedBlogPost);
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
