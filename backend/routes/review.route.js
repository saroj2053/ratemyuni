import express from "express";
import {
  getReviews,
  addReview,
  deleteReview,
  updateReview,
} from "../controllers/review.controller.js";

const router = express.Router();

router.get("/", getReviews);
router.post("/", addReview);
router.delete("/delete/:id", deleteReview);
router.patch("/update/:id", updateReview);

export default router;
