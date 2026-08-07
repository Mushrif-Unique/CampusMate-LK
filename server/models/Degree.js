import mongoose from "mongoose";

const degreeSchema = new mongoose.Schema({
  universityId: { type: mongoose.Schema.Types.ObjectId, ref: "University", required: true, index: true },
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 160 },
  shortName: { type: String, trim: true, maxlength: 30 },
  level: { type: String, trim: true, maxlength: 50 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });
degreeSchema.index({ facultyId: 1, name: 1 }, { unique: true });

export default mongoose.model("Degree", degreeSchema);
