import QueryBuilder from '../../builder/QueryBuilder';
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


export const  adminServices = {
    getAllAdminsFromBd
}