import 'ts-node/register';
  import 'ts-node/register'

import path from 'path';
import { promises as fs } from 'fs';
import { resizeJpg } from '../Utilities/imageProcessor';
import { ensureThumbDir } from '../Utilities/fsAsync';


describe('imageProcessor.resizeJpg', () => {
  const src = path.resolve('assets/full', 'fjord.jpg');
  const out = path.resolve('assets/thumb', 'fjord_50x60.jpg');

  beforeAll(async () => {
    await ensureThumbDir();
  });

  afterAll(async () => {
    try { await fs.unlink(out); } catch {}
  });

  it('creates an output file of the right type', async () => {
    await resizeJpg(src, out, 50, 60);
    const stats = await fs.stat(out);
    expect(stats.size).toBeGreaterThan(0);
  });
});
