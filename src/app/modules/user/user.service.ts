import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';

const createStudentIntoDB = async (
  passwordData: string,
  studentData: TStudent,
) => {
  const userData: Partial<TUser> = {};
  userData.password = passwordData || (config.default_password as string);
  userData.role = 'student';

  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generateStudentId(admissionSemester);

    const newUser = await User.create([userData], { session }); // built in static method

    if (!newUser.length) {
      throw new AppError(500, 'Failed To create user');
    }
    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;

    const newStudent = await Student.create([studentData], { session });
    if (!newStudent.length) {
      throw new AppError(500, 'Failed To create Student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, err);
  }
};

const createFacultyIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = 'faculty';

  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found.');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    userData.id = 'F-0001';

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    const newFaculty = await Faculty.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(400, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty[0];
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(500, err);
  }
};
export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
};
