import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(__dirname, 'public', 'logo.png');
const output = path.join(__dirname, 'public', 'logo.webp');

async function convert() {
  try {
    await sharp(input)
      .resize(200) // Resize to a reasonable logo width
      .webp({ quality: 80 }) // Convert to WebP with high compression
      .toFile(output);
    console.log('Success: Logo converted to WebP');
  } catch (err) {
    console.error('Error:', err);
  }
}

convert();
