"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Brief confirmation, bottom-centre. Hand-rolled rather than a toast library: §1 makes
 * weak-data performance non-negotiable, and a dependency is hard to justify for one
 * message on one page.
 *
 * §6 grammar — white surface, hairline border, 8px radius, no shadow. §7 motion — the
 * fade is short and collapses entirely under prefers-reduced-motion via the global rule
 * in globals.css.
 */
export function Toast({
  message,
  duration = 6000,
  onDismiss,
}: {
  message: string;
  /** Auto-dismiss delay. The inline confirmation is the durable record, so this is brief. */
  duration?: number;
  onDismiss?: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Next frame, so the element mounts opaque-0 and transitions in.
    const raf = requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      // Let the fade finish before unmounting.
      setTimeout(() => onDismiss?.(), 200);
    }, duration);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [duration, onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-sm items-start gap-3",
        "rounded-lg border border-hairline bg-surface px-4 py-3",
        "transition-opacity duration-200",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="mt-0.5 h-5 w-5 shrink-0 text-primary"
      >
        <path d="m4.5 12.5 5 5 10-11" />
      </svg>
      <p className="flex-1 text-sm text-foreground">{message}</p>
      <button
        type="button"
        onClick={() => {
          setVisible(false);
          setTimeout(() => onDismiss?.(), 200);
        }}
        aria-label="Dismiss"
        className="-mr-1 -mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted hover:text-foreground"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          aria-hidden
          className="h-4 w-4"
        >
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </div>
  );
}
