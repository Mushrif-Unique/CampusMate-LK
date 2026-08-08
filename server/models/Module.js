import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  semesterId: { type: mongoose.Schema.Types.ObjectId, ref: "Semester", required: true },
  moduleCode: { type: String, required: true, trim: true, uppercase: true, maxlength: 40 },
  moduleName: { type: String, required: true, trim: true, maxlength: 160 },
  credits: { type: Number, required: true, min: 0.1 },
  moduleType: { type: String, required: true, enum: ["theory_only", "theory_practical"] },
  theoryHours: { type: Number, required: true, min: 0 },
  practicalHours: { type: Number, required: true, min: 0, default: 0 },
  attendanceThreshold: { type: Number, required: true, min: 0, max: 100 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

moduleSchema.index({ userId: 1, semesterId: 1, moduleCode: 1 }, { unique: true });
moduleSchema.index({ userId: 1, semesterId: 1 });
export default mongoose.model("Module", moduleSchema);
