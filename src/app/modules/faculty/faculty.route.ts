import { Router } from 'express';
import { FacultyController } from './faculty.controller';
import dataValidator from '../../middlwares/dataValidator';
import { FacultyValidations } from './faculty.validation';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.get('/:id', FacultyController.getSingleFaculty);
router.delete('/:id', FacultyController.deleteFaculty);
router.patch(
  '/:id',
  dataValidator(FacultyValidations.updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);
router.get('/', auth(USER_ROLE.admin, USER_ROLE.faculty), FacultyController.getAllFaculties);

export const FacultyRouter = router;
