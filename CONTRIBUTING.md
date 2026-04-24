# Contributing

Thanks for helping build a shared aesthetics vocabulary.

## Good Contributions

- Add missing style names.
- Improve a prompt so it produces more recognizable results.
- Add visual markers: palette, composition, typography, material, lighting, era, texture.
- Add a better native showcase scene for a style.
- Add generated images with their source prompts.
- Translate descriptions.
- Correct historical or cultural mistakes.

## Style Entry Format

Use this pattern:

```md
### style-slug
- **Name:** Human Style Name
- **Prompt:** Create `{{SUBJECT}}` in Human Style Name style: visual markers, palette, material, composition, lighting, era signal. Avoid wrong adjacent styles, logos, watermarks, and unreadable fake text.
- **Image demo:** <image_demo>
```

## Prompt Guidelines

- Use `{{SUBJECT}}` as the placeholder.
- Make prompts reusable across products, interiors, posters, UI screens, characters, and scenes.
- Prefer visual ingredients over famous-name mimicry.
- Avoid prompts that depend on living artists, active studios, copyrighted characters, or franchise worlds.
- Include negative directions when adjacent styles are easy to confuse.

## Demo Image Guidelines

Use the best native scene for the style. Do not force every style into the same subject.

Examples:

- Art Deco: cinema lobby, hotel bar, perfume campaign.
- Swiss International: museum poster or wayfinding system.
- Cyberpunk: rainy neon street, dense dashboard, worn high-tech product.
- Wabi-Sabi: tea room still life, weathered ceramic, quiet interior.
- Risograph: indie poster, zine cover, small-press print.

When adding generated images, also add the source prompt.

