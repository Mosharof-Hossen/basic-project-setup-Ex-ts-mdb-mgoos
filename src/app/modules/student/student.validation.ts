import { z } from 'zod';

// Helper Functions
const isCapitalized = (value: string) => {
  const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
  return capitalized === value;
};

// UserName Schema
const userNameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First name cannot exceed 20 characters')
    .refine(isCapitalized, {
      message: 'First name must be capitalized',
    }),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .refine((val) => /^[A-Za-z]+$/.test(val), {
      message: 'Last name must contain only alphabets',
    }),
});

// Guardian Schema
const guardianSchema = z.object({
  fatherName: z.string().trim().min(1, "Father's name is required"),
  fatherOccupation: z.string().trim().min(1, "Father's occupation is required"),
  fatherContactNo: z
    .string()
    .trim()
    .min(1, "Father's contact number is required"),
  motherName: z.string().trim().min(1, "Mother's name is required"),
  motherOccupation: z.string().trim().min(1, "Mother's occupation is required"),
  motherContactNo: z
    .string()
    .trim()
    .min(1, "Mother's contact number is required"),
});

// Local Guardian Schema
const localGuardianSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required"),
  occupation: z
    .string()
    .trim()
    .min(1, "Local guardian's occupation is required"),
  contactNo: z
    .string()
    .trim()
    .min(1, "Local guardian's contact number is required"),
  address: z.string().trim().min(1, "Local guardian's address is required"),
});

// Main Student Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      id: z.string(),
      name: userNameSchema,
      gender: z.enum(['female', 'male'], {
        errorMap: () => ({
          message: 'Gender must be either "female" or "male"',
        }),
      }),
      dateOfBirth: z.string().optional(),
      email: z.string().email('Invalid email address'),
      contactNo: z.string().min(1, 'Contact number is required'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
        .optional(),
      presentAddress: z.string().min(1, 'Present address is required'),
      permanentAddress: z.string().min(1, 'Permanent address is required'),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      profileImg: z.string().optional(),
      admissionSemester: z.string(),
    }),
  }),
});

export const studentValidations = { createStudentValidationSchema };
