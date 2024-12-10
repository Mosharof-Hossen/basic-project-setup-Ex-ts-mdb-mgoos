import { Types } from "mongoose";

export type TUserName = {
    firstName: string;
    middleName?: string;
    lastName?: string;
}
export type TBloodGroup =
    | 'A+'
    | 'A-'
    | 'B+'
    | 'B-'
    | 'AB+'
    | 'AB-'
    | 'O+'
    | 'O-';
export type TGender = 'male' | 'female' | 'other';
export type TFaculty = {
    id: string;
    user: string;
    designation: string;
    name: TUserName;
    gender: TGender;
    dateOfBirth?: Date;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup: TBloodGroup;
    presentAddress: string;
    permanentAddress: string;
    profileImage: string;
    academicDepartment: Types.ObjectId;
    isDeleted: boolean
}