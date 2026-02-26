import { Router } from "express";
import {getCategories, createCategory, deleteCategory, updateCategory, reorderCategories } from "../controllers/adminCategory.controller";

const router = Router();

router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.put("/reorder", reorderCategories);
router.delete("/:id", deleteCategory);

export default router;
