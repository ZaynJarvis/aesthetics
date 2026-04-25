# Aesthetics Gallery

Next.js app that renders the `data/styles.yaml` source-of-truth as a category-tabbed image gallery.

## Develop

```bash
npm install
npm run dev    # http://localhost:3000
```

`predev` and `prebuild` copy images from `../examples/style-show/generated/` into `public/generated/`. Source images stay where they are.

## Build & start

```bash
npm run build
npm run start
```

## Deploy on Railway

The repo root has a `nixpacks.toml`. Pointing a Railway service at the repo will:

1. install `nodejs_20`
2. run `cd web && npm ci`
3. run `cd web && npm run build`
4. start with `cd web && npm run start`

No persistent volume is needed; images are baked into the static output during build.

## Features

- Category tabs across the top — switch instantly, no page reload.
- Uniform aspect-square grid (4 cols desktop, 3 tablet, 2 mobile).
- Click any image → exact prompt copied to clipboard, toast confirms.
- "Show prompts" toggle (top-right) reveals a stable description + prompt panel under every card.
- Light / dark mode (system-default, with manual toggle persisted to localStorage by `next-themes`).
- Pending styles render as empty rounded frames — clicking them copies the reusable `{{SUBJECT}}` prompt.
