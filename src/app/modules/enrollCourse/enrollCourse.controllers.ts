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

export const EnrolledCourseControllers = {
    createEnrolledCourse
}