"use client";

import { useEffect, useState } from "react";

type ToastEvent = CustomEvent<{ message: string }>;

export function showToast(message: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("app:toast", { detail: { message } }));
}

export function ToastHost() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const onToast = (e: Event) => {
      const evt = e as ToastEvent;
      setMessage(evt.detail.message);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setMessage(null), 1600);
    };
    window.addEventListener("app:toast", onToast);
    return () => {
      window.removeEventListener("app:toast", onToast);
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!message) return null;
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="fade-in rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-2 text-xs font-medium text-[var(--page-fg)] shadow-sm">
        {message}
      </div>
    </div>
  );
}
