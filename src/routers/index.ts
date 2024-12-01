import { Router } from 'express';
import { StudentRoute } from '../app/modules/student/student.route';
import { UserRoutes } from '../app/modules/user/user.route';

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
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
