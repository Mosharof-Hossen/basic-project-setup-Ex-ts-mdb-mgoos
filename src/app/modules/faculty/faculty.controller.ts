import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacultyServices } from './faculty.services';

const getSingleFaculty = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await FacultyServices.getSingleFaculty(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Faculty is retrieved successfully',
        data: result,
    });
});
const getAllFaculties = catchAsync(async (req, res) => {
    const result = await FacultyServices.getAllFaculties(req.query);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'All Faculty is retrieved successfully',
        data: result,
    });
});
const updateFaculty = catchAsync(async (req, res) => {
    const result = await FacultyServices.updateFacultyInDB(
        req.params.id,
        req.body.faculty,
    );
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Faculty update successfully',
        data: result,
    });
});
const deleteFaculty = catchAsync(async (req, res) => {
    const result = await FacultyServices.deleteFacultyFromDB(
        req.params.id
    );
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Faculty delete successfully',
        data: result,
    });
});

export const FacultyController = {
    getSingleFaculty,
    getAllFaculties,
    updateFaculty,
    deleteFaculty,
};
