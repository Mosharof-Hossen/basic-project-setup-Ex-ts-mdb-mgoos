import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;
  const result = await UserServices.createStudentIntoDB(password, student);

  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: 'Student is created successfully',
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;
  const result = await UserServices.createFacultyIntoDB(password, facultyData);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: 'Faculty is created successfully.',
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;
  const result = await UserServices.createAdminIntoBD(password, adminData);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: 'Admin is created successfully.',
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
