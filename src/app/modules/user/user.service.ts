import mongoose, { startSession } from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { adminId, facultyId, generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { JwtPayload } from 'jsonwebtoken';
import { USER_ROLE } from './user.constant';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const createStudentIntoDB = async (
  file: unknown,
  passwordData: string,
  studentData: TStudent,
) => {
  const userData: Partial<TUser> = {};
  userData.password = passwordData || (config.default_password as string);
  userData.role = 'student';
  userData.email = studentData.email;

  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    userData.id = await generateStudentId(admissionSemester);

    // send image to cloudinary.........
    const imageName = `${userData.id}${studentData?.name.firstName}`;
    const path = file?.path;
    const profileImage = await sendImageToCloudinary(imageName, path)


    const newUser = await User.create([userData], { session }); // built in static method

    if (!newUser.length) {
      throw new AppError(500, 'Failed To create user');
    }
    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;
    studentData.profileImg = profileImage.secure_url;

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
  userData.email = payload.email;

  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found.');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    userData.id = await facultyId();

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

const createAdminIntoBD = async (file: unknown, password: string, payload: TAdmin) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = 'admin';
  userData.email = payload.email;

  const session = await startSession();
  try {
    session.startTransaction();
    const imageName = `${payload.id}${payload.name.firstName}`;
    const path = file?.path;
    const profileImage = await sendImageToCloudinary(imageName, path);

    userData.id = await adminId();
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(400, 'Failed to create user');
    }

    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    payload.profileImage = profileImage.secure_url;

    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(400, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, err);
  }
};

const getMe = async (user: JwtPayload) => {
  const { userId, role } = user;
  let result
  if (role === USER_ROLE.admin) {
    result = await Admin.findOne({ id: userId });
  }
  if (role === USER_ROLE.faculty) {
    result = await Faculty.findOne({ id: userId });
  }
  if (role === USER_ROLE.student) {
    result = await Student.findOne({ id: userId });
  }

  return result

}

const userStatusChange = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
}

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoBD,
  getMe,
  userStatusChange
};
