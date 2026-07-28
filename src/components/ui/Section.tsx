import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Vertical-rhythm wrapper for a page band. Ground is warm-white `background`;
 * pass `surface` to render a pure-white (#FFFFFF) band for gentle separation.
 */
export function Section({
  surface = false,
  id,
  className,
  children,
}: {
  surface?: boolean;
  /** Anchor target, so sections can be deep-linked (e.g. /services#maternity). */
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("py-16 sm:py-24", surface && "bg-surface", className)}
    >
      {children}
    </section>
  );
}
