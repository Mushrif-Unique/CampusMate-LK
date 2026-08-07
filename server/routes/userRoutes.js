import express from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(requireAuth);
router.get("/me", getProfile);
router.patch("/me", updateProfile);
export default router;
