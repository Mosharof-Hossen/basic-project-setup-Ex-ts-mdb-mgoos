import express from 'express';
import { UserController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import dataValidator from '../../middlwares/dataValidator';
import { FacultyValidations } from '../faculty/faculty.validation';

const router = express.Router();

router.post(
  '/create-student',
  dataValidator(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  dataValidator(FacultyValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);

export const UserRoutes = router;
