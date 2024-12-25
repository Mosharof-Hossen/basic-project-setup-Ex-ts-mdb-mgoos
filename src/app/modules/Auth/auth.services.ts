import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TChangePassword, TLoginUser } from "./auth.interface";
import jwt, { JwtPayload, verify } from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import { sendEmail } from "../../utils/sendEmail";

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

    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: '1d' })
    const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret as string, { expiresIn: '365d' })

    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user?.needsPasswordChange
    };
}

const changePassword = async (userData: JwtPayload, payload: TChangePassword) => {
    const user = await User.isUserExistByCustomId(userData.userId);
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

const refreshToken = async (token: string) => {
    if (!token) {
        throw new AppError(401, "You are not authorized ")
    }
    const decode = jwt.verify(token, config.jwt_refresh_secret as string) as JwtPayload;
    // const role = decode.role;

    const user = await User.isUserExistByCustomId(decode.userId);
    if (!user) {
        throw new AppError(400, "This user is not found!")
    }
    if (user?.isDeleted) {
        throw new AppError(400, "This user is deleted!")
    }
    if (user?.status === "blocked") {
        throw new AppError(400, "This user is blocked!")
    }

    if (user.passwordChangeAt && await User.isJWTIssuedBeforePasswordChange(user.passwordChangeAt, decode.iat as number)) {
        throw new AppError(400, "You are not authorized.")
    }

    const jwtPayload = {
        userId: user.id,
        role: user.role
    }

    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: '1d' })

    return { accessToken };
}

const forgetPassword = async (id: string) => {
    const user = await User.isUserExistByCustomId(id);
    if (!user) {
        throw new AppError(400, "This user is not found!")
    }
    if (user?.isDeleted) {
        throw new AppError(400, "This user is deleted!")
    }
    if (user?.status === "blocked") {
        throw new AppError(400, "This user is blocked!")
    }

    const jwtPayload = {
        userId: user.id,
        role: user.role
    }

    const resetToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: '30min' })


    const resetLink = `${config.localhost}?id=${user.id}&token=${resetToken}`

    sendEmail(user.email, resetLink)
    return resetLink
}

const resetPassword = async (payload: { id: string, newPassword: string }, token: string) => {
    const user = await User.isUserExistByCustomId(payload?.id);
    if (!user) {
        throw new AppError(400, "This user is not found!")
    }
    if (user?.isDeleted) {
        throw new AppError(400, "This user is deleted!")
    }
    if (user?.status === "blocked") {
        throw new AppError(400, "This user is blocked!")
    }

    const decode = verify(token, config.jwt_access_secret as string) as JwtPayload;

    if (user.id !== decode.userId) {
        throw new AppError(400, "You are not authorized.")
    }
    const newHashPassword = await hash(payload.newPassword, Number(config.salt_round));
    await User.findOneAndUpdate(
        {
            id: user.id,
            role: user.role
        },
        {
            password: newHashPassword,
            needsPasswordChange: false,
            passwordChangeAt: new Date()
        }
    )
}

export const AuthServices = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword
}