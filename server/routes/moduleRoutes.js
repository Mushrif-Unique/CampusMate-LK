import express from "express";
import { createModule, deleteModule, getModule, listModules, updateModule } from "../controllers/moduleController.js";
import { getModuleAttendance } from "../controllers/attendanceController.js";
import { listModuleSessions } from "../controllers/lectureSessionController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
const router = express.Router(); router.use(requireAuth); router.route("/").post(createModule).get(listModules); router.get("/:moduleId/lecture-sessions", listModuleSessions); router.get("/:moduleId/attendance", getModuleAttendance); router.route("/:id").get(getModule).patch(updateModule).delete(deleteModule); export default router;
