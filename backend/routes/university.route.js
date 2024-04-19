import express from "express";
import {
  getUniversities,
  getSingleUniversity,
  addUniversity,
  deleteUniversity,
  updateUniversity,
  searchUniversity,
} from "../controllers/university.controller.js";

const router = express.Router();

router.get("/", getUniversities);

router.get("/:id", getSingleUniversity);

router.post("/", addUniversity);

router.post("/search", searchUniversity);

router.put("/update/:id", updateUniversity);

router.delete("/delete/:id", deleteUniversity);

export default router;
