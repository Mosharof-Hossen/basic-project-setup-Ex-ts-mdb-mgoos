import { Router } from 'express';
import dataValidator from '../../middlwares/dataValidator';
import { CourseValidation } from './course.validation';
import { courseControllers } from './course.controllers';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/create-course',
  auth(USER_ROLE.admin),
  dataValidator(CourseValidation.createCourseValidationSchema),
  courseControllers.createCourse,
);
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  dataValidator(CourseValidation.updateCourseValidationSchema),
  courseControllers.updateCourse,
);
router.get('/', courseControllers.getAllCourses);
router.get('/:id', courseControllers.getSingleCourse);
router.delete('/:id',auth(USER_ROLE.admin), courseControllers.deleteCourse);
router.put(
  '/:id/assign-faculties',
  dataValidator(CourseValidation.CourseFacultyValidation),
  courseControllers.assignFaculties,
);
router.delete(
  '/:id/remove-faculties',
  dataValidator(CourseValidation.CourseFacultyValidation),
  courseControllers.removeFacultyFromCourse,
);

export const CourseRouter = router;
