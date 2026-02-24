import { Router } from "express";
import {
  getAllReviewsAdmin,
  deleteReview,
  toggleHideReview,
  createReviewAdmin,
} from "../controllers/adminReview.controller";

const router = Router();

router.post("/reviews", createReviewAdmin);
router.get("/", getAllReviewsAdmin);
router.patch("/:id/hide", toggleHideReview);
router.delete("/:id", deleteReview);


export default router;
