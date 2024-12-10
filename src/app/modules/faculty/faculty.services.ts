import { Faculty } from "./faculty.model"

const getSingleFaculty = async (id: string) => {
    const result = await Faculty.findById(id).populate("academicDepartment");
    return result;
}
const getAllFaculties = async () => {
    const result = await Faculty.find().populate("academicDepartment");
    return result;
}

export const FacultyServices = {
    getSingleFaculty,
    getAllFaculties
}