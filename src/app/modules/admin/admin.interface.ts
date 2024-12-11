import { Types } from 'mongoose';
export type TAdminName = {
  firstName: string;
  middleName?: string;
  lastName?: string;
};
export type TAdminGender = {
  gender: 'male' | 'female' | 'other';
};

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TAdminName;
  gender: TAdminGender;
  email: string;
  dateOfBirth?: Date;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  isDeleted?: boolean;
};
