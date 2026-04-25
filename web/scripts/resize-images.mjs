import sharp from "sharp";
import { readdir, mkdir } from "fs/promises";
import { join, basename, extname } from "path";
import { fileURLToPath } from "url";

const SRC = fileURLToPath(new URL("../src-images", import.meta.url));
const LG = fileURLToPath(new URL("../public/generated/lg", import.meta.url));
const SM = fileURLToPath(new URL("../public/generated/sm", import.meta.url));

await mkdir(LG, { recursive: true });
await mkdir(SM, { recursive: true });

const files = (await readdir(SRC)).filter((f) => f.endsWith(".png"));
console.log(`Resizing ${files.length} images…`);

let done = 0;
await Promise.all(
  files.map(async (file) => {
    const src = join(SRC, file);
    const name = basename(file, extname(file));

    await Promise.all([
      sharp(src)
        .resize(800, 800, { fit: "cover" })
        .webp({ quality: 85 })
        .toFile(join(LG, `${name}.webp`)),
      sharp(src)
        .resize(400, 400, { fit: "cover" })
        .webp({ quality: 80 })
        .toFile(join(SM, `${name}.webp`)),
    ]);

    process.stdout.write(`\r${++done}/${files.length}`);
  })
);

console.log("\nDone.");
