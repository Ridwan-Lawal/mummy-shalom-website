import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Single consistent max-width wrapper with responsive horizontal padding (§6). */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-6 sm:px-8", className)}>
      {children}
    </div>
  );
}
