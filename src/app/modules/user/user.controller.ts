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

export const UserController = {
  createStudent,
};
