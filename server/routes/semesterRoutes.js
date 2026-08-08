import express from "express";
import { completeSemester, createSemester, deleteSemester, getCurrentSemester, getSemester, listSemesters, updateSemester } from "../controllers/semesterController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(requireAuth);
router.get("/current", getCurrentSemester);
router.route("/").post(createSemester).get(listSemesters);
router.route("/:id").get(getSemester).patch(updateSemester).delete(deleteSemester);
router.patch("/:id/complete", completeSemester);

export default router;
