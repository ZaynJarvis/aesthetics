# Continuation Prompt

Use this exact prompt if the workbook needs to be continued elsewhere:

```text
You are continuing a local design-style workbook.

Workspace:
/Users/bytedance/Documents/Codex/2026-04-24/i-need-you-to-teach-me/design-style-workbook

User goal:
Teach visual design styles from broad categories to fine-grained style lanes. The workbook should include style names, descriptions, reusable image-generation prompts, and <image_demo> gaps. Generate normal demo images under web/public/generated, and style-native showcase images under web/public/generated.

Rules:
- Preserve the folder structure.
- For every style, include: style name, parent family, visual markers, prompt using {{SUBJECT}}, and <image_demo>.
- Avoid prompts that depend on living artists or copyrighted franchises. Use descriptive ingredients instead.
- Keep prompts reusable for API use.
- If adding generated images, use numbered slug filenames and update examples/10-famous-style-examples.md or examples/style-show/style-show-index.md.
- Keep generated assets local to the workbook.

Next likely steps:
1. Inspect README.md, AUDIT.md, STYLE_INDEX.md, prompts/all-prompts.md, and prompts/expanded-style-prompts.md.
2. Fill any remaining <image_demo> slots.
3. Add more niche styles if needed.
4. Optionally convert the Markdown style list to JSONL or CSV for image API batch generation.
```
