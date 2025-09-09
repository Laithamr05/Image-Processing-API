import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import path from 'path';
import imagesRouter from '../Route + Validation/route';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/thumb', express.static(path.resolve('assets/thumb')));

app.use('/api/images', imagesRouter);

app.get('/health', (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Unexpected server error.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app; 
