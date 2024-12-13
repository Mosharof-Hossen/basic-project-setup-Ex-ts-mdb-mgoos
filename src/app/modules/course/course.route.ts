import { Router } from 'express';
import dataValidator from '../../middlwares/dataValidator';
import { CourseValidation } from './course.validation';
import { courseControllers } from './course.controllers';

const router = Router();

router.post(
  '/create-course',
  dataValidator(CourseValidation.createCourseValidationSchema),
  courseControllers.createCourse,
);
router.patch(
  '/:id',
  dataValidator(CourseValidation.updateCourseValidationSchema),
  courseControllers.updateCourse,
);
router.get('/', courseControllers.getAllCourses);
router.get('/:id', courseControllers.getSingleCourse);
router.delete('/:id', courseControllers.deleteCourse);

export const CourseRouter = router;
