import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  console.log("body",req.body);
  console.log("file",req.file);
  const { password, student } = req.body;
  const file = req.file;
  const result = await UserServices.createStudentIntoDB(file, password, student);

  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: 'Student is created successfully',
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;
  const file = req.file;

  const result = await UserServices.createFacultyIntoDB(file, password, facultyData);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: 'Faculty is created successfully.',
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;
  const file = req.file;
  const result = await UserServices.createAdminIntoBD(file, password, adminData);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: 'Admin is created successfully.',
  });
});

const getMe = catchAsync(async (req, res) => {
  const result = await UserServices.getMe(req.user);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: 'Cross verification done.',
  });
});
const userStatusChange = catchAsync(async (req, res) => {
  const result = await UserServices.userStatusChange(req.params.id, req.body);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: 'User status Changed.',
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  userStatusChange
};
