import { Router } from 'express';
import dataValidator from '../../middlwares/dataValidator';
import { OfferedCourseValidation } from './OfferedCourse.validations';
import { OfferedCourseControllers } from './OfferedCourse.controllers';

const router = Router();

router.post(
  '/create-offered-course',
  dataValidator(OfferedCourseValidation.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);
router.patch(
  '/:id',
  dataValidator(OfferedCourseValidation.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

export const OfferedCourseRouter = router;
