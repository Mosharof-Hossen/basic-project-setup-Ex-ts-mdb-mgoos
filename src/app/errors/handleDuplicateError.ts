import { TErrorSource, TReturnErrorResponse } from '../interface/error';

const handleDuplicateError = (err): TReturnErrorResponse => {
  const errorSources: TErrorSource = [
    {
      path: '',
      message: err?.errorResponse?.errmsg,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicate Error',
    errorSources,
  };
};

export default handleDuplicateError;
