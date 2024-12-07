/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something went wrong';

  let errorSources: TErrorSource = [{
    path: "",
    message: 'Something went wrong'
  }]




  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    errorSources = simplifiedError?.errorSources;
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    errorSources = simplifiedError?.errorSources;
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    errorSources = simplifiedError?.errorSources;
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
  } else if (err?.errorResponse?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    errorSources = simplifiedError?.errorSources;
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
  } else if (err instanceof AppError) {
    errorSources = [{
      path: "",
      message: err?.message
    }];
    message = err?.message;
    statusCode = err?.statusCode;
  } else if (err instanceof Error) {
    errorSources = [{
      path: "",
      message: err?.message
    }];
    message = err?.message;
  }




  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSources,
    stack: config.node_env === "development" ? err?.stack : null,
    // err
  });
};

export default globalErrorHandler;

/**
 *
success
message
errorSource: [
  path:"",
  message: ""
]
stack
 */
