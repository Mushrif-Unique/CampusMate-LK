import mongoose from "mongoose";
import University from "../models/University.js";
import Faculty from "../models/Faculty.js";
import Degree from "../models/Degree.js";

export function getProfile(req, res) { res.json({ success: true, data: { user: req.user } }); }
export async function updateProfile(req, res, next) {
  try {
    const { universityId, facultyId, degreeId, academicYear } = req.body;
    if (![universityId, facultyId, degreeId].every(mongoose.isValidObjectId)) return res.status(400).json({ success: false, message: "Valid university, faculty, and degree are required" });
    if (!Number.isInteger(academicYear) || academicYear < 1 || academicYear > 20) return res.status(400).json({ success: false, message: "Academic year must be between 1 and 20" });
    const [university, faculty, degree] = await Promise.all([University.findOne({ _id: universityId, isActive: true }), Faculty.findOne({ _id: facultyId, universityId, isActive: true }), Degree.findOne({ _id: degreeId, facultyId, universityId, isActive: true })]);
    if (!university || !faculty || !degree) return res.status(400).json({ success: false, message: "Your academic selections do not form a valid programme" });
    req.user.set({ universityId, facultyId, degreeId, academicYear });
    await req.user.save();
    res.json({ success: true, data: { user: req.user } });
  } catch (e) { next(e); }
}
