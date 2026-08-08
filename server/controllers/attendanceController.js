import mongoose from "mongoose";
import Module from "../models/Module.js";
import { calculateAttendance } from "../services/attendanceService.js";
export async function getModuleAttendance(req, res, next) { try { if (!mongoose.isValidObjectId(req.params.moduleId)) return res.status(400).json({ success: false, message: "Invalid module identifier" }); const module = await Module.findOne({ _id: req.params.moduleId, userId: req.user.id }); if (!module) return res.status(404).json({ success: false, message: "Module not found" }); res.json({ success: true, data: await calculateAttendance(module) }); } catch (error) { next(error); } }
