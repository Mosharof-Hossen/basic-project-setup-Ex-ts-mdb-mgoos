import AppError from "../../errors/AppError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { OfferedCourse } from "./OfferedCourse.model";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
    const { semesterRegistration, academicFaculty, academicDepartment, course, faculty } = payload

    const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExists) {
        throw new AppError(400, "Semester Registration not found!")
    }

    const isAcademicFacultyExits = await AcademicFaculty.findById(academicFaculty);
    if (!isAcademicFacultyExits) {
        throw new AppError(400, "Academic Faculty not found!")
    }

    const isAcademicDepartmentExits = await AcademicDepartment.findById(academicDepartment);
    if (!isAcademicDepartmentExits) {
        throw new AppError(400, "Academic Department not found!")
    }

    const isCourseExits = await Course.findById(course);
    if (!isCourseExits) {
        throw new AppError(400, "Course not found!")
    }

    const isFacultyExits = await Faculty.findById(faculty);
    if (!isFacultyExits) {
        throw new AppError(400, "Faculty not found!")
    }

    const academicSemester = isSemesterRegistrationExists.academicSemester;

    const result = await OfferedCourse.create({ ...payload, academicSemester });
    return result;
}

export const OfferedCourseServices = {
    createOfferedCourseIntoDB
}