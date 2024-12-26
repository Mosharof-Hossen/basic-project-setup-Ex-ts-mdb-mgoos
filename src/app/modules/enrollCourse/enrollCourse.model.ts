import { model, Schema } from "mongoose";
import { TCourseMarks, TEnrollCourse } from "./enrollCourse.interface";

const courseMarksSchema = new Schema<TCourseMarks>({
    classTest1: {
        type: Number,
        default: 0
    },
    classTest2: {
        type: Number,
        default: 0
    },
    finalTerm:
    {
        type: Number,
        default: 0
    },
    midTerm: {
        type: Number,
        default: 0
    },
})

const enrollCourseModelSchema = new Schema<TEnrollCourse>({
    semesterRegistration: {
        type: Schema.Types.ObjectId,
        ref: "SemesterRegistration",
        required: true
    },
    academicSemester: {
        type: Schema.Types.ObjectId,
        ref: "AcademicSemester",
        required: true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: "AcademicDepartment",
        required: true
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        ref: "AcademicDepartment",
        required: true
    },
    offeredCourse: {
        type: Schema.Types.ObjectId,
        ref: "OfferedCourse",
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: "Faculty",
        required: true
    },
    isEnrolled: {
        type: Boolean,
        // required: true
        default: false
    },
    courseMarks: {
        type: courseMarksSchema,
        default: {}
    },
    grade: {
        type: String,
        enum: ["A", "B", "C", "D", "E", "F", "NA"],
        default: "NA",
    },
    gradePoints: {
        type: Number,
        min: 0,
        max: 4,
        default: 0
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export const EnrolledCourse = model<TEnrollCourse>("EnrolledCourse", enrollCourseModelSchema);