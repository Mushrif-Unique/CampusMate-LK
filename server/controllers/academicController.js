import mongoose from "mongoose";
import University from "../models/University.js";
import Faculty from "../models/Faculty.js";
import Degree from "../models/Degree.js";

const validId = (id) => mongoose.isValidObjectId(id);
export async function listUniversities(req, res, next) { try { const universities = await University.find({ isActive: true }).sort("name").lean(); res.json({ success: true, data: { universities } }); } catch (e) { next(e); } }
export async function listFaculties(req, res, next) { try { if (!validId(req.params.universityId)) return res.status(400).json({ success: false, message: "Invalid university identifier" }); const faculties = await Faculty.find({ universityId: req.params.universityId, isActive: true }).sort("name").lean(); res.json({ success: true, data: { faculties } }); } catch (e) { next(e); } }
export async function listDegrees(req, res, next) { try { if (!validId(req.params.facultyId)) return res.status(400).json({ success: false, message: "Invalid faculty identifier" }); const degrees = await Degree.find({ facultyId: req.params.facultyId, isActive: true }).sort("name").lean(); res.json({ success: true, data: { degrees } }); } catch (e) { next(e); } }
export async function getDegree(req, res, next) { try { if (!validId(req.params.degreeId)) return res.status(400).json({ success: false, message: "Invalid degree identifier" }); const degree = await Degree.findById(req.params.degreeId).lean(); if (!degree || !degree.isActive) return res.status(404).json({ success: false, message: "Degree not found" }); res.json({ success: true, data: { degree } }); } catch (e) { next(e); } }
