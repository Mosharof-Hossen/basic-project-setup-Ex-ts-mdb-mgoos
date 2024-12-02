import { Router } from 'express';
import { StudentRoute } from '../app/modules/student/student.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { AcademicSemesterRoutes } from '../app/modules/academicSemester/academicSemester.route';

const router = Router();

const moduleRouters = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoute,
  },
  {
    path:'/academic-semesters',
    route: AcademicSemesterRoutes,
  }
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
