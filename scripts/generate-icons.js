import sharp from 'sharp';
import { mkdir, readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const iconsDir = join(publicDir, 'icons');
const svgPath = join(publicDir, 'icon.svg');

await mkdir(iconsDir, { recursive: true });

// Use full-bleed square corners for PNGs so iOS apple-touch-icon and Android maskable icons have no transparent corner artifacts
const rawSvg = await readFile(svgPath, 'utf-8');
const fullBleedSvg = Buffer.from(rawSvg.replace(/rx="[^"]*"/g, 'rx="0"'));

await sharp(fullBleedSvg)
  .resize(192, 192)
  .png()
  .toFile(join(iconsDir, 'icon-192.png'));

await sharp(fullBleedSvg)
  .resize(512, 512)
  .png()
  .toFile(join(iconsDir, 'icon-512.png'));

console.log('Generated icon-192.png and icon-512.png');
