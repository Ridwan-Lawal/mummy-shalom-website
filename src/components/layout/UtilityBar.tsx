// Persistent utility bar (§5 Global): both phones tap-to-dial always visible;
// short location + hours collapse on mobile. Calm — no urgent red here (§4).
import { site } from "@/lib/site";
import { ClockIcon, MapPinIcon, PhoneIcon } from "./icons";

export function UtilityBar() {
  return (
    <div className="border-b border-hairline bg-background text-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-1.5 sm:px-8">
        {/* Location + hours — secondary, hidden on the smallest screens. */}
        <div className="hidden items-center gap-5 text-muted sm:flex">
          <span className="inline-flex items-center gap-1.5">
            <MapPinIcon className="h-4 w-4 text-primary" />
            {site.address.short}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="h-4 w-4 text-primary" />
            {site.hours}
          </span>
        </div>

        {/* Phones — always visible, tap-to-dial, bold. Calm teal, not red. */}
        <div className="flex items-center gap-4">
          <span className="hidden text-muted sm:inline">Call:</span>
          <div className="flex items-center gap-3">
            {site.phones.map((p) => (
              <a
                key={p.tel}
                href={`tel:${p.tel}`}
                className="inline-flex items-center gap-1.5 font-medium text-primary tabular-nums transition-colors duration-150 hover:text-foreground"
              >
                <PhoneIcon className="h-4 w-4" />
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
