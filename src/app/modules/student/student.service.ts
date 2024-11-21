import { Student } from '../student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExist(studentData.id)) {
    throw new Error('User Already Exist');
  }

  const result = await Student.create(studentData); // built in static method

  // const student = new Student(studentData); // built in instance method
  // if( await student.isUserExist(studentData.id)){
  //   throw new Error("User Already Exist")
  // }
  // const result = await student.save();

  return result;
};
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id: id });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
