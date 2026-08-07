import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { connectDatabase } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { universityRouter, facultyRouter, degreeRouter } from "./routes/academicRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false });

app.get("/", (req, res) => res.json({ success: true, data: { service: "CampusMate LK API" } }));
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/universities", universityRouter);
app.use("/api/faculties", facultyRouter);
app.use("/api/degrees", degreeRouter);
app.use(notFound);
app.use(errorHandler);

connectDatabase().then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`))).catch(() => process.exit(1));
