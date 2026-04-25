# Aesthetics Gallery

Next.js app that renders the `data/styles.yaml` source-of-truth as a category-tabbed image gallery.

## Develop

```bash
npm install
npm run dev    # http://localhost:3000
```

All gallery PNGs live at `web/public/generated/` and are served directly by Next.js at `/generated/<file>.png`. There is no build-time copy step — Codex writes new batch images straight into this directory.

## Build & start

```bash
npm run build
npm run start
```

## Deploy on Railway

Set the service root directory to `web` and Railpack will auto-detect Next.js:

1. install Node 20+
2. run `npm ci`
3. run `npm run build`
4. start with `npm run start`

No persistent volume is needed; images are committed in `public/generated/` and baked into the build artifact.

## Features

- Category tabs across the top — switch instantly, no page reload.
- Uniform aspect-square grid (4 cols desktop, 3 tablet, 2 mobile).
- Click any image → exact prompt copied to clipboard, toast confirms.
- "Show prompts" toggle (top-right) reveals a stable description + prompt panel under every card.
- Light / dark mode (system-default, with manual toggle persisted to localStorage by `next-themes`).
- Pending styles render as empty rounded frames — clicking them copies the reusable `{{SUBJECT}}` prompt.
