import { Router } from 'express';
import dataValidator from '../../middlwares/dataValidator';
import { departmentValidation } from './academicDepartment.validation';
import { academicDepartmentControllers } from './academicDepartment.controller';

const router = Router();

router.post(
  '/create-academic-department',
  dataValidator(departmentValidation.createAcademicDepartmentValidationSchema),
  academicDepartmentControllers.createAcademicDepartment,
);
router.get('/', academicDepartmentControllers.getAllAcademicDepartment);
router.get('/:id', academicDepartmentControllers.getSingleAcademicDepartment);
router.patch('/:id', academicDepartmentControllers.updateAcademicDepartment);

export const academicDepartmentRouter = router;
