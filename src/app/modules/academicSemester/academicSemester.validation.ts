import { z } from 'zod';

const nameEnum = z.enum(['Autumn', 'Summer', 'Fall']);
const monthEnum = z.enum([
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]);

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: nameEnum,
    year: z.string().min(4, 'Year is required'),
    code: z.enum(['01', '02', '03']),
    startMonth: monthEnum,
    endMonth: monthEnum,
  }),
});

export const academicSemesterValidations = {
  createAcademicSemesterValidationSchema,
};
