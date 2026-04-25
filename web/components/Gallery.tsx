"use client";

import { useMemo, useState } from "react";
import type { GalleryData } from "@/lib/types";
import { StyleCard } from "./StyleCard";
import { ThemeToggle } from "./ThemeToggle";
import { ToastHost } from "./Toast";

export function Gallery({ data }: { data: GalleryData }) {
  const [activeId, setActiveId] = useState<number>(data.categories[0]?.id ?? 1);
  const [showPrompts, setShowPrompts] = useState(false);

  const active = useMemo(
    () => data.categories.find((c) => c.id === activeId) ?? data.categories[0],
    [activeId, data.categories],
  );

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-[var(--card-border)] bg-[var(--page-bg)]/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-baseline gap-3">
            <span className="text-base font-semibold tracking-tight">Aesthetics</span>
            <span className="text-xs text-[var(--muted)]">
              {data.withDemo}/{data.total} styles visualized
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPrompts((v) => !v)}
              aria-pressed={showPrompts}
              className={`h-8 rounded-full border px-3 text-xs font-medium transition ${
                showPrompts
                  ? "border-[var(--page-fg)] bg-[var(--page-fg)] text-[var(--page-bg)]"
                  : "border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--page-fg)] hover:opacity-80"
              }`}
            >
              {showPrompts ? "Hide prompts" : "Show prompts"}
            </button>
            <ThemeToggle />
          </div>
        </div>
        <nav className="mx-auto max-w-7xl px-2 sm:px-4">
          <div className="scrollbar-none flex gap-1 overflow-x-auto pb-2 pt-1">
            {data.categories.map((c) => {
              const isActive = c.id === activeId;
              const filled = c.styles.filter((s) => s.demo).length;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveId(c.id)}
                  className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    isActive
                      ? "bg-[var(--page-fg)] text-[var(--page-bg)]"
                      : "text-[var(--muted)] hover:text-[var(--page-fg)]"
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
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {active && (
          <section>
            <div className="mb-5 flex items-end justify-between">
              <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
                {active.title}
              </h1>
              <span className="text-xs text-[var(--muted)]">
                {active.styles.length} styles
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {active.styles.map((s) => (
                <StyleCard key={s.slug} style={s} showPrompts={showPrompts} />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-[var(--card-border)] py-6">
        <div className="mx-auto max-w-7xl px-4 text-xs text-[var(--muted)] sm:px-6">
          Click any image to copy its prompt. Empty cards mean a demo hasn&apos;t
          been generated yet — clicking still copies the reusable prompt template.
        </div>
      </footer>

      <ToastHost />
    </div>
  );
}
