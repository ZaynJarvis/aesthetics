# Contributing

Thanks for helping build a shared aesthetics vocabulary. This workbook has two layers — a **single-source-of-truth dataset** (`data/styles.yaml`), and a **gallery website** (`web/`) rendered from it. Most contributions touch the YAML only.

## Quick map

```
data/styles.yaml              # 337 styles — source of truth
examples/style-show/generated # generated PNGs (referenced from yaml)
web/                          # Next.js gallery rendered from styles.yaml
prompts/*.md                  # human-readable copies (regeneratable)
scripts/build_yaml.py         # bootstrap script (one-time; rerun safely)
```

## Adding or editing a single style

Edit `data/styles.yaml` directly — that file is the source of truth. Each entry looks like:

```yaml
- slug: "cyberpunk"
  name: "Cyberpunk"
  category_id: 04
  source_doc: main
  reusable_prompt: "Create `{{SUBJECT}}` in cyberpunk style: dense neon city atmosphere, ..."
  demo:
    production_index: 9
    batch: 01
    image: "09-cyberpunk-style-show.png"
    scene: "rainy neon street food stall"
    exact_prompt: |
      Create a square style-show image for Cyberpunk: rainy neon street food stall ...
```

Rules:
- `slug` is kebab-case and must be unique.
- `category_id` matches an entry in the `categories:` list at the top of the file.
- `reusable_prompt` MUST contain `{{SUBJECT}}` so it stays portable across subjects.
- `demo` is `null` until an image exists. Once you add a PNG, fill all four demo fields.
- Keep `image` as just the filename — the website resolves it under `examples/style-show/generated/`.

## Prompt guidelines

- Use `{{SUBJECT}}` as the substitution placeholder in `reusable_prompt`.
- Prefer visual ingredients (palette, material, composition, lighting, era) over famous-name mimicry.
- Avoid living artists, active studios, copyrighted characters, or specific franchise worlds.
- Include negative directions ("Avoid X, Y, Z") when adjacent styles are easy to confuse.
- For the `exact_prompt` on a demo, end with the literal sentence: `No logos, no watermark, no readable text.` — that constraint has been load-bearing for image quality.

## Generating a new batch of demo images

We generate **20 styles per batch** through Codex. Image generation MUST use **Codex's own native image-generation capability** directly — do not invoke any image-gen skill, helper agent, or external API (no `gpt-image-1`, no `gpt-image-2` API, no skill wrapper). Earlier batches that went through skill wrappers / `gpt-image-1` were visibly worse. **Output size: 1254x1254 (square).**

### Batch numbering

| Batch | Production indices |
|---|---|
| 01 | 1–20 |
| 02 | 21–40 |
| 03 | 41–60 |
| 04 | 61–80 |
| 05 | 81–100 (98–100 pending) |
| 06 | 101–120 |
| 07 | 121–140 |
| ... | ... |

So if the next un-filled style would be production index 121, you are doing Batch 07.

### Reproducible Codex prompt template

Copy this whole block into Codex, fill in the `<SLUG_LIST>` block with the 20 styles you want done next, and run it. It builds all images locally first to save tokens, then bulk-copies into the repo.

````text
Work in /Users/bytedance/Documents/Codex/2026-04-24/i-need-you-to-teach-me/design-style-workbook.

Generate the next batch of style-show images for the design-style-workbook repo.

Hard rules:
- Image generation MUST use Codex's own native image-generation capability directly. Do NOT invoke any image-generation "skill", helper agent, or external API (no gpt-image-1, no gpt-image-2 API call, no skill wrapper). Use the built-in capability only.
- Output size MUST be 1254x1254 (square).
- Generate all 20 images locally (in your scratch / tmp area) FIRST, then bulk-copy into examples/style-show/generated/ at the end of the run. Do not re-touch the repo per image.
- Final destination: examples/style-show/generated/<NN>-<slug>-style-show.png (1254x1254 square).
- Do not commit, push, tag, or open PRs.
- Do not edit data/styles.yaml, prompts/all-prompts.md, expanded-style-prompts.md, README.md, STYLE_INDEX.md, or any other shared file. Only write the 20 PNGs and one new examples/style-show/batch-dumps/<NN>-<NN>.md.
- Accept minor detail issues. Only regenerate if the style is visibly wrong, has obvious readable text, logos, or watermarks.
- Every prompt below ends with "No logos, no watermark, no readable text." Keep that constraint; do not let the model render text strings.

After all 20 PNGs are copied, create examples/style-show/batch-dumps/<NN-NN>.md with:
1. A markdown table of (#, Style, Best-fit demo scene, Image path)
2. The exact prompts used (verbatim)
3. all-prompts.md image_demo replacement lines so a maintainer can paste them in (or run scripts/build_yaml.py to refresh styles.yaml afterwards)

Items to generate:

<SLUG_LIST — replace with 20 entries in this exact shape>

NNN <slug>
Filename: NNN-<slug>-style-show.png
Prompt: Create a square style-show image for <Style Name>: <best-fit scene>, <visual markers>, <palette>, <materials/composition>. No logos, no watermark, no readable text.
````

After Codex finishes, the maintainer (you) does the wiring up:

```bash
python3 scripts/build_yaml.py   # picks up new images, refreshes data/styles.yaml
cd web && npm run build         # confirms gallery rebuilds cleanly
git checkout -b add-style-show-batch-NN
git add data/styles.yaml examples/style-show/generated/ examples/style-show/batch-dumps/ examples/style-show/style-show-index.md prompts/all-prompts.md
git commit && gh pr create
```

## Running the gallery locally

```bash
cd web
npm install
npm run dev      # → http://localhost:3000
```

The `prebuild` / `predev` hook copies images from `examples/style-show/generated/` into `web/public/generated/`. Source images are never modified.

## Deploying

Railway (or any Nixpacks-compatible host) reads `nixpacks.toml` at the repo root and builds `web/`. No persistent volume is needed — all images are baked into the build artifact.
