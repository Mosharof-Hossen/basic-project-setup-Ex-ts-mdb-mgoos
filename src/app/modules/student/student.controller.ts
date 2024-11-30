import { Request, Response } from 'express';
import { studentServices } from './student.service';
import JoiStudentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;

    // Data Validation using Joi
    const { value, error } = JoiStudentValidationSchema.validate(student);
    console.log({ value }, { error });
    if (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error,
      });
    }
    const result = await studentServices.createStudentIntoDB(value);
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students is retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await studentServices.getSingleStudentFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
