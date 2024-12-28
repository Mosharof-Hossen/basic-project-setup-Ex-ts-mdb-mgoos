import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { EnrolledCourseServices } from "./enrollCourse.services";

const createEnrolledCourse = catchAsync(async (req, res) => {
    const result = await EnrolledCourseServices.createEnrollCourseIntoDB(req.user.userId, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Enrolled done successfully',
        data: result,
    });
});
const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
    const facultyId = req.user.userId;
    const result = await EnrolledCourseServices.updateEnrolledCourseMarks(facultyId, req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Course marks update successfully',
        data: result,
    });
});

export const EnrolledCourseControllers = {
    createEnrolledCourse,
    updateEnrolledCourseMarks
}