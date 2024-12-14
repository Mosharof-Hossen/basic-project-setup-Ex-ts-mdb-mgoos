import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });
  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      400,
      `There is already exist a ${isThereAnyUpcomingOrOngoingSemester.status} semester`,
    );
  }

  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(400, 'This Academic Semester is not founded');
  }

  const isSemesterRegistrationAlReadyDone = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationAlReadyDone) {
    throw new AppError(400, 'Semester Registration Already done');
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};
const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};
const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const requestedStatus = payload?.status;
  const currentSemesterRegistration = await SemesterRegistration.findById(id);
  if (!currentSemesterRegistration) {
    throw new AppError(400, 'This Academic Semester is not founded');
  }
  if (currentSemesterRegistration?.status === 'ENDED') {
    throw new AppError(400, 'This semester is already ENDED');
  }
  if (
    currentSemesterRegistration.status === 'UPCOMING' &&
    requestedStatus === 'ENDED'
  ) {
    throw new AppError(
      400,
      'You can not directly change status from UPCOMING to ENDED',
    );
  }
  if (
    currentSemesterRegistration.status === 'ONGOING' &&
    requestedStatus === 'UPCOMING'
  ) {
    throw new AppError(
      400,
      `You can not directly change status from ${currentSemesterRegistration.status} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
