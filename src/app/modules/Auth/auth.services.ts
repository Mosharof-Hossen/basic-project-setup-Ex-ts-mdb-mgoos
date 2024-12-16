import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TChangePassword, TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

const loginUser = async (payload: TLoginUser) => {
    const user = await User.isUserExistByCustomId(payload.id);
    console.log(user);
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

const changePassword = async (userData: JwtPayload, payload: TChangePassword) => {
    const user = await User.isUserExistByCustomId(userData.userId);
    console.log(user);
    if (!user) {
        throw new AppError(400, "This user is not found!")
    }
    if (user?.isDeleted) {
        throw new AppError(400, "This user is deleted!")
    }
    if (user?.status === "blocked") {
        throw new AppError(400, "This user is blocked!")
    }

    const isPasswordMatched = await User.isPasswordMatched(payload.oldPassword, user.password);
    if (!isPasswordMatched) {
        throw new AppError(400, "Wrong old Password")
    }

    const newHashPassword = await bcrypt.hash(payload.newPassword, Number(config.salt_round));
    // console.log(payload, newHashPassword);

    await User.findOneAndUpdate({
        id: user.id,
        role: user.role,
    },
        {
            password: newHashPassword,
            needsPasswordChange: false,
            passwordChangeAt: new Date(),
        },
        { new: true }
    )
    return null;
}

export const AuthServices = {
    loginUser,
    changePassword
}