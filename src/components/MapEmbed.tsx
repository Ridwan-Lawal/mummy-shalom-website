// Map for /contact.
//
// No client state, so this stays a server component — the toggle it used to carry is
// gone and nothing here needs JS. `loading="lazy"` keeps the embed from being fetched
// until it is near the viewport, which on this page means most visitors never pay for
// it (§1, §11).
//
// The info card is ours, not Google's: white surface, hairline border, 8px radius, no
// shadow (§6). Every URL derives from site.map coordinates rather than the address
// string, because the coordinates come from the clinic's real listing.
import { ExternalLinkIcon } from "@/components/layout/icons";
import { site } from "@/lib/site";

const { lat, lng, embedUrl } = site.map;
const openInMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

export function MapEmbed() {
  return (
    <div className="space-y-3">
      <div className="relative min-h-[280px] overflow-hidden rounded-lg border border-hairline bg-surface lg:min-h-[400px]">
        <iframe
          src={embedUrl}
          title={`Map showing ${site.name}, ${site.address.full}`}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />

        {/* Compact chip, not a card: it sits in the corner so nothing covers the
            pin. 6px radius, hairline border, no shadow (§6). */}
        <a
          href={openInMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface px-2.5 py-1.5 text-sm font-medium text-primary transition-colors duration-150 hover:text-foreground"
        >
          Open in Maps
          <ExternalLinkIcon className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Name and address live below the map, not on top of it. */}
      <div>
        <p className="font-medium text-foreground">{site.name}</p>
        <p className="text-foreground">{site.address.full}.</p>
      </div>

      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-medium text-primary hover:text-foreground"
      >
        Get directions →
      </a>
    </div>
  );
}
