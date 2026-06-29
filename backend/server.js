import express from "express";
import path from "path";
import * as url from "url";
import fs from "fs";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import universityRoutes from "./routes/university.route.js";
import reviewRoutes from "./routes/review.route.js";
import uploadRoutes from "./routes/fileUpload.route.js";
import connectDB from "./db/db.js";
dotenv.config();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
console.log(__dirname);

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// serving static files
app.use(express.static(path.join(__dirname, "uploads")));
app.use("/static", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/university", universityRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/upload-logo", uploadRoutes);

const frontendDist = path.join(__dirname, "..", "frontend", "dist");
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening at ${PORT}`.bgWhite.black);
});
