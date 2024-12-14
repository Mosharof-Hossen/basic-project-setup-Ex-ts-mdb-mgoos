import { model, Schema } from "mongoose";
import { TOfferedCourse } from "./OfferedCourse.inteface";

const offeredCourseSchema = new Schema<TOfferedCourse>({
    semesterRegistration: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "SemesterRegistration"
    },
    academicSemester: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "AcademicSemester"
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "AcademicFaculty"
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "AcademicDepartment"
    },
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "CourseFaculty"
    },
    faculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Faculty"
    },
    maxCapacity: {
        type: Number,
        required: true
    },
    section: {
        type: Number,
        required: true
    },
    days: {
        type: String,
        enum: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
})

export const OfferedCourse = model<TOfferedCourse>("OfferedCourse", offeredCourseSchema);