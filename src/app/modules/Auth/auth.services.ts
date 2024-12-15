import { compare } from "bcrypt";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";

const loginUser = async (payload: TLoginUser) => {
    const isUserExists = await User.isUserExistByCustomId(payload.id);
    if (!isUserExists) {
        throw new AppError(400, "This user is not found!")
    }
    if (isUserExists?.isDeleted) {
        throw new AppError(400, "This user is deleted!")
    }
    if (isUserExists?.status === "blocked") {
        throw new AppError(400, "This user is blocked!")
    }

    const isPasswordMatched = await User.isPasswordMatched(payload.password, isUserExists.password);
    if (!isPasswordMatched) {
        throw new AppError(400, "Wrong Password")
    }

    console.log(isPasswordMatched);
    return isUserExists;
}


export const AuthServices = {
    loginUser
}