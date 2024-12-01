import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student } = req.body;
    const result = await UserServices.createStudentIntoDB(password, student);

    sendResponse(res, {
      data: result,
      statusCode: 200,
      success: true,
      message: 'Student is created successfully',
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(error);
  }
};

export const UserController = {
  createStudent,
};
