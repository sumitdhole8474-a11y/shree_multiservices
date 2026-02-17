import { Request, Response } from "express";
import pool from "../config/db";

export const submitContactMessage = async (
  req: Request,
  res: Response
) => {
  const { name, mobile, email, message } = req.body;

  if (!name || !mobile || !message) {
    return res.status(400).json({
      message: "Name, mobile and message are required",
    });
  }

  try {
    await pool.query(
      `
      INSERT INTO contact_messages (name, mobile, email, message)
      VALUES ($1, $2, $3, $4)
      `,
      [name, mobile, email || null, message]
    );

    res.status(201).json({
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      message: "Failed to send message",
    });
  }
};
