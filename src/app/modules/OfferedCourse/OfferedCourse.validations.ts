import { z } from 'zod';

const createOfferedCourseValidationSchema = z.object({
    body: z.object({
        semesterRegistration: z.string(),
        academicSemester: z.string(),
        academicFaculty: z.string(),
        academicDepartment: z.string(),
        course: z.string(),
        faculty: z.string(),
        maxCapacity: z
            .number()
            .int('Max capacity must be an integer')
            .positive('Max capacity must be greater than 0'),
        section: z
            .number()
            .int('Section must be an integer')
            .positive('Section must be greater than 0'),
        days: z.enum(['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']),
        startTime: z.string(),
        endTime: z.string(),
    }),
});
const updateOfferedCourseValidationSchema = z.object({
    body: z.object({
        faculty: z.string().optional(),
        maxCapacity: z
            .number()
            .int('Max capacity must be an integer')
            .positive('Max capacity must be greater than 0')
            .optional(),
        days: z.enum(['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']).optional(),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
    }),
});

export const OfferedCourseValidation = {
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema
};
