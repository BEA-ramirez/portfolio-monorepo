import { Router } from "express";
import {
  getBlogById,
  createBlogPost,
  updateBlogPost,
  getAllBlogPosts,
  deleteBlogPost,
} from "../controller/blog.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getAllBlogPosts);

router.get("/:id", getBlogById);

router.post("/", authenticateToken, createBlogPost);

router.patch("/:id", authenticateToken, updateBlogPost);

router.patch("/:id/del", authenticateToken, deleteBlogPost);

export default router;
