"use client";

import { useCallback } from "react";
import type { Style } from "@/lib/types";
import { showToast } from "./Toast";

type Props = {
  style: Style;
  showPrompts: boolean;
};

export function StyleCard({ style, showPrompts }: Props) {
  const demo = style.demo;
  const promptToCopy = demo?.exact_prompt || style.reusable_prompt;
  const isPending = !demo;
  const webpName = demo?.image.replace(/\.png$/i, ".webp");

  const onCopy = useCallback(() => {
    if (!promptToCopy) return;
    navigator.clipboard
      .writeText(promptToCopy)
      .then(() => showToast(isPending ? "Copied reusable prompt" : "Copied prompt"))
      .catch(() => showToast("Copy failed"));
  }, [promptToCopy, isPending]);

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={onCopy}
        title={isPending ? "Pending — copies the reusable {{SUBJECT}} prompt" : "Click to copy prompt"}
        className="group relative aspect-square w-full overflow-hidden rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] transition hover:border-[var(--page-fg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--page-fg)]"
      >
        {demo && webpName ? (
          // eslint-disable-next-line @next/next/no-img-element
          <picture>
            <source
              media="(max-width: 639px)"
              srcSet={`/generated/sm/${webpName}`}
              type="image/webp"
            />
            <img
              src={`/generated/lg/${webpName}`}
              alt={style.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.02]"
            />
          </picture>
        ) : (
          <div className="h-full w-full" aria-hidden />
        )}
      </button>
      <div className="mt-2 px-0.5 text-xs text-[var(--muted)]">
        {style.name}
      </div>
      {showPrompts && (
        <div className="fade-in mt-2 rounded-md border border-[var(--card-border)] bg-[var(--card-bg)] p-3 text-xs leading-relaxed text-[var(--page-fg)]">
          {demo?.scene && (
            <div className="mb-2 text-[11px] uppercase tracking-wider text-[var(--muted)]">
              {demo.scene}
            </div>
          )}
          <p className="whitespace-pre-wrap break-words">
            {promptToCopy}
          </p>
          {isPending && (
            <p className="mt-2 text-[11px] text-[var(--muted)]">
              No demo image yet — prompt above is the reusable template.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
