import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { adminServices } from "./admin.services";

const getAllAdmins = catchAsync(async (req, res) => {
    const result = await adminServices.getAllAdminsFromBd(req.query);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Admins are retrieved successfully",
        data: result,
    })
})

export const adminControllers = {
    getAllAdmins,
}