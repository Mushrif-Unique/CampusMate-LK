import express from "express";
import { getDegree, listDegrees, listFaculties, listUniversities } from "../controllers/academicController.js";

export const universityRouter = express.Router();
universityRouter.get("/", listUniversities);
universityRouter.get("/:universityId/faculties", listFaculties);

export const facultyRouter = express.Router();
facultyRouter.get("/:facultyId/degrees", listDegrees);

export const degreeRouter = express.Router();
degreeRouter.get("/:degreeId", getDegree);
