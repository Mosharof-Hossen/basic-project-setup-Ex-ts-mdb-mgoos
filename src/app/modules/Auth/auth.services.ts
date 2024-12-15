import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";

const loginUser = async (payload: TLoginUser) => {
    const user = await User.isUserExistByCustomId(payload.id);
    if (!user) {
        throw new AppError(400, "This user is not found!")
    }
    if (user?.isDeleted) {
        throw new AppError(400, "This user is deleted!")
    }
    if (user?.status === "blocked") {
        throw new AppError(400, "This user is blocked!")
    }

    const isPasswordMatched = await User.isPasswordMatched(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError(400, "Wrong Password")
    }

    const jwtPayload = {
        userId: user.id,
        role: user.role
    }

    const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: '10d' })

    return {
        token,
        needsPasswordChange: user?.needsPasswordChange
    };
}


export const AuthServices = {
    loginUser
}