import { Request, Response, NextFunction } from 'express';

const MAX_DIM = 4000;

export default function validateParams(req: Request, res: Response, next: NextFunction) {
  const { filename, width, height } = req.query;

  if (!filename || typeof filename !== 'string' || filename.trim() === '') {
    return res.status(400).json({ error: 'Query param "filename" (string) is required.' });
  }

  const w = Number(width);
  const h = Number(height);

  if (!Number.isFinite(w) || !Number.isInteger(w) || w <= 0) {
    return res.status(400).json({ error: '"width" must be a positive integer.' });
  }
  if (!Number.isFinite(h) || !Number.isInteger(h) || h <= 0) {
    return res.status(400).json({ error: '"height" must be a positive integer.' });
  }
  if (w > MAX_DIM || h > MAX_DIM) {
    return res.status(400).json({ error: `Max allowed dimension is ${MAX_DIM}px.` });
  }

  next();
}
