"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../../public/logo.png";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { CloseIcon, MenuIcon, PhoneIcon } from "./icons";

const primaryTel = site.phones[0].tel;

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Escape to close + lock body scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="bg-background">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-3 sm:px-8">
        {/* Logo + wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label={`${site.name} — home`}
        >
          <Image src={logo} alt="" className="h-10 w-10" priority />
          <span className="flex flex-col leading-tight">
            <span className="font-semibold text-foreground">Mummy Shalom</span>
            <span className="text-xs text-muted">Medical Services</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {site.nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-base transition-colors duration-150 hover:text-primary",
                  active ? "font-medium text-primary" : "text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          {/* The single urgent element in the top viewport (§4). */}
          <Button variant="urgent" href={`tel:${primaryTel}`}>
            <PhoneIcon className="h-4 w-4" />
            Call us
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground hover:bg-primary/5 md:hidden"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          {/* Scrim */}
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          {/* Panel */}
          <div
            id="mobile-nav"
            className="absolute right-0 top-0 flex h-full w-80 max-w-[85%] flex-col bg-background shadow-none"
          >
            <div className="flex items-center justify-between border-b border-hairline px-6 py-3">
              <span className="font-semibold text-foreground">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground hover:bg-primary/5"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>

            <nav
              className="flex flex-col gap-1 px-4 py-4"
              aria-label="Mobile primary"
            >
              {site.nav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3 py-3 text-lg transition-colors duration-150",
                      active
                        ? "bg-primary/5 font-medium text-primary"
                        : "text-foreground hover:bg-primary/5",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto space-y-3 border-t border-hairline px-6 py-5">
              <Button variant="urgent" href={`tel:${primaryTel}`} className="w-full">
                <PhoneIcon className="h-4 w-4" />
                Call us
              </Button>
              <div className="flex flex-col gap-1">
                {site.phones.map((p) => (
                  <a
                    key={p.tel}
                    href={`tel:${p.tel}`}
                    className="font-medium text-primary tabular-nums"
                  >
                    {p.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
