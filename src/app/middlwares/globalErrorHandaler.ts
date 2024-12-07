/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    errorSources = simplifiedError?.errorSources;
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSources,
    stack: config.node_env === 'development' ? err?.stack : null,
    err,
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
