import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import universityRoutes from "./routes/university.route.js";
import reviewRoutes from "./routes/review.route.js";
import connectDB from "./db/db.js";
dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/university", universityRoutes);
app.use("/api/review", reviewRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Hello from rate my uni </h1>");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening at ${PORT}`.bgWhite.black);
});
