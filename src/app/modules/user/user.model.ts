import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import config from '../../config';
import bcript, { compare } from 'bcrypt';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      select: 0
    },
    needsPasswordChange: {
      type: Boolean,
      required: true,
      default: true,
    },
    passwordChangeAt: { type: Date },
    role: {
      type: String,
      enum: ['superAdmin', 'admin', 'student', 'faculty'],
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  this.password = await bcript.hash(this.password, Number(config.salt_round));
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return await User.findOne({ id }).select("+password")
}
userSchema.statics.isPasswordMatched = async function (plainTextPassword: string, hashedPassword: string) {
  return await compare(plainTextPassword, hashedPassword)
}

userSchema.statics.isJWTIssuedBeforePasswordChange = async function (passwordChangeAt: Date, jwtIssuedTimeAt: number) {
  const passwordChangeTime = new Date(passwordChangeAt).getTime() / 1000;
  return passwordChangeTime > jwtIssuedTimeAt;
}

export const User = model<TUser, UserModel>('User', userSchema);
