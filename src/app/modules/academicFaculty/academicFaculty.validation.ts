import { z } from "zod";

const createAcademicFacultyValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required")
    })
})
const updateAcademicFacultyValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Name is required")
    })
})

export const academicFacultyValidation = {
    createAcademicFacultyValidationSchema,
    updateAcademicFacultyValidationSchema
}