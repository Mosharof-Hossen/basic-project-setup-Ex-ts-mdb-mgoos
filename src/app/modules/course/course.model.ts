import { model, Schema } from 'mongoose';
import { TCourse, TPrerequisiteCourse } from './course.interface';

const preRequisiteCourseSchema = new Schema<TPrerequisiteCourse>({
  course: {
    type: Schema.Types.ObjectId,
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
  preRequisiteCourse: [preRequisiteCourseSchema],
});

export const Course = model<TCourse>('Course', courseSchema);
