import express from "express";

import { upload } from "../utils/fileUploader.js";
import response from "../utils/generateResponse.js";

const router = express.Router();

router.post("/", upload.single("logo"), async (req, res) => {
  const logoDetails = req.file;
  if (!logoDetails) {
    return response(res, 400, false, "Error saving logo");
  }
  res.status(200).json({
    success: true,
    message: "Logo uploaded successfully",
    logo: logoDetails,
  });
});

export default router;
