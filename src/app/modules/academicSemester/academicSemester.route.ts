import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import dataValidator from '../../middlwares/dataValidator';
import { academicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.get('/', AcademicSemesterControllers.getAcademicSemester);
router.get('/:id', AcademicSemesterControllers.getSingleAcademicSemester);
router.patch('/:id', AcademicSemesterControllers.updateAcademicSemester);

router.post(
  '/create-academic-semester',
  dataValidator(
    academicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

export const AcademicSemesterRoutes = router;
