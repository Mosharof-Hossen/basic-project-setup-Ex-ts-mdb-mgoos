import express from 'express';
import { StudentControllers } from './student.controller';
import dataValidator from '../../middlwares/dataValidator';
import { studentValidations } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getSingleStudent);
router.delete('/:id', StudentControllers.deleteStudent);
router.patch('/:id', dataValidator(studentValidations.updateStudentValidationSchema), StudentControllers.updateStudent);

export const StudentRoute = router;
