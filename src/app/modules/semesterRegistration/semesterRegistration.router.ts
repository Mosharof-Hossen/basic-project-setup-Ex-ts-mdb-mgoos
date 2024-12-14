import { Router } from 'express';
import dataValidator from '../../middlwares/dataValidator';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';

const router = Router();

router.post(
  '/create-semester-registration',
  dataValidator(
    SemesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
);
router.patch(
  '/:id',
  dataValidator(
    SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.updateSemesterRegistration,
);
router.get('/', SemesterRegistrationControllers.getAllSemesterRegistration);
router.get(
  '/:id',
  SemesterRegistrationControllers.getSingleSemesterRegistration,
);

export const SemesterRegistrationRouter = router;
