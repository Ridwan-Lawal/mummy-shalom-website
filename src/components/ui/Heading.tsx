import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Level = "h1" | "h2" | "h3" | "h4";

// Warm humanist headings, 500–600 weight (§3).
const STYLES: Record<Level, string> = {
  h1: "text-4xl sm:text-5xl font-semibold tracking-tight leading-tight",
  h2: "text-3xl font-semibold tracking-tight leading-tight",
  h3: "text-2xl font-medium leading-snug",
  h4: "text-xl font-medium leading-snug",
};

export function Heading({
  as = "h2",
  className,
  children,
}: {
  as?: Level;
  className?: string;
  children: ReactNode;
}) {
  const Tag = as;
  return (
    <Tag className={cn("text-foreground", STYLES[as], className)}>{children}</Tag>
  );
}
