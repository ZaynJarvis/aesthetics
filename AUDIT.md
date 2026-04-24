# Coverage Audit

## Verdict

The first workbook version is strong as a starter atlas, but it does **not** yet cover "almost all" design styles. It has 180 prompts across nine families, which covers many common names, but several major design territories were underrepresented.

## What Was Already Strong

- Major historical movements: Art Nouveau, Art Deco, Bauhaus, Constructivism, Pop Art, Memphis.
- Common graphic styles: Swiss, Neo-Brutalism, Risograph, Punk DIY, Grunge, Propaganda.
- Common UI styles: Material, Glassmorphism, Neumorphism, Bento, Frutiger Aero, Y2K.
- Futurist/subculture anchors: Cyberpunk, Solarpunk, Steampunk, Vaporwave, Synthwave.
- Cultural/worldbuilding anchors: Viking, Gothic, Islamic Geometric, Wabi-Sabi, Dark Academia.
- Photo/cinema basics: Noir, VHS, Analog Horror, Golden Hour, Documentary Realism.
- Illustration/game basics: Pixel Art, Manga, Ligne Claire, Isometric, Woodcut, Claymation.

## Coverage Gaps

- **Architecture styles:** International Style, Prairie, Usonian, High-Tech, Deconstructivism, Parametricism, Metabolism, Googie, Craftsman, Victorian, Tudor, Tropical Modernism.
- **Interior styles:** Bohemian, Hollywood Regency, English Country, French Country, Modern Farmhouse, Grandmillennial, Shabby Chic, Maximalist Interior, Regencycore.
- **Product and packaging styles:** clinical packaging, mass-market FMCG, premium fragrance, kid product, toy blister pack, transparent gadget, lab label, cereal box, beauty shelf.
- **Typography styles:** blackletter, slab serif, Didone, typewriter, bubble letters, chrome type, hand-painted signwriting, graffiti tag, code mono.
- **More art movements:** Impressionism, Fauvism, Cubism, Futurism, Suprematism, Abstract Expressionism, Minimalist Art, Photorealism, Conceptual Art.
- **More digital/web aesthetics:** Corporate Memphis, Alegria, Aurora Gradient, Liquid Metal UI, Spatial Computing UI, Pixel UI, Editorial Web, Creator Economy Brand, AI-Surreal Campaign.
- **Photography and cinema:** German Expressionism, French New Wave, Italian Neorealism, Giallo, Technicolor, Grindhouse, New Hollywood, Product Lab, Flat Lay, Food Editorial.
- **Game and entertainment art:** PS1 low-poly, PS2-era realism, Cozy Game, Dark Fantasy RPG, JRPG menu, Tactical HUD, Tabletop Miniature, Card Game Illustration.
- **Lifestyle aesthetics:** Barbiecore, Mermaidcore, Fairycore, Kidcore, Royalcore, Coastal Grandmother, Mob Wife, Office Siren, Tomato Girl, Mermaid/pearlescent beauty.

## Demo Image Problem

The first ten images used one repeated "design studio vignette" subject. That is useful for comparison, but it is not always the best showcase. Art Deco wants a cinema lobby or perfume poster; Swiss wants a clean poster; Cyberpunk wants a rainy night street or dashboard; Vaporwave wants a surreal retro mall or desktop scene.

New rule for style-show images:

```text
Use the best native scene for the style, not one universal subject.
```

## Updated Direction

- Keep the original 180 prompt atlas.
- Add expanded prompts in `prompts/expanded-style-prompts.md`.
- Create a style-show production queue in `examples/style-show/style-show-index.md`.
- Regenerate or supersede the first ten demos with better, style-native scenes.

