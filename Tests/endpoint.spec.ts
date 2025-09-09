import 'ts-node/register';

import supertest from 'supertest';
import path from 'path';
import { promises as fs } from 'fs';
import app from '../Server/server';
import { ensureThumbDir } from '../Utilities/fsAsync';

const request = supertest(app);

describe('GET /api/images', () => {
  const outFile = path.resolve('assets/thumb', 'fjord_200x200.jpg');

  beforeAll(async () => {
    await ensureThumbDir();
  });

  afterAll(async () => {
    try { await fs.unlink(outFile); } catch {}
  });

  it('returns 400 on missing params', async () => {
    const res = await request.get('/api/images');
    expect(res.status).toBe(400);
  });

  it('returns 404 on missing source file', async () => {
    const res = await request.get('/api/images?filename=does_not_exist&width=200&height=200');
    expect(res.status).toBe(404);
  });

  it('creates and returns a resized image', async () => {
    const res = await request.get('/api/images?filename=fjord&width=200&height=200');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('image/jpeg');
  });

  it('serves from cache on repeat calls', async () => {
    const first = await request.get('/api/images?filename=fjord&width=200&height=200');
    expect(first.status).toBe(200);
    const second = await request.get('/api/images?filename=fjord&width=200&height=200');
    expect(second.status).toBe(200);
  });
});
