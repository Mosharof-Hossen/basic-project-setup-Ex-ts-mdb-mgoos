import { Router } from "express";
import dataValidator from "../../middlwares/dataValidator";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = Router();

router.post(
    '/login',
    dataValidator(AuthValidation.loginValidationSchema),
    AuthController.loginUser
)

export const AuthRouter = router;