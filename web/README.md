# Aesthetics Gallery

Next.js app that renders the `data/styles.yaml` source-of-truth as a category-tabbed image gallery.

## Develop

```bash
npm install
npm run dev    # http://localhost:3000
```

Source gallery PNGs live at `web/src-images/`. The image build step writes optimized WebP files to `web/public/generated/lg/` and `web/public/generated/sm/`, plus original PNG fallbacks to `web/public/generated/original/`. `npm run dev` and `npm run build` both run this step before starting Next.js.

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

No persistent volume is needed; source images are committed in `src-images/`, then generated into `public/generated/` during build and baked into the build artifact.

## Features

- Category tabs across the top — switch instantly, no page reload.
- Uniform aspect-square grid (4 cols desktop, 3 tablet, 2 mobile).
- Click any image → exact prompt copied to clipboard, toast confirms.
- "Show prompts" toggle (top-right) reveals a stable description + prompt panel under every card.
- Light / dark mode (system-default, with manual toggle persisted to localStorage by `next-themes`).
- Pending styles render as empty rounded frames — clicking them copies the reusable `{{SUBJECT}}` prompt.
