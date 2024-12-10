import { Router } from 'express';
import { FacultyController } from './faculty.controller';
import dataValidator from '../../middlwares/dataValidator';
import { FacultyValidations } from './faculty.validation';

const router = Router();

router.get('/:id', FacultyController.getSingleFaculty);
router.patch('/:id',dataValidator(FacultyValidations.updateFacultyValidationSchema), FacultyController.updateFaculty);
router.get('/', FacultyController.getAllFaculties);

export const FacultyRouter = router;
