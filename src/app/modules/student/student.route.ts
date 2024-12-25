import express from 'express';
import { StudentControllers } from './student.controller';
import dataValidator from '../../middlwares/dataValidator';
import { studentValidations } from './student.validation';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);

router.get(
  '/:id',
  auth(USER_ROLE.student),
  StudentControllers.getSingleStudent
);


router.delete('/:id', StudentControllers.deleteStudent);
router.patch(
  '/:id',
  dataValidator(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

export const StudentRoute = router;
