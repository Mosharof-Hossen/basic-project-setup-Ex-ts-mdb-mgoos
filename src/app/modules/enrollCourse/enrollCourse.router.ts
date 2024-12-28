import { Router } from "express";
import dataValidator from "../../middlwares/dataValidator";
import { EnrolledCourseValidations } from "./enrollCouse.validation";
import { EnrolledCourseControllers } from "./enrollCourse.controllers";
import auth from "../../middlwares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
    '/create-enrolled-course',
    auth(USER_ROLE.student),
    dataValidator(EnrolledCourseValidations.createEnrolledCourseValidationSchema),
    EnrolledCourseControllers.createEnrolledCourse
)
router.patch(
    '/update-enrolled-course-marks',
    auth(USER_ROLE.faculty),
    dataValidator(EnrolledCourseValidations.updateEnrolledCourseMarksValidationSchema),
    EnrolledCourseControllers.updateEnrolledCourseMarks
)

export const EnrolledCourseRouter = router;