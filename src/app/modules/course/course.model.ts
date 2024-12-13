import { model, Schema } from 'mongoose';
import { TCourse, TCourseFaculty, TPrerequisiteCourse } from './course.interface';

const preRequisiteCourseSchema = new Schema<TPrerequisiteCourse>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
});

const courseSchema = new Schema<TCourse>({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    code: {
        type: Number,
        unique: true,
        required: true,
    },
    credits: {
        type: Number,
        required: true,
    },
    prefix: {
        type: String,
        trim: true,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    preRequisiteCourse: [preRequisiteCourseSchema],
});

export const Course = model<TCourse>('Course', courseSchema);

const courseFacultySchema = new Schema<TCourseFaculty>({
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Course"
    },
    faculties: [{
        type: Schema.Types.ObjectId,
        required: true,
        
    }]
})
export const CourseFaculty = model<TCourseFaculty>('Course', courseFacultySchema);