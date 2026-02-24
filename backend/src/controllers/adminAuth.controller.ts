import { Request, Response } from "express";
import pool from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const result = await pool.query(
      "SELECT * FROM admin_users WHERE username = $1",
      [username]
    );

    const admin = result.rows[0];

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔐 Create JWT
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.ADMIN_JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    // 🔥 SET SECURE COOKIE (IMPORTANT FIX)
    res.cookie("admin_token", token, {
      httpOnly: true,           // cannot access from JS
      secure: true,             // required for HTTPS (Vercel)
      sameSite: "none",         // required for cross-domain
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.json({ success: true });

  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};