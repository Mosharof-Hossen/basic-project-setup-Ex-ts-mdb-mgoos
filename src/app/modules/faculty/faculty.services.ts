import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

const getSingleFaculty = async (id: string) => {
  const result = await Faculty.findById(id).populate('academicDepartment');
  return result;
};
const getAllFaculties = async () => {
  const result = await Faculty.find().populate('academicDepartment');
  return result;
};

const updateFacultyInDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }
  console.log(modifiedUpdateData);
  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const FacultyServices = {
  getSingleFaculty,
  getAllFaculties,
  updateFacultyInDB,
};
