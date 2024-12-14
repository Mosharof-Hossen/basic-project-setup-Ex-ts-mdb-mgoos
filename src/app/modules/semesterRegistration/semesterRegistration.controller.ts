import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationServices } from './semesterRegistration.services';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Semester Registration Created Successfully',
    data: result,
  });
});
const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(
      req.query,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All Semester Registration retrieved Successfully',
    data: result,
  });
});
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(
      req.params.id,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Single Semester Registration retrieved Successfully',
    data: result,
  });
});
const updateSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(
      req.params.id,
      req.body,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Semester Registration updated Successfully',
    data: result,
  });
});

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
