import { Router } from "express";
import {
  getBlogById,
  createBlogPost,
  updateBlogPost,
  getAllBlogPosts,
  deleteBlogPost,
} from "../controller/blog.controller.js";

const router = Router();

router.get("/", getAllBlogPosts);

router.get("/:id", getBlogById);

router.post("/", createBlogPost);

router.patch("/:id", updateBlogPost);

router.patch("/:id/del", deleteBlogPost);

export default router;
