import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicDepartmentServices } from './academicDepartment.services';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await academicDepartmentServices.createAcademicDepartment(
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department is created successfully',
    data: result,
  });
});
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result = await academicDepartmentServices.getAllAcademicDepartment();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Academic Department is retrieved successfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const result = await academicDepartmentServices.getSingleAcademicDepartment(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department is retrieved successfully',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const result = await academicDepartmentServices.updateAcademicDepartment(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department is updated successfully',
    data: result,
  });
});

export const academicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
