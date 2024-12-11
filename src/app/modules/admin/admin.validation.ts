import { z } from 'zod';

const createAdminNameSchema = z.object({
    firstName: z.string().trim().min(1, 'First name is required'),
    middleName: z.string().trim().optional(),
    lastName: z.string().trim().optional(),
});

const createAdminSchema = z.object({
    body: z.object({
        admin: z.object({
            name: createAdminNameSchema,
            designation: z.string().min(1, 'Designation is required'),
            gender: z.enum(['male', 'female', 'other']).optional(),
            dateOfBirth: z.string().optional(),
            email: z
                .string()
                .email('Invalid email address')
                .min(1, 'Email is required'),
            contactNo: z.string().min(1, 'Contact no is required'),
            emergencyContactNo: z.string().min(1, 'Emergency Contact no is required'),
            permanentAddress: z.string().min(1, 'Permanent Address is required'),
            presentAddress: z.string().min(1, 'Present Address is required'),
            profileImage: z.string().url().optional(),
            isDeleted: z.boolean().default(false),
        }),
    }),
});

const updateAdminNameSchema = z.object({
    firstName: z.string().trim().min(1, 'First name is required').optional(),
    middleName: z.string().trim().optional(),
    lastName: z.string().trim().optional(),
});

const updateAdminSchema = z.object({
    body: z.object({
        admin: z.object({
            id: z.string().min(1, 'Id is required').optional(),
            user: z.string().min(1, 'User is required').optional(), // Assuming ObjectId as string
            name: updateAdminNameSchema.optional(),
            designation: z.string().min(1, 'Designation is required').optional(),
            gender: z.enum(['male', 'female', 'other']).optional(),
            dateOfBirth: z.string().datetime().optional(),
            email: z
                .string()
                .email('Invalid email address')
                .min(1, 'Email is required')
                .optional(),
            contactNo: z.string().min(1, 'Contact no is required').optional(),
            emergencyContactNo: z
                .string()
                .min(1, 'Emergency Contact no is required')
                .optional(),
            permanentAddress: z
                .string()
                .min(1, 'Permanent Address is required')
                .optional(),
            presentAddress: z.string().min(1, 'Present Address is required').optional(),
            profileImage: z.string().url().optional().optional(),
            isDeleted: z.boolean().default(false).optional(),
        })
    })
});

export const AdminValidations = {
    createAdminSchema,
    updateAdminSchema,
};
