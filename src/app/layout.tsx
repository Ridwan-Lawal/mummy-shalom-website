import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UtilityBar } from "@/components/layout/UtilityBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ContactCTA } from "@/components/layout/ContactCTA";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { siteGraph } from "@/lib/schema";
import { site } from "@/lib/site";

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
  // Resolves every relative URL below (canonicals, OG image) against the one origin
  // in site.ts. Without it Next emits relative og:image URLs, which crawlers drop.
  metadataBase: new URL(site.url),
  title: {
    default: "Mummy Shalom Medical Services — Ikorodu",
    // Child routes set a short title; the brand is appended once, here, so the two
    // can never drift apart.
    template: `%s — ${site.name}`,
  },
  description:
    "Rehabilitation, maternity and everyday care in Ikorodu, Lagos. NHIS/HMO accepted. We Care, God Heals.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    // Nigerian English — the audience is local (§1), and the locale is a ranking
    // signal for the "near me" searches this site needs to win.
    locale: "en_NG",
    siteName: site.name,
    url: site.url,
    title: "Mummy Shalom Medical Services — Ikorodu",
    description:
      "Rehabilitation, maternity and everyday care in Ikorodu, Lagos. NHIS/HMO accepted.",
    // Declared explicitly rather than left to the opengraph-image.tsx file
    // convention. That convention resolves its URL at BUILD time from the build
    // origin, not from metadataBase — locally it bakes in localhost:3000, and on
    // Vercel it would bake in the per-deployment preview hostname and keep it.
    // A relative path here composes with metadataBase instead, so the card always
    // points at the real domain. The route itself still comes from that file.
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} — rehabilitation, maternity and everyday care in ${site.address.short}`,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Large thumbnails in mobile local results — this is the photo-led format the
      // "clinic near me" pack uses, and it is opt-in.
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        {/* Clinic + website structured data, once for every route. This is what puts
            the address, both phone numbers and the map pin into Google's local pack
            and into assistant answers — the two places the §1 audiences actually
            start. Per-page breadcrumbs are rendered by the pages themselves. */}
        <JsonLd data={siteGraph} />
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
