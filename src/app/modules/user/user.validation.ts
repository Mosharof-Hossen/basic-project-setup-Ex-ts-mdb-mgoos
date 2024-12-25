import { z } from 'zod';

const userSchemaValidator = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .min(6, 'Password must be at least 6 characters long')
    .optional(),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(['in-progress', 'blocked']),
  })
})

export const userValidation = {
  changeStatusValidationSchema,
  userSchemaValidator
};
