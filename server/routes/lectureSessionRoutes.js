import express from "express";
import { createSession, deleteSession, getSession, updateSession } from "../controllers/lectureSessionController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
const router = express.Router(); router.use(requireAuth); router.post("/", createSession); router.route("/:id").get(getSession).patch(updateSession).delete(deleteSession); export default router;
