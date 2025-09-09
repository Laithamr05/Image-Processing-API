import { promises as fs } from 'fs';
import path from 'path';

export async function fileExists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

export async function ensureThumbDir(): Promise<void> {
  const dir = path.resolve('assets/thumb');
  if (!(await fileExists(dir))) {
    await fs.mkdir(dir, { recursive: true });
  }
}
