import { Router } from 'express';
import { StudentRoute } from '../app/modules/student/student.route';
import { UserRoutes } from '../app/modules/user/user.route';
import { AcademicSemesterRoutes } from '../app/modules/academicSemester/academicSemester.route';
import { AcademicFacultyRouter } from '../app/modules/academicFaculty/academicFaculty.router';
import { academicDepartmentRouter } from '../app/modules/academicDepartment/academicDepartment.router';
import { FacultyRouter } from '../app/modules/faculty/faculty.route';
import { adminRouters } from '../app/modules/admin/admin.route';
import { CourseRouter } from '../app/modules/course/course.route';

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
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRouter,
  },
  {
    path: '/academic-department',
    route: academicDepartmentRouter,
  },
  {
    path: '/faculties',
    route: FacultyRouter,
  },
  {
    path: '/admins',
    route: adminRouters,
  },
  {
    path: '/courses',
    route: CourseRouter,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
