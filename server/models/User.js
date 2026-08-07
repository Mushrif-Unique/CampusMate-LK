import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    profilePicture: { type: String, default: "" },
    universityId: { type: mongoose.Schema.Types.ObjectId, ref: "University", default: null },
    facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", default: null },
    degreeId: { type: mongoose.Schema.Types.ObjectId, ref: "Degree", default: null },
    academicYear: { type: Number, min: 1, max: 20, default: null },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
