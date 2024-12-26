import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OfferedCourseServices } from './OfferedCourse.services';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Offered Course is created successfully',
    data: result,
  });
});
const updateOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.updateOfferedCourseIntoDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Offered Course is updated successfully',
    data: result,
  });
});
const getAllOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getAllOfferedCourseFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Offered Courses are retrieved successfully',
    data: result,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  updateOfferedCourse,
  getAllOfferedCourse,
};
