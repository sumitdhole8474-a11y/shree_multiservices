import { Request, Response } from "express";
import pool from "../config/db";
import { sendEmail } from "../utils/sendEmail";

export const createEnquiry = async (req: Request, res: Response) => {
  const {
    customerName,
    mobileNumber,
    email,
    productSlug,
    message,
  } = req.body;

  if (!customerName || !mobileNumber) {
    return res.status(400).json({
      message: "Required fields missing",
    });
  }

  try {
    // 1️⃣ Save enquiry in DB
    await pool.query(
      `
      INSERT INTO enquiries
      (customer_name, mobile_number, email, product_slug, message)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [customerName, mobileNumber, email, productSlug, message]
    );

    // 2️⃣ Send Email to Admin
    await sendEmail(
      "📩 New Enquiry Received",
      `
      <div style="font-family: Arial, sans-serif; line-height: 1.6">
        <h2>New Enquiry</h2>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Mobile:</strong> ${mobileNumber}</p>
        <p><strong>Email:</strong> ${email || "Not provided"}</p>
        <p><strong>Product:</strong> ${productSlug || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message || "-"}</p>
      </div>
      `
    );

    res.status(201).json({
      message: "Enquiry submitted successfully",
    });
  } catch (error: any) {
    console.error("Create Enquiry Error:", error.message);
    console.error(error.stack);

    res.status(500).json({
      message: "Failed to submit enquiry",
      error: error.message,
    });
  }
};
