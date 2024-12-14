import { z } from 'zod';

const createOfferedCourseValidationSchema = z.object({
    body: z
        .object({
            semesterRegistration: z.string(),
            // academicSemester: z.string(),
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
            days: z.array(z.enum(['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'])),
            startTime: z.string().refine(
                (time) => {
                    const regex = /^([01]\d|2[0-3]):[0-5]\d$/;
                    return regex.test(time);
                },
                {
                    message: "Invalid time format, expected 'HH:MM' in 24 hours format",
                },
            ),
            endTime: z.string().refine(
                (time) => {
                    const regex = /^([01]\d|2[0-3]):[0-5]\d$/;
                    return regex.test(time);
                },
                {
                    message: "Invalid time format, expected 'HH:MM' in 24 hours format",
                },
            ),
        })
        .refine(
            (body) => {
                const start = new Date(`1971-01-01T${body.startTime}`);
                const end = new Date(`1971-01-01T${body.endTime}`);
                return end > start;
            },
            {
                message: 'End time must be greater than startTime',
            },
        ),
});

const updateOfferedCourseValidationSchema = z.object({
    body: z.object({
        faculty: z.string(),
        maxCapacity: z
            .number()
            .int('Max capacity must be an integer')
            .positive('Max capacity must be greater than 0'),
        days: z.array(z.enum(['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'])),
        startTime: z.string().refine(
            (time) => {
                const regex = /^([01]\d|2[0-3]):[0-5]\d$/;
                return regex.test(time);
            },
            {
                message: "Invalid time format, expected 'HH:MM' in 24 hours format",
            },
        ),
        endTime: z.string().refine(
            (time) => {
                const regex = /^([01]\d|2[0-3]):[0-5]\d$/;
                return regex.test(time);
            },
            {
                message: "Invalid time format, expected 'HH:MM' in 24 hours format",
            },
        ),
    })
        .refine(
            (body) => {
                const start = new Date(`1971-01-01T${body.startTime}`);
                const end = new Date(`1971-01-01T${body.endTime}`);
                return end > start;
            },
            {
                message: 'End time must be greater than startTime',
            },
        ),
});

export const OfferedCourseValidation = {
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema,
};
