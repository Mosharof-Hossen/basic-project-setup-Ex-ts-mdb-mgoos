import { RequestHandler } from 'express';
import { studentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentServices.getAllStudentsFromDB(req.query);

  sendResponse(res, {
    meta: result.meta,
    data: result.result,
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
const deleteStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await studentServices.deleteStudentFromDB(id);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: 'Student is retrieved successfully',
  });
});
const updateStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await studentServices.updateStudentFromDB(
    id,
    req.body.student,
  );
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: 'Student is updated successfully',
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
