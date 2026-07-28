import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small dignified kicker above a heading — uppercase, letter-spaced, teal (§4). */
export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={cn(
        "text-sm font-medium uppercase tracking-widest text-primary",
        className,
      )}
    >
      {children}
    </p>
  );
}
