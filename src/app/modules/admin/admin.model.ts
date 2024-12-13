import { model, Schema } from 'mongoose';
import { TAdmin, TAdminName } from './admin.interface';

const adminNameSchema = new Schema<TAdminName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
});

const adminSchema = new Schema<TAdmin>({
  id: {
    type: String,
    required: [true, 'Id is required'],
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is required'],
    unique: true,
    ref: 'User',
  },
  name: adminNameSchema,
  designation: {
    type: String,
    required: [true, 'Designation is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: `{VALUE} is not a valid gender`,
    },
  },
  dateOfBirth: { type: Date },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Contact no is required'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency Contact no is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent Address no is required'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address no is required'],
  },
  profileImage: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

adminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
adminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Admin = model<TAdmin>('Admin', adminSchema);
