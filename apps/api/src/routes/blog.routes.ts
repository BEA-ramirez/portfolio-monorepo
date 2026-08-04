import { Router } from "express";
import {
  getBlogById,
  createBlogPost,
  updateBlogPost,
  getAllBlogPosts,
  deleteBlogPost,
} from "../controller/blog.controller";

const router = Router();

router.get("/", getAllBlogPosts);

router.get("/:id", getBlogById);

router.post("/", createBlogPost);

router.patch("/:id", updateBlogPost);

router.patch("/del/:id", deleteBlogPost);

export default router;
