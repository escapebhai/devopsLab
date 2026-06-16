import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import studentsRouter from "../routes/students.js";
import authRouter from "../routes/auth.js";
import statsRouter from "../routes/stats.js";

dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/students", studentsRouter);
app.use("/api/auth", authRouter);
app.use("/api/stats", statsRouter);

// Cache connection across serverless invocations
if (mongoose.connection.readyState === 0) {
  await connectDB(MONGO_URI);
}

export default app;
