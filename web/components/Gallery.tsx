"use client";

import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import type { GalleryData } from "@/lib/types";
import { StyleCard } from "./StyleCard";
import { ThemeToggle } from "./ThemeToggle";
import { ToastHost } from "./Toast";

// Mulberry32 seeded PRNG
function mulberry32(seed: number) {
  return function () {
    let t = (seed = (seed + 0x6d2b79f5) | 0);
    t = Math.imul(t ^ (t >>> 15), 1 | t);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const rng = mulberry32(seed);
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function Gallery({ data }: { data: GalleryData }) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(
    () => new Set(data.categories.map((c) => c.id)),
  );
  const [showPrompts, setShowPrompts] = useState(false);
  const [randomized, setRandomized] = useState(false);
  const [randomSeed, setRandomSeed] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const handleRandomize = useCallback(() => {
    const next = !randomized;
    setRandomized(next);
    if (next) setRandomSeed(Date.now());
  }, [randomized]);

  const toggleCategory = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size === 1) return next;
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    setSelectedIds((prev) => {
      if (prev.size === data.categories.length)
        return new Set([data.categories[0]?.id ?? 1]);
      return new Set(data.categories.map((c) => c.id));
    });
  };

  // Selected chips first, then rest in original order
  const sortedChips = useMemo(() => {
    const selected = data.categories.filter((c) => selectedIds.has(c.id));
    const rest = data.categories.filter((c) => !selectedIds.has(c.id));
    return [...selected, ...rest];
  }, [data.categories, selectedIds]);

  // Selected categories in original order, demo-first within each
  const selectedCategories = useMemo(() => {
    return data.categories
      .filter((c) => selectedIds.has(c.id))
      .map((c) => ({
        ...c,
        styles: [...c.styles].sort((a, b) => {
          if (a.demo && !b.demo) return -1;
          if (!a.demo && b.demo) return 1;
          return 0;
        }),
      }));
  }, [data.categories, selectedIds]);

  // Flat shuffled list for randomize mode
  const randomizedStyles = useMemo(() => {
    if (!randomized) return null;
    const all = selectedCategories.flatMap((c) => c.styles);
    return seededShuffle(all, randomSeed);
  }, [randomized, randomSeed, selectedCategories]);

  return (
    <div className="min-h-screen">
      <header className="safe-top sticky top-0 z-30 border-b border-[var(--card-border)] bg-[var(--page-bg)]/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-baseline gap-3">
            <span className="text-base font-semibold tracking-tight">Aesthetics</span>
            <span className="text-xs text-[var(--muted)]">
              {data.withDemo}/{data.total}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRandomize}
              aria-pressed={randomized}
              className={`h-8 rounded-full px-3 text-xs font-medium transition ${
                randomized
                  ? "bg-[var(--page-fg)] text-[var(--page-bg)]"
                  : "bg-[var(--page-fg)]/[0.05] text-[var(--page-fg)] hover:bg-[var(--page-fg)]/[0.1]"
              }`}
            >
              Randomize
            </button>
            <button
              type="button"
              onClick={() => setShowPrompts((v) => !v)}
              aria-pressed={showPrompts}
              className={`h-8 rounded-full px-3 text-xs font-medium transition ${
                showPrompts
                  ? "bg-[var(--page-fg)] text-[var(--page-bg)]"
                  : "bg-[var(--page-fg)]/[0.05] text-[var(--page-fg)] hover:bg-[var(--page-fg)]/[0.1]"
              }`}
            >
              {showPrompts ? "Hide" : "Prompts"}
            </button>
            <ThemeToggle />
          </div>
        </div>

        <nav className="mx-auto max-w-7xl px-2 sm:px-4">
          <div className="flex items-center gap-1 pb-2 pt-2.5 sm:pt-1.5 lg:pb-4">
            {/* Hamburger — all categories dropdown */}
            <div ref={menuRef} className="relative shrink-0">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="All categories"
                aria-expanded={menuOpen}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                  menuOpen
                    ? "bg-[var(--page-fg)]/10 text-[var(--page-fg)]"
                    : "bg-[var(--page-fg)]/[0.05] text-[var(--page-fg)] hover:bg-[var(--page-fg)]/[0.1]"
                }`}
              >
                <svg width="13" height="11" viewBox="0 0 13 11" fill="currentColor">
                  <rect width="13" height="1.5" rx="0.75" />
                  <rect y="4.75" width="13" height="1.5" rx="0.75" />
                  <rect y="9.5" width="13" height="1.5" rx="0.75" />
                </svg>
              </button>

              {menuOpen && (
                <div className="absolute left-0 top-10 z-50 max-h-80 w-64 overflow-y-auto rounded-xl border border-[var(--card-border)] bg-[var(--page-bg)] py-1 shadow-lg">
                  <button
                    type="button"
                    onClick={toggleAll}
                    className="flex w-full items-center justify-between gap-2 border-b border-[var(--card-border)] px-4 py-2 text-left text-xs font-semibold text-[var(--page-fg)] transition hover:bg-[var(--card-bg)]"
                  >
                    {selectedIds.size === data.categories.length ? "Deselect all" : "Select all"}
                  </button>
                  {data.categories.map((c) => {
                    const isSelected = selectedIds.has(c.id);
                    const filled = c.styles.filter((s) => s.demo).length;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => toggleCategory(c.id)}
                        className={`flex w-full items-center justify-between gap-2 px-4 py-2 text-left text-xs transition hover:bg-[var(--card-bg)] ${
                          isSelected
                            ? "font-semibold text-[var(--page-fg)]"
                            : "text-[var(--muted)]"
                        }`}
                      >
                        <span className="flex min-w-0 items-baseline gap-1.5">
                          <span className="shrink-0 tabular-nums opacity-50">
                            {String(c.id).padStart(2, "0")}
                          </span>
                          <span className="truncate">{c.title}</span>
                        </span>
                        <span className="shrink-0 tabular-nums opacity-40">
                          {filled}/{c.styles.length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Scrollable category chips — selected first */}
            <div
              className="scrollbar-none flex gap-1 overflow-x-auto"
              style={{ maskImage: "linear-gradient(to right, transparent 0px, black 20px, black calc(100% - 24px), transparent 100%)" }}
            >
              {sortedChips.map((c) => {
                const isSelected = selectedIds.has(c.id);
                const filled = c.styles.filter((s) => s.demo).length;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleCategory(c.id)}
                    className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      isSelected
                        ? "bg-[var(--page-fg)]/10 text-[var(--page-fg)]"
                        : "bg-[var(--card-bg)] text-[var(--muted)] hover:text-[var(--page-fg)]"
                    }`}
                  >
                    <span className="mr-1.5 tabular-nums opacity-70">
                      {String(c.id).padStart(2, "0")}
                    </span>
                    {c.title}
                    <span className="ml-1.5 text-[10px] opacity-60">
                      {filled}/{c.styles.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {randomizedStyles ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {randomizedStyles.map((s, i) => (
              <StyleCard key={`${s.slug}-${i}`} style={s} showPrompts={showPrompts} index={i} />
            ))}
          </div>
        ) : (
          selectedCategories.map((cat, catIdx) => {
            const offset = selectedCategories
              .slice(0, catIdx)
              .reduce((sum, c) => sum + c.styles.length, 0);
            return (
              <section key={cat.id} className="mb-10 last:mb-0">
                <div className="mb-5 flex items-end justify-between">
                  <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
                    {cat.title}
                  </h1>
                  <span className="text-xs text-[var(--muted)]">{cat.styles.length} styles</span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                  {cat.styles.map((s, i) => (
                    <StyleCard
                      key={s.slug}
                      style={s}
                      showPrompts={showPrompts}
                      index={offset + i}
                    />
                  ))}
                </div>
              </section>
            );
          })
        )}
      </main>

      <footer className="border-t border-[var(--card-border)] py-6">
        <div className="mx-auto max-w-7xl px-4 text-xs text-[var(--muted)] sm:px-6">
          Click any image to copy its prompt. Empty cards mean a demo hasn&apos;t been
          generated yet — clicking still copies the reusable prompt template.
        </div>
      </footer>

      <ToastHost />
    </div>
  );
}
