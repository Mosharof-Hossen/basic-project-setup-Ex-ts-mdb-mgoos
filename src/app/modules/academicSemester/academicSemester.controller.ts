import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Semester is created successfully',
    data: result,
  });
});
const getAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAcademicSemester(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieve All academic Semester successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AcademicSemesterServices.getSingleAcademicSemester(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieve single academic Semester successfully',
    data: result,
  });
});
const updateAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const result = await AcademicSemesterServices.updateAcademicSemester(
    id,
    data,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Updated academic Semester successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAcademicSemester,
  updateAcademicSemester,
  getSingleAcademicSemester,
};
