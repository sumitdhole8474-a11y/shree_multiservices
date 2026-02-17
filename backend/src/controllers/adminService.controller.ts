import { Request, Response } from "express";
import pool from "../config/db";
import slugify from "slugify";

/* ===============================
   CREATE SERVICE
================================ */
export const createService = async (req: Request, res: Response) => {
  try {
    const {
      title,
      short_description,
      long_description,
      category_id,
    } = req.body;

    const image = req.file;

    if (!title || !image || !category_id) {
      return res.status(400).json({
        message: "Title, image & category required",
      });
    }

    const slug = slugify(title, { lower: true });

    const result = await pool.query(
      `
      INSERT INTO services
      (title, slug, image_url, short_description, long_description, category_id, is_active)
      VALUES ($1,$2,$3,$4,$5,$6,true)
      RETURNING *
      `,
      [
        title,
        slug,
        `/services/${image.filename}`,
        short_description,
        long_description,
        category_id,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("createService error:", error);
    res.status(500).json({ message: "Failed to create service" });
  }
};

/* ===============================
   LIST SERVICES (ADMIN)
================================ */
export const getAllServicesAdmin = async (_: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.id,
        s.title,
        s.image_url,
        s.short_description,
        s.long_description,
        s.category_id,
        s.is_active,
        s.created_at,
        c.title AS category
      FROM services s
      JOIN categories c ON c.id = s.category_id
      ORDER BY s.created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("getAllServicesAdmin error:", error);
    res.status(500).json({ message: "Failed to fetch services" });
  }
};


/* ===============================
   UPDATE SERVICE ✅ (FIXED)
================================ */
export const updateService = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    title,
    short_description,
    long_description,
    category_id,
  } = req.body;

  const image = req.file;

  try {
    const slug = title ? slugify(title, { lower: true }) : null;
    const imageUrl = image ? `/services/${image.filename}` : null;

    const result = await pool.query(
      `
      UPDATE services
      SET
        title = COALESCE($1, title),
        slug = COALESCE($2, slug),
        image_url = COALESCE($3, image_url),
        short_description = COALESCE($4, short_description),
        long_description = COALESCE($5, long_description),
        category_id = COALESCE($6, category_id)
      WHERE id = $7
      RETURNING *
      `,
      [
        title || null,
        slug,
        imageUrl,
        short_description || null,
        long_description || null,
        category_id || null,
        id,
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("updateService error:", error);
    res.status(500).json({ message: "Failed to update service" });
  }
};

/* ===============================
   TOGGLE SERVICE VISIBILITY
================================ */
export const toggleServiceVisibility = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      UPDATE services
      SET is_active = NOT is_active
      WHERE id = $1
      RETURNING is_active
      `,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({
      message: "Service visibility updated",
      is_active: result.rows[0].is_active,
    });
  } catch (error) {
    console.error("toggleServiceVisibility error:", error);
    res.status(500).json({ message: "Failed to update service visibility" });
  }
};

/* ===============================
   DELETE SERVICE
================================ */
export const deleteService = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query(`DELETE FROM services WHERE id = $1`, [id]);
    res.json({ success: true });
  } catch (error) {
    console.error("deleteService error:", error);
    res.status(500).json({ message: "Failed to delete service" });
  }
};
