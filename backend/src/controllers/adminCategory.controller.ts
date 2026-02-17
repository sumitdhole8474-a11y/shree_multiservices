import { Request, Response } from "express";
import pool from "../config/db";

/* ============================= */
/* GET ALL CATEGORIES */
/* ============================= */
export const getCategories = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT id, title, slug, created_at
       FROM categories
       ORDER BY created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error("getCategories error:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

/* ============================= */
/* CREATE CATEGORY */
/* ============================= */
export const createCategory = async (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title required" });
  }

  const slug = title.toLowerCase().replace(/\s+/g, "-");

  try {
    const result = await pool.query(
      `INSERT INTO categories (title, slug)
       VALUES ($1, $2)
       RETURNING *`,
      [title, slug]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("createCategory error:", error);
    res.status(500).json({ message: "Failed to create category" });
  }
};

/* ============================= */
/* DELETE CATEGORY */
/* ============================= */
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query(
      `DELETE FROM categories WHERE id = $1`,
      [id]
    );

    res.json({ message: "Category deleted" });
  } catch (error) {
    console.error("deleteCategory error:", error);
    res.status(500).json({ message: "Failed to delete category" });
  }
};

/* ============================= */
/* UPDATE CATEGORY */
/* ============================= */
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title required" });
  }

  const slug = title.toLowerCase().replace(/\s+/g, "-");

  try {
    const result = await pool.query(
      `UPDATE categories
       SET title = $1, slug = $2
       WHERE id = $3
       RETURNING *`,
      [title, slug, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("updateCategory error:", error);
    res.status(500).json({ message: "Failed to update category" });
  }
};
