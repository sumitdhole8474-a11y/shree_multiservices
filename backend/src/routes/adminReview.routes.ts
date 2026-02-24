import { Router } from "express";
import {
  getAllReviewsAdmin,
  deleteReview,
  toggleHideReview,
  createReviewAdmin,
} from "../controllers/adminReview.controller";

const router = Router();

router.get("/", getAllReviewsAdmin);
router.patch("/:id/hide", toggleHideReview);
router.delete("/:id", deleteReview);
router.post("/reviews", createReviewAdmin);

export default router;
