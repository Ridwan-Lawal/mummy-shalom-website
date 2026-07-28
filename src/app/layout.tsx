import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UtilityBar } from "@/components/layout/UtilityBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { SiteFooter } from "@/components/layout/SiteFooter";

// General Sans (§3) — self-hosted. Previously loaded from the Fontshare CSS API,
// which started returning 200 with no @font-face rules, silently dropping the brand
// face to a system sans. next/font/local fingerprints these into /_next/static,
// serves them same-origin, and generates a metric-matched fallback (no CLS).
// See src/app/fonts/LICENSE.md.
const generalSans = localFont({
  src: [
    { path: "./fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  title: "Mummy Shalom Medical Services — Ikorodu",
  description:
    "Rehabilitation, maternity and everyday care in Ikorodu, Lagos. NHIS/HMO accepted. We Care, God Heals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${generalSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Persistent utility bar + nav — the emergency path is never a click away (§5). */}
        <header className="sticky top-0 z-40 border-b border-hairline bg-background">
          <UtilityBar />
          <SiteHeader />
        </header>
        {/* Plain div, not <main>: each page renders its own <main>. */}
        <div className="flex-1">{children}</div>
        <ContactCTA />
        <SiteFooter />
      </body>
    </html>
  );
}
