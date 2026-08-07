import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  universityId: { type: mongoose.Schema.Types.ObjectId, ref: "University", required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 160 },
  shortName: { type: String, trim: true, maxlength: 30 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });
facultySchema.index({ universityId: 1, name: 1 }, { unique: true });

export default mongoose.model("Faculty", facultySchema);
