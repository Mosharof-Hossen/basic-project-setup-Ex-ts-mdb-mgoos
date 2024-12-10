import { z } from 'zod';

// Gender Enum
const GenderEnum = z.enum(['male', 'female', 'other']);

// Blood Group Enum
const BloodGroupEnum = z.enum([
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
]);

// Faculty Name Schema
const facultyNameSchema = z.object({
  firstName: z.string().trim().min(1, 'First Name is required'),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
});

// Faculty Schema
const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    faculty: z.object({
      id: z.string().min(1, 'ID is required'),
      designation: z.string().min(1, 'Designation is required'),
      name: facultyNameSchema,
      gender: GenderEnum,
      dateOfBirth: z.string().optional(),
      email: z.string().email('Invalid email').min(1, 'Email is required'),
      contactNo: z.string().min(1, 'Contact Number is required'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency Contact Number is required'),
      bloodGroup: BloodGroupEnum,
      presentAddress: z.string().min(1, 'Present Address is required'),
      permanentAddress: z.string().min(1, 'Permanent Address is required'),
      profileImage: z.string().optional(),
      academicDepartment: z.string().min(1, 'Academic Department is required'),
    }),
  }),
});

const UpdateGenderEnum = z.enum(['male', 'female', 'other']).optional();

// Blood Group Enum
const UpdateBloodGroupEnum = z
  .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
  .optional();

// Faculty Name Schema
const UpdateFacultyNameSchema = z.object({
  firstName: z.string().trim().min(1, 'First Name is required').optional(),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
});

const updateFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    faculty: z.object({
      id: z.string().min(1, 'ID is required').optional(),
      designation: z.string().min(1, 'Designation is required').optional(),
      name: UpdateFacultyNameSchema.optional(),
      gender: UpdateGenderEnum,
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('Invalid email')
        .min(1, 'Email is required')
        .optional(),
      contactNo: z.string().min(1, 'Contact Number is required').optional(),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency Contact Number is required')
        .optional(),
      bloodGroup: UpdateBloodGroupEnum.optional(),
      presentAddress: z
        .string()
        .min(1, 'Present Address is required')
        .optional(),
      permanentAddress: z
        .string()
        .min(1, 'Permanent Address is required')
        .optional(),
      profileImage: z.string().optional(),
      academicDepartment: z
        .string()
        .min(1, 'Academic Department is required')
        .optional(),
    }),
  }),
});

export const FacultyValidations = {
  createFacultyValidationSchema,

  updateFacultyValidationSchema,
};
