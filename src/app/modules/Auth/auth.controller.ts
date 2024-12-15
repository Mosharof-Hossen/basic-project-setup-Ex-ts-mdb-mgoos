import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User is logged in successfully.",
        data: result
    })
})
const changePassword = catchAsync(async (req, res) => {
    // console.log(req.user, req.body);
    const result = await AuthServices.changePassword(req.user as JwtPayload, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User changed password successfully.",
        data: result
    })
})


export const AuthController = {
    loginUser,
    changePassword
}