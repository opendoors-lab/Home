import sharp from "sharp";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, "../src/assets");

const images = [
  { name: "hero.jpg", width: 1200, height: 1500, r: 242, g: 115, b: 20 },
  { name: "commute.jpg", width: 1200, height: 800, r: 18, g: 44, b: 107 },
  { name: "driver.jpg", width: 1000, height: 800, r: 30, g: 61, b: 143 },
  { name: "rider.jpg", width: 1000, height: 800, r: 237, g: 243, b: 211 },
  { name: "city.jpg", width: 1920, height: 1080, r: 18, g: 44, b: 107 },
];

await mkdir(assetsDir, { recursive: true });

for (const img of images) {
  const svg = `
    <svg width="${img.width}" height="${img.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(${img.r},${img.g},${img.b});stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(${Math.min(img.r + 40, 255)},${Math.min(img.g + 30, 255)},${Math.min(img.b + 50, 255)});stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="rgba(255,255,255,0.35)" font-family="Georgia, serif" font-size="48">MobiMates</text>
    </svg>`;

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 80 })
    .toFile(path.join(assetsDir, img.name));

  console.log("Created", img.name);
}

const grainPath = path.join(__dirname, "../public/grain.png");
const noise = Buffer.alloc(220 * 220 * 4);
for (let i = 0; i < noise.length; i += 4) {
  const v = Math.floor(Math.random() * 40) + 200;
  noise[i] = v;
  noise[i + 1] = v;
  noise[i + 2] = v;
  noise[i + 3] = 18;
}
await sharp(noise, { raw: { width: 220, height: 220, channels: 4 } })
  .png()
  .toFile(grainPath);
console.log("Created grain.png");
