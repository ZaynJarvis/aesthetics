# Aesthetics

Visual taste is easier to build after you can actually see the categories of beauty.

As an engineer, my starting point is simple: I can reason about systems, code, and product behavior, but aesthetic judgment needs a vocabulary. Before I can say "make this more elegant", "more editorial", "less SaaS", "more cyberpunk", or "more restrained", I need to know what those visual worlds are called and what makes them recognizable.

This repo is a public workbook for that: a growing atlas of design styles, visual aesthetics, and image-generation prompts.

[中文 README](README.zh-CN.md)

## What This Is

This is a practical reference for learning visual styles from broad categories to fine-grained lanes.

It currently includes:

- **337 reusable image-generation prompts** across historical art, graphic design, UI, architecture, interior, product, cinema, games, fashion, materials, and internet aesthetics.
- **40 generated style-show images** that use scenes chosen for each style instead of forcing every style into the same subject.
- A style index, learning path, coverage audit, prompt guide, and source prompts for regenerating demo images.

The goal is not to declare a final canon. The goal is to give builders, designers, artists, educators, and curious people a shared vocabulary for saying what kind of beauty they mean.

## Why It Exists

People often ask for "better design" without enough language to describe what better means. That is especially common for engineers and product builders. We may know something feels off, but not whether we want:

- Swiss International clarity
- Art Deco glamour
- Neo-Brutalist bluntness
- Wabi-Sabi quietness
- Frutiger Aero optimism
- Cyberpunk density
- Minimalist reduction
- Risograph print texture
- Parametric architectural flow
- Cozy game warmth

This workbook turns those names into concrete visual markers and reusable prompts.

## Start Here

- **Gallery website:** `cd web && npm install && npm run dev` → category-tabbed image grid with click-to-copy prompts and light/dark mode. See [web/README.md](web/README.md).
- **Source of truth:** [data/styles.yaml](data/styles.yaml) — 337 styles, 117 with demo images.
- [STYLE_INDEX.md](STYLE_INDEX.md): broad-to-fine list of style names.
- [CONTRIBUTING.md](CONTRIBUTING.md): how to add a style, how to run a 20-style image generation batch with `gpt-image-2` via Codex.
- [LEARNING_PATH.md](LEARNING_PATH.md): how to train your eye by comparing styles.
- [AUDIT.md](AUDIT.md): what is covered, what was missing, and why more expansion is needed.
- [prompts/all-prompts.md](prompts/all-prompts.md): 180 reusable prompts (mirror of yaml).
- [prompts/expanded-style-prompts.md](prompts/expanded-style-prompts.md): 157 more prompts for narrower lanes.
- [examples/style-show/style-show-index.md](examples/style-show/style-show-index.md): production-order timeline of generated batches.

## Folder Structure

```text
.
├── README.md
├── README.zh-CN.md
├── AUDIT.md
├── CONTRIBUTING.md
├── CONTINUATION_PROMPT.md
├── LEARNING_PATH.md
├── STYLE_INDEX.md
├── categories/
├── data/
├── examples/
│   ├── generated/
│   ├── source-prompts/
│   └── style-show/
│       ├── generated/
│       ├── style-show-index.md
│       └── style-show-prompts.md
├── prompts/
│   ├── all-prompts.md
│   ├── expanded-style-prompts.md
│   └── prompting-guide.md
└── templates/
```

## How To Use A Prompt

Pick a style, copy its prompt, and replace `{{SUBJECT}}`.

Example:

```text
Create {{SUBJECT}} in Cyberpunk style: dense neon city atmosphere, wet reflective surfaces, magenta-cyan contrast, layered screens, worn high-tech materials, surveillance signage, deep night shadows. Avoid clean corporate minimalism and pastel softness.
```

Replace the placeholder:

```text
Create a coffee shop loyalty app home screen in Cyberpunk style: dense neon city atmosphere, wet reflective surfaces, magenta-cyan contrast, layered screens, worn high-tech materials, surveillance signage, deep night shadows. Avoid clean corporate minimalism and pastel softness.
```

## Contributing

This repo welcomes contributors from every profession and interest group:

- designers and art directors
- engineers and product builders
- illustrators, photographers, filmmakers, and game artists
- architects, interior designers, fashion people, and brand strategists
- educators, students, researchers, and hobbyists
- anyone who wants better language for visual taste

Useful contributions include:

- adding missing style names
- improving prompts
- adding better demo scenes
- correcting visual markers
- translating style descriptions
- grouping styles into better learning paths
- adding generated examples with source prompts

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Notes

The generated images are teaching examples, not final authority. Some styles overlap, some names are internet-native, and some categories describe movements while others describe materials, media, eras, or moods. That messiness is part of visual culture.

When adding prompts, avoid living-artist mimicry and copyrighted franchises. Prefer visual ingredients: palette, composition, material, era, typography, surface, lighting, and exclusions.

