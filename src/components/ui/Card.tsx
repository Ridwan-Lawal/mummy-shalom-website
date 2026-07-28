import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** White surface, 1px hairline (#E8E4DC), 8px radius, NO shadow (§6). */
export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("rounded-lg border border-hairline bg-surface p-6", className)}
    >
      {children}
    </div>
  );
}
