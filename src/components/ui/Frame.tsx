import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/cn";

/**
 * A photo in the brand's frame: 8px radius, hairline border, flat — no shadow (§6).
 *
 * Every photo on the site goes through this so the set stays visually cohesive
 * (§8: "consistent light edit across ALL photos — one cohesive set"). `ratio` crops
 * mismatched sources to a shared shape via object-cover, so a 3-photo strip lines up
 * even when the originals differ.
 *
 * Pass a statically imported image (not a string path) — Next then reads the intrinsic
 * dimensions at build time, so there is no layout shift and no hardcoded width/height.
 */

// Full literal class strings: Tailwind v4 scans source text, so a computed
// `aspect-[${ratio}]` would never be compiled. Two maps because the mobile shape is
// the base and the design shape is the `sm:` override.
const RATIOS = {
  "16/10": "aspect-[16/10]", // wide landscape — the static map
  "4/3": "aspect-[4/3]", // landscape — shortest, for mobile strips
  "1/1": "aspect-square", // square — mobile portraits, keeps heads with align="top"
  "3/5": "aspect-[3/5]",
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
} as const;

const RATIOS_SM = {
  "16/10": "sm:aspect-[16/10]",
  "4/3": "sm:aspect-[4/3]",
  "1/1": "sm:aspect-square",
  "3/5": "sm:aspect-[3/5]",
  "3/4": "sm:aspect-[3/4]",
  "4/5": "sm:aspect-[4/5]",
} as const;

// Standing full-body subjects lose their heads to a centred crop — anchor those to top.
const ALIGN = {
  center: "object-center",
  top: "object-top",
} as const;

export type FrameRatio = keyof typeof RATIOS;

export function Frame({
  src,
  alt,
  ratio,
  mobileRatio,
  align = "center",
  sizes,
  priority = false,
  className,
}: {
  src: StaticImageData;
  /** Describe what is actually in the frame — these are real photos of a real clinic. */
  alt: string;
  /** Shape from `sm` upwards. */
  ratio: FrameRatio;
  /** Shorter shape below `sm`, so photos don't eat the screen on a phone. Defaults to `ratio`. */
  mobileRatio?: FrameRatio;
  align?: keyof typeof ALIGN;
  /** Rendered width hint, so weak connections don't over-fetch (§1). */
  sizes?: string;
  /** Only the hero (LCP) should set this. Everything else stays lazy. */
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-hairline bg-surface",
        RATIOS[mobileRatio ?? ratio],
        RATIOS_SM[ratio],
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className={cn("h-full w-full object-cover", ALIGN[align])}
      />
    </div>
  );
}
