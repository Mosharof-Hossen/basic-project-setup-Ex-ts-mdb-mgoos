import { RequestHandler } from 'express';
import { studentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentsFromDB();

  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: 'Students is retrieved successfully',
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await studentServices.getSingleStudentFromDB(id);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: 'Student is retrieved successfully',
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
};
