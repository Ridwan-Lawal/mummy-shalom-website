// Shared Open Graph card for every route (§4 palette, §8 imagery policy).
//
// Deliberately typographic, not photographic. §8 governs what a photo may be
// presented as, and a share card is exactly the context where a cropped clinic
// photo gets reposted stripped of its caption. A generated card claims nothing.
//
// FONTS: this renders through Satori, which reads woff/ttf/otf but NOT woff2 —
// and src/app/fonts/ holds woff2 only, because that is what the browser wants.
// Rather than ship a second copy of General Sans in a heavier format for one
// build-time asset, this card uses Satori's built-in sans. The card is off-brand
// in face but on-brand in colour and composition; if that matters later, add
// GeneralSans-Semibold.ttf to src/app/fonts/ and pass it in `fonts:`.
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — rehabilitation, maternity and everyday care in ${site.address.short}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // Brand tokens, hardcoded: this renders outside the browser, so the
          // CSS custom properties in globals.css are not available here. Keep
          // these in step with the @theme block.
          backgroundColor: "#faf8f4", // --color-background
          color: "#221f1a", // --color-foreground
          padding: "72px 80px",
        }}
      >
        {/* Gold is permitted for the tagline and nothing else (§4). */}
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#c9962e", // --color-gold
          }}
        >
          {site.tagline}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {/* The capability leads, not the clinic name (§5 hero rule). */}
          <div style={{ display: "flex", fontSize: 68, lineHeight: 1.15 }}>
            Rehabilitation, maternity and everyday care in Ikorodu
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#6b655c" }}>
            {site.name} · NHIS/HMO accepted
          </div>
        </div>

        {/* Hairline rule instead of a panel — flat, no shadows (§6). */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #e8e4dc", // --color-hairline
            paddingTop: 28,
            fontSize: 26,
            color: "#1e5f7a", // --color-primary
          }}
        >
          <div style={{ display: "flex" }}>{site.address.short}</div>
          <div style={{ display: "flex" }}>{site.phones[0].label}</div>
        </div>
      </div>
    ),
    size,
  );
}
