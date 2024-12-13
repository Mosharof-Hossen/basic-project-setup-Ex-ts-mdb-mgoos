import { Types } from 'mongoose';

export type TPrerequisiteCourse = {
    course: Types.ObjectId;
    isDeleted: boolean;
};

export type TCourse = {
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourse: [TPrerequisiteCourse];
    isDeleted?: boolean;
};

export type TCourseFaculty = {
    course: Types.ObjectId;
    faculties: [Types.ObjectId];
}
