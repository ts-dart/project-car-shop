import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

const errorsCode400 = [
  'Body is required',
  'Model is required',
  'Year is required',
  'Color is required',
  'Status is required',
  'buyValue is required',
  'doorsQty is required',
  'seatsQty is required',
  'seatsQty must be greater than or equal to 2',
  'doorsQty must be greater than or equal to 2',
  'Id must have 24 hexadecimal characters',
];

const errorsCode404 = [
  'Object not found',
];

export default function errorHandler(
  err: ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response | void {
  const erro = err.issues ? err.issues[0].message : err.message;

  if (errorsCode400.find((er) => er === erro)) {
    return res.status(400).send({ error: erro });
  }
  if (errorsCode404.find((er) => er === erro)) {
    return res.status(404).send({ error: erro });
  }
}
