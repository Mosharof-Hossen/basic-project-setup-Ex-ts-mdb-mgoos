import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
    {
        name: { type: String, required: true, unique: true },
        academicFaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty' },
    },
    {
        timestamps: true,
    },
);

academicDepartmentSchema.pre('save', async function (next) {
    const isDepartmentExist = await AcademicDepartment.findOne({
        name: this.name,
    });

    if (isDepartmentExist) {
        throw new Error("This department is already exist!")
    }
    next();
})
// academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
//     const query = this.getQuery()
    
//     const isDepartmentExist = await AcademicDepartment.findOne(query);
//     console.log(isDepartmentExist);
    
//     if (isDepartmentExist) {
//         throw new Error("This department dose Not exist!")
//     }

//     const data = this.getUpdate();
//     const duplicateDepartment = await AcademicDepartment.findOne({
//         name: data.name,
//     });
//     if (duplicateDepartment) {
//         throw new Error("This department is already exist!")
//     }
//     next();
// })


export const AcademicDepartment = model<TAcademicDepartment>(
    'AcademicDepartment',
    academicDepartmentSchema,
);
