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

export const AuthRouter = router;