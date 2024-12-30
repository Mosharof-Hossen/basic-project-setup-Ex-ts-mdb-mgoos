import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUserRole = keyof typeof USER_ROLE;


export interface TUser {
  id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'super-admin' | 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
  passwordChangeAt?: Date;
};

export interface UserModel extends Model<TUser> {
  isUserExistByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): boolean;
  isJWTIssuedBeforePasswordChange(passwordChangeAt: Date, jwtIssuedTimeAt: number): boolean;
} 