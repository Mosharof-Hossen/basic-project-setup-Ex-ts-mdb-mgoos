import mongoose, { startSession } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
    const adminSearchableFields = [
        'email',
        'id',
        'contactNo',
        'emergencyContactNo',
        'name.firstName',
        'name.lastName',
        'name.middleName',
    ];
    const adminQuery = new QueryBuilder(Admin.find(), query)
        .search(adminSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await adminQuery.modelQuery;
    return result;
};

const getSingleAdminFromDB = async (id: string) => {
    const result = await Admin.findById(id);
    return result;
}

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
    const { name, ...remainingAdminData } = payload;
    const modifiedUpdateData: Record<string, unknown> = {
        ...remainingAdminData
    }
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdateData[`name.${key}`] = value;
        }
    }
    const result = await Admin.findByIdAndUpdate(id, modifiedUpdateData, { new: true });
    return result;
}

const deleteAdminFromDB = async (id: string) => {
    const session = await mongoose.startSession();
    try {
        await session.startTransaction();

        const deleteAdmin = await Admin.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true, session }
        )

        if (!deleteAdmin) {
            throw new AppError(400, "Failed to delete admin.")
        }

        const userId = deleteAdmin.user;
        const deletedUser = await User.findByIdAndUpdate(
            userId,
            { isDeleted: true },
            { new: true, session }
        )
        if (!deletedUser) {
            throw new AppError(400, "Failed to delete User.")
        }

        await session.commitTransaction();
        await session.endSession();

        return deleteAdmin;

    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err)
    }
}

export const adminServices = {
    getAllAdminsFromDB,
    getSingleAdminFromDB,
    updateAdminIntoDB,
    deleteAdminFromDB
}