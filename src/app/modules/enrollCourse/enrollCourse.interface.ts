import { Types } from "mongoose";

export type TCourseMarks = {
    classTest1: number;
    midTerm: number;
    classTest2: number;
    finalTerm: number;
}

export type TUpdateCourseMarks = {
    semesterRegistration: string;
    offeredCourse: string;
    student: string;
    courseMarks: {
        classTest1: number;
        midTerm: number;
        classTest2: number;
        finalTerm: number;
    }
}
export type TGrade = "A" | "B" | "C" | "D" | "E" | "F" | "NA";

export type TEnrollCourse = {
    semesterRegistration: Types.ObjectId;
    academicSemester: Types.ObjectId;
    academicFaculty: Types.ObjectId;
    academicDepartment: Types.ObjectId;
    offeredCourse: Types.ObjectId;
    course: Types.ObjectId;
    student: Types.ObjectId;
    faculty: Types.ObjectId;
    isEnrolled: boolean;
    courseMarks: TCourseMarks;
    grade: TGrade;
    gradePoints: number;
    isCompleted: boolean;
};