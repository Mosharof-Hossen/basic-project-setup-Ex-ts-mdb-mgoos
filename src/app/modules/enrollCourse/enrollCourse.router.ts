import { Router } from "express";
import dataValidator from "../../middlwares/dataValidator";
import { EnrolledCourseValidations } from "./enrollCouse.validation";
import { EnrolledCourseControllers } from "./enrollCourse.controllers";

const router = Router();

router.post(
    '/create-enrolled-course',
    dataValidator(EnrolledCourseValidations.createEnrolledCourseValidationSchema),
    EnrolledCourseControllers.createEnrolledCourse
)

export const EnrolledCourseRouter = router;