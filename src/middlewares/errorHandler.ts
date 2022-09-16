import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

const errorsCode400 = [
  'Model is required',
  'Year is required',
  'Color is required',
  'Status is required',
  'buyValue is required',
  'doorsQty is required',
  'seatsQty is required',
  'seatsQty must be greater than or equal to 2',
  'doorsQty must be greater than or equal to 2',
];

export default function errorHandler(
  err: ZodError,
  _req: Request,
  res: Response,
  _next: NextFunction,
):Response | void {
  if (errorsCode400.find((er) => er === err.issues[0].message)) {
    res.status(400).send(err.issues[0].message);
  }
}
