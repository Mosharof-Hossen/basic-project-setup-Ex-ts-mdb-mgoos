import { Router } from "express";
import { FacultyController } from "./faculty.controller";

const router = Router();

router.get("/:id", FacultyController.getSingleFaculty);
router.get("/", FacultyController.getAllFaculties);


export const FacultyRouter = router;