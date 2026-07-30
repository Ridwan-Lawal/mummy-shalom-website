// TEMPORARY token-verification page — delete before launch. Route: /test
// Renders every brand color token, the type scale, and both font stacks so we
// can confirm the @theme tokens in globals.css actually resolve to utilities.
import type { Metadata } from "next";

// Until this route is deleted it is publicly routable, so keep it out of the index.
// robots.ts disallows it too; this is the belt-and-braces half, because a page that
// is already indexed must be crawlable to see the noindex and be dropped.
export const metadata: Metadata = {
  title: "Token check (internal)",
  robots: { index: false, follow: false },
};

type Swatch = { name: string; hex: string; className: string; note?: string };

// Full literal class strings so Tailwind v4 detects them at build time.
const colors: Swatch[] = [
  { name: "background", hex: "#faf8f4", className: "bg-background", note: "warm soft-white ground" },
  { name: "surface", hex: "#ffffff", className: "bg-surface", note: "cards / panels" },
  { name: "hairline", hex: "#e8e4dc", className: "bg-hairline", note: "borders / dividers" },
  { name: "foreground", hex: "#221f1a", className: "bg-foreground", note: "primary text" },
  { name: "muted", hex: "#6b655c", className: "bg-muted", note: "secondary text" },
  { name: "primary", hex: "#1e5f7a", className: "bg-primary", note: "navy-teal — actions/links" },
  { name: "urgent", hex: "#c2342e", className: "bg-urgent", note: "call block ONLY" },
  { name: "gold", hex: "#c9962e", className: "bg-gold", note: "“We Care, God Heals” only" },
  { name: "accent", hex: "#3891b1", className: "bg-accent", note: "logo teal — icon accents only" },
];

const sizes: { className: string; px: string }[] = [
  { className: "text-xs", px: "12px" },
  { className: "text-sm", px: "14px" },
  { className: "text-base", px: "16px" },
  { className: "text-lg", px: "18px" },
  { className: "text-xl", px: "20px" },
  { className: "text-2xl", px: "24px" },
  { className: "text-3xl", px: "30px" },
  { className: "text-4xl", px: "36px" },
  { className: "text-5xl", px: "48px" },
  { className: "text-6xl", px: "60px" },
];

const sampleText = "We Care, God Heals — 08161587676";

export default function TokenTestPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-12 sm:px-10">
      <div className="mx-auto max-w-4xl space-y-16">
        <header className="space-y-1">
          <p className="font-mono text-xs uppercase tracking-widest text-urgent">
            temporary — delete before launch
          </p>
          <h1 className="text-4xl font-semibold text-primary">Brand token verification</h1>
          <p className="text-muted">
            Route <code className="font-mono">/test</code>. If a swatch or size looks
            wrong, the <code className="font-mono">@theme</code> token in{" "}
            <code className="font-mono">globals.css</code> did not resolve.
          </p>
        </header>

        {/* ---- Colors ---- */}
        <section className="space-y-5">
          <h2 className="text-2xl font-semibold">Colors</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colors.map((c) => (
              <div
                key={c.name}
                className="overflow-hidden rounded-lg border border-hairline bg-surface"
              >
                <div className={`h-20 w-full ${c.className}`} />
                <div className="space-y-0.5 p-3">
                  <p className="font-medium">{c.name}</p>
                  <p className="font-mono text-sm text-muted">{c.hex}</p>
                  <p className="font-mono text-xs text-muted">{c.className}</p>
                  {c.note ? <p className="text-sm text-muted">{c.note}</p> : null}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Type scale ---- */}
        <section className="space-y-5">
          <h2 className="text-2xl font-semibold">Type scale</h2>
          <p className="text-muted">
            Tailwind default scale (no custom sizes defined). Note the document base is
            set to <strong>17px / line-height 1.6</strong> on <code className="font-mono">body</code>{" "}
            per brand §3, while <code className="font-mono">text-base</code> below is Tailwind&apos;s 16px.
          </p>
          <div className="divide-y divide-hairline rounded-lg border border-hairline bg-surface">
            {sizes.map((s) => (
              <div key={s.className} className="flex items-baseline gap-4 p-4">
                <span className="w-40 shrink-0 font-mono text-xs text-muted">
                  {s.className} · {s.px}
                </span>
                <span className={`${s.className} truncate`}>Ag We Care</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---- Fonts ---- */}
        <section className="space-y-5">
          <h2 className="text-2xl font-semibold">Fonts</h2>

          <div className="rounded-lg border border-hairline bg-surface p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              font-sans · General Sans (self-hosted)
            </p>
            <p className="mt-2 font-sans text-3xl font-normal">{sampleText}</p>
            <div className="mt-3 space-y-1 font-sans">
              <p className="font-normal">Weight 400 (body) — {sampleText}</p>
              <p className="font-medium">Weight 500 (headline) — {sampleText}</p>
              <p className="font-semibold">Weight 600 (headline) — {sampleText}</p>
              <p className="font-normal tabular-nums">
                tabular-nums (phones): 08161587676 · 08123226954
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-hairline bg-surface p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              font-mono · system mono fallback stack
            </p>
            <p className="mt-2 font-mono text-2xl">{sampleText}</p>
          </div>

          <p className="text-sm text-muted">
            If both blocks above look like the <em>same</em> font, General Sans did not
            load from <code className="font-mono">src/app/fonts/</code> and{" "}
            <code className="font-mono">font-sans</code> is falling back to a system
            sans. The three weights above must also look visibly distinct — 500 and 600
            rendering identically means a weight failed to map.
          </p>
        </section>
      </div>
    </main>
  );
}
