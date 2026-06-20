import sharp from "sharp";
import {
  access,
  copyFile,
  cp,
  mkdir,
  readFile,
  readdir,
  writeFile,
} from "fs/promises";
import { createHash } from "crypto";
import { join, basename, extname } from "path";
import { fileURLToPath } from "url";

const SRC = fileURLToPath(new URL("../src-images", import.meta.url));
const LG = fileURLToPath(new URL("../public/generated/lg", import.meta.url));
const SM = fileURLToPath(new URL("../public/generated/sm", import.meta.url));
const ORIGINAL = fileURLToPath(new URL("../public/generated/original", import.meta.url));
const CACHE_DIR = process.env.AESTHETICS_IMAGE_CACHE_DIR;
const CACHE_VERSION = "webp-800-400-original-v1";

await mkdir(LG, { recursive: true });
await mkdir(SM, { recursive: true });
await mkdir(ORIGINAL, { recursive: true });

const files = (await readdir(SRC)).filter((f) => f.endsWith(".png")).sort();

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function sourceHash(files) {
  const hash = createHash("sha256");
  hash.update(CACHE_VERSION);

  for (const file of files) {
    hash.update(file);
    hash.update(await readFile(join(SRC, file)));
  }

  return hash.digest("hex");
}

function cachePaths(cacheDir) {
  return {
    manifest: join(cacheDir, "manifest.json"),
    lg: join(cacheDir, "lg"),
    sm: join(cacheDir, "sm"),
    original: join(cacheDir, "original"),
  };
}

async function hasCachedOutputs(paths, files) {
  for (const file of files) {
    const name = basename(file, extname(file));
    const ok =
      (await pathExists(join(paths.lg, `${name}.webp`))) &&
      (await pathExists(join(paths.sm, `${name}.webp`))) &&
      (await pathExists(join(paths.original, file)));

    if (!ok) return false;
  }

  return true;
}

async function restoreFromCache(files) {
  if (!CACHE_DIR) return false;

  const hash = await sourceHash(files);
  const paths = cachePaths(CACHE_DIR);

  try {
    const manifest = JSON.parse(await readFile(paths.manifest, "utf8"));
    const cacheMatches =
      manifest.version === CACHE_VERSION &&
      manifest.sourceHash === hash &&
      manifest.fileCount === files.length &&
      (await hasCachedOutputs(paths, files));

    if (!cacheMatches) return false;

    await Promise.all([
      cp(paths.lg, LG, { recursive: true, force: true }),
      cp(paths.sm, SM, { recursive: true, force: true }),
      cp(paths.original, ORIGINAL, { recursive: true, force: true }),
    ]);

    console.log(`Restored ${files.length} generated images from cache.`);
    return true;
  } catch {
    return false;
  }
}

async function writeCache(files) {
  if (!CACHE_DIR) return;

  const hash = await sourceHash(files);
  const paths = cachePaths(CACHE_DIR);

  await Promise.all([
    mkdir(paths.lg, { recursive: true }),
    mkdir(paths.sm, { recursive: true }),
    mkdir(paths.original, { recursive: true }),
  ]);

  await Promise.all([
    cp(LG, paths.lg, { recursive: true, force: true }),
    cp(SM, paths.sm, { recursive: true, force: true }),
    cp(ORIGINAL, paths.original, { recursive: true, force: true }),
  ]);

  await writeFile(
    paths.manifest,
    JSON.stringify(
      {
        version: CACHE_VERSION,
        sourceHash: hash,
        fileCount: files.length,
        updatedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  );

  console.log(`Updated generated image cache at ${CACHE_DIR}.`);
}

if (await restoreFromCache(files)) {
  process.exit(0);
}

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
      copyFile(src, join(ORIGINAL, file)),
    ]);

    process.stdout.write(`\r${++done}/${files.length}`);
  })
);

await writeCache(files);
console.log("\nDone.");
