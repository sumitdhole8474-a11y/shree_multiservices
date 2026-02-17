import { Router } from "express";
import {
  getAllReviewsAdmin,
  deleteReview,
  toggleHideReview,
} from "../controllers/adminReview.controller";

const router = Router();

router.get("/", getAllReviewsAdmin);
router.patch("/:id/hide", toggleHideReview);
router.delete("/:id", deleteReview);

export default router;
