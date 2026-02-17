import { Router } from "express";
import {
  getAllBlogsAdmin,
  createBlog,
  deleteBlog,
  toggleBlogVisibility,
  updateBlog,
 getBlogByIdAdmin,
} from "../controllers/adminBlog.controller";

const router = Router();

/* ================================
   ADMIN BLOG ROUTES
================================ */

// Get all blogs (published + hidden)
router.get("/", getAllBlogsAdmin);

// Create blog
router.post("/", createBlog);

// Delete blog
router.delete("/:id", deleteBlog);

// Hide / Unhide blog
router.patch("/:id/toggle", toggleBlogVisibility);

// Update blog
router.put("/:id", updateBlog); 

// Get blog by ID (admin)
router.get("/:id", getBlogByIdAdmin);

export default router;
