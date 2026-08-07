import "dotenv/config";
import { connectDatabase } from "../config/db.js";
import University from "../models/University.js";

// Intentionally minimal: expand only with verified university reference data.
const universities = [{ name: "University of Vavuniya", shortName: "UoV", code: "UOV", isActive: true }];

await connectDatabase();
for (const university of universities) {
  await University.updateOne({ code: university.code }, { $set: university }, { upsert: true });
}
console.log("Academic reference seed completed");
process.exit(0);
