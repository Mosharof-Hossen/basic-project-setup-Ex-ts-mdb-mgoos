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

export const FacultyValidations = {
  createFacultyValidationSchema,
};
