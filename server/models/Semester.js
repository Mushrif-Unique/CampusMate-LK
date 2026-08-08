import mongoose from "mongoose";

const semesterSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    academicYear: { type: Number, required: true, min: 1, max: 9999 },
    yearOfStudy: { type: Number, required: true, min: 1, validate: { validator: Number.isInteger, message: "Year of study must be a whole number" } },
    semesterNumber: { type: Number, required: true, min: 1, validate: { validator: Number.isInteger, message: "Semester number must be a whole number" } },
    status: { type: String, enum: ["active", "completed"], default: "active", required: true },
    name: { type: String, trim: true, maxlength: 120, default: "" },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
  },
  { timestamps: true },
);

// MongoDB enforces the one-current-semester rule even when requests arrive concurrently.
semesterSchema.index({ userId: 1, status: 1 }, { unique: true, partialFilterExpression: { status: "active" } });
semesterSchema.index({ userId: 1, status: 1, academicYear: -1, yearOfStudy: -1, semesterNumber: -1 });

export default mongoose.model("Semester", semesterSchema);
