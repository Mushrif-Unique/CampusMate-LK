import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 160 },
  shortName: { type: String, trim: true, maxlength: 30 },
  code: { type: String, required: true, unique: true, uppercase: true, trim: true, maxlength: 20 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model("University", universitySchema);
