import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../errors/AppError';

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
};
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(
        Course.find().populate('preRequisiteCourse.course'),
        query,
    )
        .search(CourseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await courseQuery.modelQuery;
    return result;
};
const getSingleCourseFromDB = async (id: string) => {
    const result = await Course.findById(id).populate(
        'preRequisiteCourse.course',
    );
    return result;
};
const deleteCourseFromDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(
        id,
        {
            isDeleted: true,
        },
        { new: true },
    );
    return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
    const { preRequisiteCourse, ...courseRemainingData } = payload;
    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
            id,
            courseRemainingData,
            {
                new: true,
                runValidators: true,
                session,
            },
        );

        if (!updatedBasicCourseInfo) {
            throw new AppError(400, 'Failed to update Course');
        }

        if (preRequisiteCourse && preRequisiteCourse.length) {
            const deletedPreRequisites = preRequisiteCourse
                .filter((el) => el.course && el.isDeleted)
                .map((el) => el.course);

            const deletedPreRequisitesCourses = await Course.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        preRequisiteCourse: { course: { $in: deletedPreRequisites } },
                    },
                },
                {
                    session,
                },
            );

            if (!deletedPreRequisitesCourses) {
                throw new AppError(400, 'Failed to update Course');
            }

            const newPrerequisites = preRequisiteCourse?.filter(
                (el) => el.course && !el.isDeleted,
            );

            const newPrerequisiteCourse = await Course.findByIdAndUpdate(
                id,
                {
                    $addToSet: { preRequisiteCourse: { $each: newPrerequisites } },
                },
                {
                    session,
                },
            );

            if (!newPrerequisiteCourse) {
                throw new AppError(400, 'Failed to update Course');
            }
        }

        if (!preRequisiteCourse) {
            throw new AppError(400, 'Failed to update Course');
        }

        const result = await Course.findById(id).populate(
            'preRequisiteCourse.course',
        );

        session.commitTransaction();
        session.endSession()

        return result;
    } catch (err) {
        session.abortTransaction()
        session.endSession()
        throw new AppError(400, err)
    }
};

const assignFacultiesWithCourseIntoDB = async (id: string, payload: Partial<TCourseFaculty>) => {
    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            course: id,
            $addToSet: { faculties: { $each: payload } }
        },
        {
            upsert: true,
            new: true,
        }
    )
    return result;
};
const removeFacultiesFromCourseIntoDB = async (id: string, payload: Partial<TCourseFaculty>) => {
    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            $pull: { faculties: { $in: payload } }
        },
        {
            new: true,
        }
    )
    return result;
};


export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB,
    updateCourseIntoDB,
    assignFacultiesWithCourseIntoDB,
    removeFacultiesFromCourseIntoDB
};
