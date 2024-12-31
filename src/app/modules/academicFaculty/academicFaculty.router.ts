import { Router } from 'express';
import dataValidator from '../../middlwares/dataValidator';
import { academicFacultyValidation } from './academicFaculty.validation';
import { academicFacultyController } from './academicFaculty.controller';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.get('/', academicFacultyController.getAllAcademicFaculty);
router.get('/:id', academicFacultyController.getSingleAcademicFaculty);
router.patch(
  '/:id',
  dataValidator(
    academicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  academicFacultyController.updateSingleAcademicFaculty,
);

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin),
  dataValidator(
    academicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  academicFacultyController.createAcademicFaculty,
);

export const AcademicFacultyRouter = router;
