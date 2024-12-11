import QueryBuilder from '../../builder/QueryBuilder';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';

const getAllAdminsFromBd = async (query: Record<string, unknown>) => {
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

const getSingleAdminFromBD = async (id: string) => {
    const result = await Admin.findById(id);
    return result;
}
const updateAdminIntoBD = async (id: string, payload: Partial<TAdmin>) => {
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

export const adminServices = {
    getAllAdminsFromBd,
    getSingleAdminFromBD,
    updateAdminIntoBD
}