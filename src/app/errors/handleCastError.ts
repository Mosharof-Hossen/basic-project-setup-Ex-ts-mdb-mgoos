import mongoose from 'mongoose';
import { TErrorSource, TReturnErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TReturnErrorResponse => {
  const errorSources: TErrorSource = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid Id',
    errorSources,
  };
};

export default handleCastError;
