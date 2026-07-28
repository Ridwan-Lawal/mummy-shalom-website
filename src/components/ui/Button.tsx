import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "urgent";

type ButtonProps = {
  /** primary = solid teal · ghost = secondary outline · urgent = call actions ONLY (§4/§6). */
  variant?: Variant;
  /** When set, renders an <a> (for tel: / wa.me / links) instead of a <button>. */
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

// 6px radius, 44px min touch target, flat (no shadow), 150ms hover (§6/§7).
const BASE =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 min-h-11 " +
  "text-base font-medium cursor-pointer transition-colors duration-150 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-[#184e64] focus-visible:ring-primary",
  ghost:
    "bg-transparent text-primary border border-hairline hover:bg-primary/5 focus-visible:ring-primary",
  urgent: "bg-urgent text-white hover:bg-[#a72c27] focus-visible:ring-urgent",
};

export function Button({
  variant = "primary",
  href,
  target,
  rel,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(BASE, VARIANTS[variant], className);

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
