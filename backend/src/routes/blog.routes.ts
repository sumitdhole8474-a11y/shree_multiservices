import { Router } from "express";
import { getAllBlogs, getBlogBySlug } from "../controllers/blog.controller";

const router = Router();

router.get("/", getAllBlogs);        // GET /api/blogs
router.get("/:slug", getBlogBySlug); // GET /api/blogs/home-policy

export default router;
