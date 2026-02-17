import { Request, Response } from "express";
import pool from "../config/db";

/**
 * GET services by category slug
 * /api/services?categorySlug=loan-services
 */
export const getServicesByCategory = async (
  req: Request,
  res: Response
) => {
  const { categorySlug } = req.query;

  if (!categorySlug || typeof categorySlug !== "string") {
    return res.status(400).json({ message: "categorySlug required" });
  }

  try {
    const result = await pool.query(
      `
      SELECT
        s.id,
        s.title,
        s.slug,
        s.image_url
      FROM services s
      JOIN categories c ON c.id = s.category_id
      WHERE c.slug = $1
        AND s.is_active = true
      ORDER BY s.created_at DESC
      `,
      [categorySlug]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("getServicesByCategory error:", error);
    res.status(500).json({ message: "Failed to fetch services" });
  }
};

/**
 * GET single service detail
 * /api/services/:slug
 */
export const getServiceDetail = async (
  req: Request,
  res: Response
) => {
  const { slug } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT
        s.id,
        s.title,
        s.slug,
        s.image_url,
        s.short_description,
        s.long_description,
        c.title AS category,
        c.slug AS category_slug
      FROM services s
      JOIN categories c ON c.id = s.category_id
      WHERE s.slug = $1
        AND s.is_active = true
      LIMIT 1
      `,
      [slug]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("getServiceDetail error:", error);
    res.status(500).json({ message: "Failed to fetch service" });
  }
};
