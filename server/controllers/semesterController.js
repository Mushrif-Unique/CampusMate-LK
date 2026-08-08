import mongoose from "mongoose";
import Semester from "../models/Semester.js";
import Module from "../models/Module.js";

const editableFields = ["academicYear", "yearOfStudy", "semesterNumber", "name", "startDate", "endDate"];
const validId = (id) => mongoose.isValidObjectId(id);

function validateSemester(data) {
  if (!Number.isInteger(data.academicYear) || data.academicYear < 1 || data.academicYear > 9999) return "Academic year must be a valid whole number";
  if (!Number.isInteger(data.yearOfStudy) || data.yearOfStudy < 1) return "Year of study must be a positive whole number";
  if (!Number.isInteger(data.semesterNumber) || data.semesterNumber < 1) return "Semester number must be a positive whole number";
  if (data.name !== undefined && (typeof data.name !== "string" || data.name.trim().length > 120)) return "Name must be 120 characters or fewer";
  if (data.startDate && Number.isNaN(Date.parse(data.startDate))) return "Start date is invalid";
  if (data.endDate && Number.isNaN(Date.parse(data.endDate))) return "End date is invalid";
  if (data.startDate && data.endDate && new Date(data.endDate) < new Date(data.startDate)) return "End date cannot be before start date";
  return null;
}

function conflict(res) { return res.status(409).json({ success: false, message: "Complete your current semester before creating another active semester" }); }

export async function createSemester(req, res, next) {
  try {
    const input = { academicYear: req.body.academicYear, yearOfStudy: req.body.yearOfStudy, semesterNumber: req.body.semesterNumber, name: req.body.name, startDate: req.body.startDate, endDate: req.body.endDate };
    const validationError = validateSemester(input);
    if (validationError) return res.status(400).json({ success: false, message: validationError });
    if (await Semester.exists({ userId: req.user.id, status: "active" })) return conflict(res);
    const semester = await Semester.create({ ...input, userId: req.user.id, status: "active" });
    res.status(201).json({ success: true, data: { semester } });
  } catch (error) { if (error.code === 11000) return conflict(res); next(error); }
}

export async function listSemesters(req, res, next) {
  try {
    const semesters = await Semester.find({ userId: req.user.id }).sort({ status: 1, academicYear: -1, yearOfStudy: -1, semesterNumber: -1, createdAt: -1 }).lean();
    res.json({ success: true, data: { semesters } });
  } catch (error) { next(error); }
}

export async function getCurrentSemester(req, res, next) {
  try {
    const semester = await Semester.findOne({ userId: req.user.id, status: "active" }).lean();
    res.json({ success: true, data: semester });
  } catch (error) { next(error); }
}

export async function getSemester(req, res, next) {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid semester identifier" });
    const semester = await Semester.findOne({ _id: req.params.id, userId: req.user.id }).lean();
    if (!semester) return res.status(404).json({ success: false, message: "Semester not found" });
    res.json({ success: true, data: { semester } });
  } catch (error) { next(error); }
}

export async function updateSemester(req, res, next) {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid semester identifier" });
    const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => editableFields.includes(key)));
    if (!Object.keys(updates).length) return res.status(400).json({ success: false, message: "Provide at least one editable semester field" });
    const semester = await Semester.findOne({ _id: req.params.id, userId: req.user.id });
    if (!semester) return res.status(404).json({ success: false, message: "Semester not found" });
    const candidate = { ...semester.toObject(), ...updates };
    const validationError = validateSemester(candidate);
    if (validationError) return res.status(400).json({ success: false, message: validationError });
    semester.set(updates);
    await semester.save();
    res.json({ success: true, data: { semester } });
  } catch (error) { next(error); }
}

export async function completeSemester(req, res, next) {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid semester identifier" });
    const semester = await Semester.findOne({ _id: req.params.id, userId: req.user.id });
    if (!semester) return res.status(404).json({ success: false, message: "Semester not found" });
    if (semester.status === "completed") return res.status(409).json({ success: false, message: "This semester is already completed" });
    semester.status = "completed";
    await semester.save();
    res.json({ success: true, data: { semester } });
  } catch (error) { next(error); }
}

export async function deleteSemester(req, res, next) {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ success: false, message: "Invalid semester identifier" });
    const semester = await Semester.findOne({ _id: req.params.id, userId: req.user.id });
    if (!semester) return res.status(404).json({ success: false, message: "Semester not found" });
    if (semester.status === "active") return res.status(409).json({ success: false, message: "Complete the active semester before deleting it" });
    if (await Module.exists({ semesterId: semester._id })) return res.status(409).json({ success: false, message: "Delete this semester's modules before deleting the semester" });
    await semester.deleteOne();
    res.json({ success: true, data: null });
  } catch (error) { next(error); }
}
