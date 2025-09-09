import { Router, Request, Response } from 'express';
import path from 'path';
import { ensureThumbDir, fileExists } from '../Utilities/fsAsync';
import { resizeJpg } from '../Utilities/imageProcessor';
import validateParams from './validateParams';


const router = Router();


router.get('/', validateParams, async (req: Request, res: Response) => {
  const filename = String(req.query.filename);
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  const srcPath = path.resolve('assets/full', `${filename}.jpg`);
  const outName = `${filename}_${width}x${height}.jpg`;
  const outPath = path.resolve('assets/thumb', outName);

  try {
    if (!(await fileExists(srcPath))) {
      return res.status(404).json({
        error: `Source image not found: ${filename}.jpg (place it in assets/full)`
      });
    }

    await ensureThumbDir();

    if (await fileExists(outPath)) {
      return res.sendFile(outPath);
    }

    await resizeJpg(srcPath, outPath, width, height);

    return res.sendFile(outPath);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to process image.' });
  }
});

export default router;
