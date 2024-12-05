import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicFacultyServices } from "./academicFaculty.services";

const createAcademicFaculty = catchAsync(async (req, res) => {
    const result = await academicFacultyServices.createAcademicFaculty(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Faculty is created successfully",
        data: result
    })
})
const getAllAcademicFaculty = catchAsync(async (req, res) => {
    const result = await academicFacultyServices.getAllAcademicFaculty();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All Academic Faculty is retrieved successfully",
        data: result
    })
})
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const result = await academicFacultyServices.getSingleAcademicFaculty(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Single Academic Faculty is retrieved successfully",
        data: result
    })
})
const updateSingleAcademicFaculty = catchAsync(async (req, res) => {
    const result = await academicFacultyServices.updateSingleAcademicFaculty(req.params.id,req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Academic Faculty updated successfully",
        data: result
    })
})


export const academicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateSingleAcademicFaculty

}