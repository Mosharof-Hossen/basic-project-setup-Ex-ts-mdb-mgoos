import express from 'express';
import { UserController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import dataValidator from '../../middlwares/dataValidator';

const router = express.Router();

router.post(
  '/create-student',
  dataValidator(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

export const UserRoutes = router;
