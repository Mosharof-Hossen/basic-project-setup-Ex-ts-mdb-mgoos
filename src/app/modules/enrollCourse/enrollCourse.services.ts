import { startSession } from "mongoose";
import AppError from "../../errors/AppError";
import { OfferedCourse } from "../OfferedCourse/OfferedCourse.model";
import { Student } from "../student/student.model";
import { TEnrollCourse, TUpdateCourseMarks } from "./enrollCourse.interface";
import { EnrolledCourse } from "./enrollCourse.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";

const createEnrollCourseIntoDB = async (userId: string, payload: TEnrollCourse) => {

    const { offeredCourse } = payload;

    const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
    if (!isOfferedCourseExists) {
        throw new AppError(400, "Offered course not found.")
    }

    const student = await Student.findOne({ id: userId });
    if (!student) {
        throw new AppError(400, "Student not found.")
    }

    const course = await Course.findById(isOfferedCourseExists.course);
    if (!course) {
        throw new AppError(400, "Course Not Exists")
    }

    const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        offeredCourse,
        student: student._id,
    })
    if (isStudentAlreadyEnrolled) {
        throw new AppError(400, "Student already enrolled.")
    }

    if (!isOfferedCourseExists.maxCapacity) {
        throw new AppError(400, "Room is full!")
    }
    const session = await startSession();

    const semesterRegistration = await SemesterRegistration.findById(
        isOfferedCourseExists.semesterRegistration
    ).select("maxCredit");
    const enrollCourses = await EnrolledCourse.aggregate([
        {
            $match: {
                semesterRegistration: isOfferedCourseExists.semesterRegistration,
                student: student._id,
            },
        },
        {
            $lookup: {
                from: "courses",
                localField: "course",
                foreignField: "_id",
                as: "enrolledCourseData"
            }
        },
        {
            $unwind: "$enrolledCourseData"
        },
        {
            $group: {
                _id: null,
                totalEnrolledCredits: { $sum: "$enrolledCourseData.credits" }
            }
        },
        {
            $project: { _id: 0 }
        }
    ])

    const totalCredits = enrollCourses[0]?.totalEnrolledCredits || 0;
    const maxCredit = semesterRegistration?.maxCredit


    if (totalCredits && maxCredit && (totalCredits + course.credits) > maxCredit) {
        throw new AppError(400, "You have exceeded maximum number of credits.")
    }


    try {
        session.startTransaction();


        const result = await EnrolledCourse.create([{
            semesterRegistration: isOfferedCourseExists.semesterRegistration,
            academicDepartment: isOfferedCourseExists.academicDepartment,
            academicFaculty: isOfferedCourseExists.academicFaculty,
            academicSemester: isOfferedCourseExists.academicSemester,
            offeredCourse,
            course: isOfferedCourseExists.course,
            faculty: isOfferedCourseExists.faculty,
            student: student._id,
            isEnrolled: true
        }], { session })

        if (!result) {
            throw new AppError(400, "Failed to enrolled in this course.")
        }

        const maxCapacity = isOfferedCourseExists.maxCapacity;
        await OfferedCourse.findByIdAndUpdate(
            offeredCourse,
            { maxCapacity: maxCapacity - 1 },
            { session }
        )

        await session.commitTransaction();
        await session.endSession();
        return result;

    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }



}

const updateEnrolledCourseMarks = async (facultyId: string, payload: Partial<TUpdateCourseMarks>) => {
    const { semesterRegistration, offeredCourse, student, courseMarks } = payload;
    const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);
    if (!isOfferedCourseExists) {
        throw new AppError(400, "Offered course not found.")
    }

    const studentInfo = await Student.findById(student);
    if (!studentInfo) {
        throw new AppError(400, "Student not found.")
    }

    const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExists) {
        throw new AppError(400, "Semesters not found.")
    }

    const isFaculty = await Faculty.findOne({ id: facultyId });
    if (!isFaculty) {
        throw new AppError(400, "Faculty not found")
    }

    const isCourseBelongToFaculty = await EnrolledCourse.findOne({
        semesterRegistration,
        offeredCourse,
        student,
        faculty: isFaculty._id,
    });
    if (!isCourseBelongToFaculty) {
        throw new AppError(400, "This faculty is not updated that course marks.")
    }

    const modifiedData: Record<string, unknown> = {
        ...courseMarks
    }
    const updateField: Record<string, unknown> = {

    }

    if (modifiedData && Object.keys(modifiedData).length) {
        for (const [key, value] of Object.entries(modifiedData)) {
            updateField[`courseMarks.${key}`] = value;
        }
    }
    console.log({ updateField });
    const result = await EnrolledCourse.findByIdAndUpdate(
        isCourseBelongToFaculty._id,
        updateField,
        {
            new: true
        }
    )

    return result
}


export const EnrolledCourseServices = {
    createEnrollCourseIntoDB,
    updateEnrolledCourseMarks
}