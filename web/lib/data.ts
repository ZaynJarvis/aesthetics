import { promises as fs } from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import type { Category, GalleryData, Style } from "./types";

type RawCategory = { id: string | number; title: string };
type RawStyle = {
  slug: string;
  name: string;
  category_id: string | number;
  source_doc: "main" | "expanded";
  reusable_prompt: string;
  demo: Style["demo"];
};

let cache: GalleryData | null = null;

async function resolveStylesYamlPath(): Promise<string> {
  let currentDir = process.cwd();

  while (true) {
    const candidate = path.join(currentDir, "data", "styles.yaml");

    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      const parentDir = path.dirname(currentDir);
      if (parentDir === currentDir) {
        throw new Error(
          `Could not locate data/styles.yaml from working directory ${process.cwd()}`,
        );
      }
      currentDir = parentDir;
    }
  }
}

export async function loadGallery(): Promise<GalleryData> {
  if (cache) return cache;
  const yamlPath = await resolveStylesYamlPath();
  const text = await fs.readFile(yamlPath, "utf-8");
  const raw = parse(text) as { categories: RawCategory[]; styles: RawStyle[] };

  const categories: Category[] = raw.categories
    .map((c) => ({ id: Number(c.id), title: c.title, styles: [] as Style[] }))
    .sort((a, b) => a.id - b.id);
  const byId = new Map(categories.map((c) => [c.id, c]));

  for (const s of raw.styles) {
    const cat = byId.get(Number(s.category_id));
    if (!cat) continue;
    cat.styles.push({
      slug: s.slug,
      name: s.name,
      category_id: Number(s.category_id),
      source_doc: s.source_doc,
      reusable_prompt: s.reusable_prompt,
      demo: s.demo ?? null,
    });
  }

  for (const c of categories) {
    c.styles.sort((a, b) => {
      const ai = a.demo?.production_index ?? Number.POSITIVE_INFINITY;
      const bi = b.demo?.production_index ?? Number.POSITIVE_INFINITY;
      if (ai !== bi) return ai - bi;
      return a.name.localeCompare(b.name);
    });
  }

  const total = raw.styles.length;
  const withDemo = raw.styles.filter((s) => s.demo).length;
  cache = { categories, total, withDemo };
  return cache;
}
