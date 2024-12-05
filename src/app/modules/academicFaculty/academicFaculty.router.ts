import { Router } from "express";
import dataValidator from "../../middlwares/dataValidator";
import { academicFacultyValidation } from "./academicFaculty.validation";
import { academicFacultyController } from "./academicFaculty.controller";

const router = Router();

router.get("/", academicFacultyController.getAllAcademicFaculty);
router.get("/:id", academicFacultyController.getSingleAcademicFaculty);
router.patch("/:id", dataValidator(academicFacultyValidation.updateAcademicFacultyValidationSchema), academicFacultyController.updateSingleAcademicFaculty);

router.post("/create-academic-faculty", dataValidator(academicFacultyValidation.createAcademicFacultyValidationSchema), academicFacultyController.createAcademicFaculty);

export const AcademicFacultyRouter = router;
