import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error | AppError | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errors: any = null;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    errors = err.issues.map((e: any) => ({
      path: e.path.join('.'),
      message: e.message,
    }));
  } else {
    // Log unexpected errors for monitoring
    console.error(`[UNEXPECTED ERROR]`, err);
    if (process.env.NODE_ENV === 'development') {
      message = err.message;
    }
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(errors && { errors }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
