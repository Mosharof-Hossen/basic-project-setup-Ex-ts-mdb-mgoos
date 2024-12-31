import { Router } from 'express';
import dataValidator from '../../middlwares/dataValidator';
import { departmentValidation } from './academicDepartment.validation';
import { academicDepartmentControllers } from './academicDepartment.controller';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/create-academic-department',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  dataValidator(departmentValidation.createAcademicDepartmentValidationSchema),
  academicDepartmentControllers.createAcademicDepartment,
);
router.get('/', academicDepartmentControllers.getAllAcademicDepartment);
router.get('/:id', academicDepartmentControllers.getSingleAcademicDepartment);
router.patch('/:id', academicDepartmentControllers.updateAcademicDepartment);

export const academicDepartmentRouter = router;
