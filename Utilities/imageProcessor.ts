import sharp from 'sharp';

export async function resizeJpg(
  srcPath: string,
  outPath: string,
  width: number,
  height: number
): Promise<void> {
  await sharp(srcPath).resize(width, height).jpeg({ quality: 85 }).toFile(outPath);
}
