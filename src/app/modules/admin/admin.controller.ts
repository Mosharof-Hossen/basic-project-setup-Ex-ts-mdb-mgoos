import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { adminServices } from "./admin.services";

const getAllAdmins = catchAsync(async (req, res) => {
    const result = await adminServices.getAllAdminsFromDB(req.query);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Admins are retrieved successfully",
        data: result,
    })
})
const getSingleAdmins = catchAsync(async (req, res) => {
    const result = await adminServices.getSingleAdminFromDB(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Admin is retrieved successfully",
        data: result,
    })
})
const updateAdmin = catchAsync(async (req, res) => {
    const result = await adminServices.updateAdminIntoDB(req.params.id, req.body.admin);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "update admin is retrieved successfully",
        data: result,
    })
})
const deleteAdmin = catchAsync(async (req, res) => {
    const result = await adminServices.deleteAdminFromDB(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "admin deleted successfully",
        data: result,
    })
})

export const adminControllers = {
    getAllAdmins,
    getSingleAdmins,
    updateAdmin,
    deleteAdmin
}