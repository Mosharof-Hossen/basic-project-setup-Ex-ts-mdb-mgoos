import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from "jsonwebtoken";
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError(401, "You are not authorized ")
        }
        const decode = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
        const role = decode.role;

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


        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(401, "You are not authorized");
        }

        req.user = decode;
        next();
    });
};

export default auth;
