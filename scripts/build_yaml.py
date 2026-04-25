#!/usr/bin/env python3
"""Build data/styles.yaml from existing markdown sources.

Treats data/styles.yaml as the eventual single source of truth; this script
just bootstraps it from the current MD files. After this runs, future edits
should happen in styles.yaml directly.
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data" / "styles.yaml"
ALL_PROMPTS = ROOT / "prompts" / "all-prompts.md"
EXPANDED = ROOT / "prompts" / "expanded-style-prompts.md"
SHOW_INDEX = ROOT / "examples" / "style-show" / "style-show-index.md"
SHOW_PROMPTS = ROOT / "examples" / "style-show" / "style-show-prompts.md"
BATCH_DUMPS = ROOT / "examples" / "style-show" / "batch-dumps"


def parse_prompt_file(path: Path, source_doc: str) -> list[dict]:
    text = path.read_text()
    section_re = re.compile(r"^## (\d+)\s+(.+)$", re.MULTILINE)
    style_re = re.compile(
        r"^### (?P<slug>[^\n]+)\n"
        r"- \*\*Name:\*\* (?P<name>[^\n]+)\n"
        r"- \*\*Prompt:\*\* (?P<prompt>[^\n]+)\n"
        r"- \*\*Image demo:\*\* (?P<demo>[^\n]+)$",
        re.MULTILINE,
    )
    sections = [(m.start(), int(m.group(1)), m.group(2).strip()) for m in section_re.finditer(text)]

    def category_for(pos: int) -> tuple[int, str]:
        active = sections[0]
        for s in sections:
            if s[0] <= pos:
                active = s
            else:
                break
        return active[1], active[2]

    styles = []
    for m in style_re.finditer(text):
        cat_id, cat_name = category_for(m.start())
        demo_raw = m.group("demo").strip()
        image_filename = None
        if demo_raw and demo_raw != "<image_demo>":
            image_filename = demo_raw.split("/")[-1]
        styles.append({
            "slug": m.group("slug").strip(),
            "name": m.group("name").strip(),
            "category_id": cat_id,
            "category": f"{cat_id:02d} {cat_name}",
            "source_doc": source_doc,
            "reusable_prompt": m.group("prompt").strip(),
            "image_filename": image_filename,
        })
    return styles


def parse_show_index_scenes(path: Path) -> dict[int, str]:
    """Map production_index -> scene description from style-show-index.md tables."""
    text = path.read_text()
    row_re = re.compile(r"^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*$", re.MULTILINE)
    scenes = {}
    for m in row_re.finditer(text):
        try:
            idx = int(m.group(1))
        except ValueError:
            continue
        scene = m.group(3).strip()
        if scene.startswith("_") and scene.endswith("_"):
            scene = ""
        scenes[idx] = scene
    return scenes


def parse_exact_prompts() -> dict[int, str]:
    """Map production_index -> exact source prompt used to generate the image."""
    out: dict[int, str] = {}

    text = SHOW_PROMPTS.read_text()
    item_re = re.compile(
        r"^(?P<idx>\d+)\.\s+\*\*[^*]+\*\*\s*\n\n```text\n(?P<prompt>.+?)\n```",
        re.MULTILINE | re.DOTALL,
    )
    for m in item_re.finditer(text):
        out[int(m.group("idx"))] = m.group("prompt").strip()

    for dump in sorted(BATCH_DUMPS.glob("*.md")):
        text = dump.read_text()
        for m in item_re.finditer(text):
            idx = int(m.group("idx"))
            if idx not in out:
                out[idx] = m.group("prompt").strip()
    return out


def yaml_str(s: str) -> str:
    """Always emit as a double-quoted YAML scalar — safer than guessing."""
    if s == "":
        return '""'
    escaped = s.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def emit_yaml(styles: list[dict]) -> str:
    lines = [
        "# data/styles.yaml — single source of truth for the design-style-workbook gallery.",
        "# Generated initially by scripts/build_yaml.py from the existing markdown sources.",
        "# After this bootstrap, edit this file directly; markdown can be regenerated separately.",
        "",
        "categories:",
    ]
    seen = {}
    for s in styles:
        if s["category_id"] not in seen:
            seen[s["category_id"]] = s["category"]
    for cat_id in sorted(seen.keys()):
        lines.append(f"  - id: {cat_id:02d}")
        lines.append(f"    title: {yaml_str(seen[cat_id].split(' ', 1)[1])}")

    lines.append("")
    lines.append("styles:")
    for s in styles:
        lines.append(f"  - slug: {yaml_str(s['slug'])}")
        lines.append(f"    name: {yaml_str(s['name'])}")
        lines.append(f"    category_id: {s['category_id']:02d}")
        lines.append(f"    source_doc: {s['source_doc']}")
        lines.append(f"    reusable_prompt: {yaml_str(s['reusable_prompt'])}")
        demo = s.get("demo")
        if demo:
            lines.append("    demo:")
            lines.append(f"      production_index: {demo['production_index']}")
            lines.append(f"      batch: {demo['batch']:02d}")
            lines.append(f"      image: {yaml_str(demo['image'])}")
            lines.append(f"      scene: {yaml_str(demo.get('scene', ''))}")
            exact = demo.get("exact_prompt", "")
            if exact:
                lines.append("      exact_prompt: |")
                for ln in exact.splitlines():
                    lines.append(f"        {ln}")
            else:
                lines.append('      exact_prompt: ""')
        else:
            lines.append("    demo: null")
    return "\n".join(lines) + "\n"


def main() -> None:
    main_styles = parse_prompt_file(ALL_PROMPTS, "main")
    expanded_styles = parse_prompt_file(EXPANDED, "expanded")
    styles = main_styles + expanded_styles

    scenes = parse_show_index_scenes(SHOW_INDEX)
    exact_prompts = parse_exact_prompts()

    completed = 0
    for s in styles:
        if not s["image_filename"]:
            s["demo"] = None
            continue
        m = re.match(r"^(\d+)-", s["image_filename"])
        if not m:
            s["demo"] = None
            continue
        idx = int(m.group(1))
        batch = (idx - 1) // 20 + 1
        s["demo"] = {
            "production_index": idx,
            "batch": batch,
            "image": s["image_filename"],
            "scene": scenes.get(idx, ""),
            "exact_prompt": exact_prompts.get(idx, ""),
        }
        completed += 1

    DATA.parent.mkdir(parents=True, exist_ok=True)
    DATA.write_text(emit_yaml(styles))
    total = len(styles)
    print(f"Wrote {DATA.relative_to(ROOT)}: {total} styles, {completed} with demos.")


if __name__ == "__main__":
    main()
