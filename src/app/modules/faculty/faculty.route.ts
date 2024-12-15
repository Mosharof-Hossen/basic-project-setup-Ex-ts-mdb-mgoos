import { Router } from 'express';
import { FacultyController } from './faculty.controller';
import dataValidator from '../../middlwares/dataValidator';
import { FacultyValidations } from './faculty.validation';
import auth from '../../middlwares/auth';

const router = Router();

router.get('/:id', FacultyController.getSingleFaculty);
router.delete('/:id', FacultyController.deleteFaculty);
router.patch(
  '/:id',
  dataValidator(FacultyValidations.updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);
router.get('/', auth(), FacultyController.getAllFaculties);

export const FacultyRouter = router;
