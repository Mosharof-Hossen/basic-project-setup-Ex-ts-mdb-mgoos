import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.services';

const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDB(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Course is created successfully',
        data: result,
    });
});

const getAllCourses = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCoursesFromDB(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'All Courses are retrieved successfully',
        data: result,
    });
});
const getSingleCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.getSingleCourseFromDB(req.params.id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Course is retrieved successfully',
        data: result,
    });
});
const deleteCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.deleteCourseFromDB(req.params.id);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Course is deleted successfully',
        data: result,
    });
});
const updateCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.updateCourseIntoDB(req.params.id, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Course is updated successfully',
        data: result,
    });
});

export const courseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse,
    updateCourse
};
