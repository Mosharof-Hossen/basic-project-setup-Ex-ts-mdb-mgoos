import { Router } from "express";
import dataValidator from "../../middlwares/dataValidator";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import auth from "../../middlwares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
    '/login',
    dataValidator(AuthValidation.loginValidationSchema),
    AuthController.loginUser
)
router.post(
    '/change-password',
    auth(USER_ROLE.student, USER_ROLE.admin, USER_ROLE.faculty),
    dataValidator(AuthValidation.changePasswordValidationSchema),
    AuthController.changePassword
)
router.post(
    '/refresh-token',
    // auth(USER_ROLE.student, USER_ROLE.admin, USER_ROLE.faculty),
    dataValidator(AuthValidation.refreshTokenValidationSchema),
    AuthController.refreshToken
)

router.post(
    "/forget-password",
    dataValidator(AuthValidation.forgetPasswordValidationSchema),
    AuthController.forgetPassword

)
router.post(
    "/reset-password",
    dataValidator(AuthValidation.resetPasswordValidationSchema),
    AuthController.resetPassword

)

export const AuthRouter = router;