// Copy generated style-show PNGs into web/public/generated so Next.js can serve them.
// Source images live at ../examples/style-show/generated and are never modified.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, "../../examples/style-show/generated");
const DST = path.resolve(__dirname, "../public/generated");

async function copyDir(src, dst) {
  await fs.mkdir(dst, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  let copied = 0;
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!entry.name.endsWith(".png")) continue;
    const from = path.join(src, entry.name);
    const to = path.join(dst, entry.name);
    try {
      const [srcStat, dstStat] = await Promise.all([fs.stat(from), fs.stat(to).catch(() => null)]);
      if (dstStat && dstStat.mtimeMs >= srcStat.mtimeMs && dstStat.size === srcStat.size) continue;
    } catch {}
    await fs.copyFile(from, to);
    copied++;
  }
  return { total: entries.length, copied };
}

const { total, copied } = await copyDir(SRC, DST);
console.log(`copy-images: ${copied} updated / ${total} entries scanned`);
