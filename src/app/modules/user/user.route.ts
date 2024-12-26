import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { studentValidations } from '../student/student.validation';
import dataValidator from '../../middlwares/dataValidator';
import { FacultyValidations } from '../faculty/faculty.validation';
import { AdminValidations } from '../admin/admin.validation';
import auth from '../../middlwares/auth';
import { USER_ROLE } from './user.constant';
import { TUserRole } from './user.interface';
import { userValidation } from './user.validation';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin as TUserRole, USER_ROLE.student),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  dataValidator(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin as TUserRole),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  dataValidator(FacultyValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);
router.post(
  '/create-admin',
  // auth(USER_ROLE.admin as TUserRole),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  dataValidator(AdminValidations.createAdminSchema),
  UserController.createAdmin,
);

router.post(
  '/change-status/:id',
  auth(USER_ROLE.admin as TUserRole),
  dataValidator(userValidation.changeStatusValidationSchema),
  UserController.userStatusChange,
);


router.post(
  '/me',
  auth(USER_ROLE.admin as TUserRole, USER_ROLE.faculty, USER_ROLE.student),
  UserController.getMe,
);

export const UserRoutes = router;
