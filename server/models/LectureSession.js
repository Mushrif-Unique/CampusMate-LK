import mongoose from "mongoose";

const lectureSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  semesterId: { type: mongoose.Schema.Types.ObjectId, ref: "Semester", required: true },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
  sessionType: { type: String, required: true, enum: ["theory", "practical"] },
  durationHours: { type: Number, required: true, min: 0.01 },
  attendanceStatus: { type: String, required: true, enum: ["present", "absent"] },
}, { timestamps: true });

lectureSessionSchema.index({ userId: 1, moduleId: 1, createdAt: -1 });
lectureSessionSchema.index({ semesterId: 1, moduleId: 1 });
export default mongoose.model("LectureSession", lectureSessionSchema);
