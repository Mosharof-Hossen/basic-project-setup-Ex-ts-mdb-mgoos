import express from 'express';
import { UserController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import dataValidator from '../../middlwares/dataValidator';
import { FacultyValidations } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validation';

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
router.post(
  '/create-admin',
  dataValidator(AdminValidations.createAdminSchema),
  UserController.createAdmin,
);

export const UserRoutes = router;
