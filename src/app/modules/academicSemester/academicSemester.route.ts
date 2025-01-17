import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import dataValidator from '../../middlwares/dataValidator';
import { academicSemesterValidations } from './academicSemester.validation';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.admin),
  AcademicSemesterControllers.getAcademicSemester);

router.get('/:id', AcademicSemesterControllers.getSingleAcademicSemester);
router.patch(
  '/:id',
  dataValidator(
    academicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);

router.post(
  '/create-academic-semester',
  dataValidator(
    academicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

export const AcademicSemesterRoutes = router;
