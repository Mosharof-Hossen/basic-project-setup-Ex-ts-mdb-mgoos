import { NextFunction, Request, RequestHandler, Response } from 'express';
import { studentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await studentServices.getAllStudentsFromDB();

  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: 'Students is retrieved successfully',
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res, next) => {
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
