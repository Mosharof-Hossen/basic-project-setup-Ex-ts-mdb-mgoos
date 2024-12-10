import { model, Schema } from 'mongoose';
import {
    TBloodGroup,
    TFaculty,
    TFacultyName,
    TGender,
} from './faculty.interface';

const facultyNameSchema = new Schema<TFacultyName>({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
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
const Gender: TGender[] = ['male', 'female', 'other'];
const BloodGroup: TBloodGroup[] = [
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
];

const facultySchema = new Schema<TFaculty>(
    {
        id: {
            type: String,
            required: [true, 'Id is required'],
            unique: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            required: [true, 'User id is Required'],
            unique: true,
            ref: 'User',
        },
        designation: {
            type: String,
            required: [true, 'Designation is required'],
        },
        name: facultyNameSchema,
        gender: {
            type: String,
            enum: {
                values: Gender,
                message: `{VALUE} is not a valid gender`,
            },
            required: [true, 'Gender is required'],
        },
        dateOfBirth: { type: Date },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        contactNo: {
            type: String,
            required: [true, 'Contact Number is required'],
        },
        emergencyContactNo: {
            type: String,
            required: [true, 'Emergency Contact is required'],
        },
        bloodGroup: {
            type: String,
            enum: {
                values: BloodGroup,
                message: `{VALUE} is not a valid Blood Group`,
            },
            required: [true, 'Blood Group is required'],
        },
        presentAddress: {
            type: String,
            required: [true, 'Present Address  is required'],
        },
        permanentAddress: {
            type: String,
            required: [true, 'Permanent Address  is required'],
        },
        profileImage: {
            type: String,
        },
        academicDepartment: {
            type: Schema.Types.ObjectId,
            required: [true, 'Academic Department is required'],
            ref: 'AcademicDepartment',
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

facultySchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } })
    next()
})
facultySchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } })
    next()
})
facultySchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
    next()
})



export const Faculty = model<TFaculty>('Faculty', facultySchema);
