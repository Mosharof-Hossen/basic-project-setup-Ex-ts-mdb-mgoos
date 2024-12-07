import mongoose from 'mongoose';
import { TErrorSource, TReturnErrorResponse } from '../interface/error';

const handleValidationError = (err: mongoose.Error.ValidationError): TReturnErrorResponse => {

    const errorSources: TErrorSource = Object.values(err.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: val?.path,
            message: val?.message,
        }
    })
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorSources,
    };
};

export default handleValidationError;
