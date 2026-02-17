import { Request, Response } from "express";
import pool from "../config/db";

/* GET ALL REVIEWS (ADMIN – includes hidden ones) */
export const getAllReviewsAdmin = async (_: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        name,
        mobile,
        review,
        rating,
        created_at,
        is_hidden
      FROM reviews
      ORDER BY created_at DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("getAllReviewsAdmin error:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

/* HIDE / UNHIDE REVIEW */
export const toggleHideReview = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      UPDATE reviews
      SET is_hidden = NOT is_hidden
      WHERE id = $1
      RETURNING is_hidden
      `,
      [id]
    );

    res.json({
      success: true,
      is_hidden: result.rows[0].is_hidden,
    });
  } catch (error) {
    console.error("toggleHideReview error:", error);
    res.status(500).json({ message: "Failed to update review" });
  }
};

/* DELETE REVIEW */
export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query(`DELETE FROM reviews WHERE id = $1`, [id]);
    res.json({ success: true });
  } catch (error) {
    console.error("deleteReview error:", error);
    res.status(500).json({ message: "Failed to delete review" });
  }
};
