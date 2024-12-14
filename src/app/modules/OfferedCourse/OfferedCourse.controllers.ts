import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OfferedCourseServices } from "./OfferedCourse.services";

const createOfferedCourse = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.createOfferedCourseIntoDB(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Offered Course is created successfully',
        data: result,
    });
});

export const OfferedCourseControllers = {
    createOfferedCourse,
}