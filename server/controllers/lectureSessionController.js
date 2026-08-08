import mongoose from "mongoose";
import Module from "../models/Module.js";
import Semester from "../models/Semester.js";
import LectureSession from "../models/LectureSession.js";

const validId = mongoose.isValidObjectId;
function validate(data, module) { 
    if (!["theory", "practical"].includes(data.sessionType)) return "Choose a valid session type"; 
    if (module.moduleType === "theory_only" && data.sessionType !== "theory") return "Practical sessions are not allowed for theory-only modules"; 
    if (!Number.isFinite(data.durationHours) || data.durationHours <= 0) return "Duration must be greater than zero"; 
    if (!["present", "absent"].includes(data.attendanceStatus)) return "Choose present or absent"; return null; 
}
async function ownedModule(id, userId) { return validId(id) ? Module.findOne({ _id: id, userId }) : null; }
async function writableModule(id, userId) { 
    const module = await ownedModule(id, userId); 
    if (!module) return { error: "Module not found", status: 404 }; 
    const semester = await Semester.findOne({ _id: module.semesterId, userId }); 
    if (semester.status !== "active") return { error: "Cannot add or change sessions in a completed semester", status: 409 }; 
    return { module }; 
}
export async function createSession(req, res, next) { try { const result = await writableModule(req.body.moduleId, req.user.id); if (result.error) return res.status(result.status).json({ success: false, message: result.error }); const input = { sessionType: req.body.sessionType, durationHours: req.body.durationHours, attendanceStatus: req.body.attendanceStatus }; const message = validate(input, result.module); if (message) return res.status(400).json({ success: false, message }); const session = await LectureSession.create({ ...input, userId: req.user.id, moduleId: result.module.id, semesterId: result.module.semesterId }); res.status(201).json({ success: true, data: { session } }); } catch (error) { next(error); } }
export async function listModuleSessions(req, res, next) { try { const module = await ownedModule(req.params.moduleId, req.user.id); if (!module) return res.status(404).json({ success: false, message: "Module not found" }); const sessions = await LectureSession.find({ userId: req.user.id, moduleId: module._id }).sort({ createdAt: -1 }).lean(); res.json({ success: true, data: { sessions } }); } catch (error) { next(error); } }
export async function getSession(req, res, next) { try { const session = validId(req.params.id) && await LectureSession.findOne({ _id: req.params.id, userId: req.user.id }).lean(); if (!session) return res.status(404).json({ success: false, message: "Lecture session not found" }); res.json({ success: true, data: { session } }); } catch (error) { next(error); } }
export async function updateSession(req, res, next) { try { const session = validId(req.params.id) && await LectureSession.findOne({ _id: req.params.id, userId: req.user.id }); if (!session) return res.status(404).json({ success: false, message: "Lecture session not found" }); const result = await writableModule(session.moduleId, req.user.id); if (result.error) return res.status(result.status).json({ success: false, message: result.error }); const updates = { sessionType: req.body.sessionType ?? session.sessionType, durationHours: req.body.durationHours ?? session.durationHours, attendanceStatus: req.body.attendanceStatus ?? session.attendanceStatus }; const message = validate(updates, result.module); if (message) return res.status(400).json({ success: false, message }); session.set(updates); await session.save(); res.json({ success: true, data: { session } }); } catch (error) { next(error); } }
export async function deleteSession(req, res, next) { try { const session = validId(req.params.id) && await LectureSession.findOne({ _id: req.params.id, userId: req.user.id }); if (!session) return res.status(404).json({ success: false, message: "Lecture session not found" }); const result = await writableModule(session.moduleId, req.user.id); if (result.error) return res.status(result.status).json({ success: false, message: result.error }); await session.deleteOne(); res.json({ success: true, data: null }); } catch (error) { next(error); } }
