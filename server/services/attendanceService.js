import LectureSession from "../models/LectureSession.js";
import { ATTENDANCE_THRESHOLD } from "../config/attendance.js";

function summary(requiredHours, sessions) {
  const conductedHours = sessions.reduce((total, session) => total + session.durationHours, 0);
  const presentHours = sessions.filter((session) => session.attendanceStatus === "present").reduce((total, session) => total + session.durationHours, 0);
  const absentHours = conductedHours - presentHours;
  const percentage = conductedHours ? Number(((presentHours / conductedHours) * 100).toFixed(2)) : 0;
  return { requiredHours, conductedHours, presentHours, absentHours, remainingRequiredHours: Math.max(0, requiredHours - conductedHours), percentage };
}

export async function calculateAttendance(module) {
  const sessions = await LectureSession.find({ userId: module.userId, moduleId: module._id }).lean();
  const theory = summary(module.theoryHours, sessions.filter((session) => session.sessionType === "theory"));
  const practical = module.moduleType === "theory_practical" ? summary(module.practicalHours, sessions.filter((session) => session.sessionType === "practical")) : null;
  const overall = summary(module.theoryHours + module.practicalHours, sessions);
  const status = overall.conductedHours === 0 ? "No Attendance Recorded" : overall.percentage >= module.attendanceThreshold ? "Safe" : "Below Required Attendance";
  return { moduleId: module.id, moduleType: module.moduleType, theory, practical, overall, threshold: module.attendanceThreshold, status };
}
