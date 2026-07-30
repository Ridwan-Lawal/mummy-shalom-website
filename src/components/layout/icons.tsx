// Small inline stroke icons — no icon library (weak-data), no emoji (§6).
// All share a 24x24 viewBox and inherit `currentColor`.

import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 3.5h3l1.2 4-2 1.3a12 12 0 0 0 5.2 5.2l1.3-2 4 1.2v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
    </svg>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s6.5-5.2 6.5-10.5A6.5 6.5 0 0 0 5.5 10.5C5.5 15.8 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.25" />
    </svg>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  );
}

/** Arrow leaving a box — marks a link that opens in a new tab. */
export function ExternalLinkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M14 4.5h5.5V10M19.5 4.5 12 12" />
      <path d="M17.5 14v4a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V8A1.5 1.5 0 0 1 6 6.5h4" />
    </svg>
  );
}

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m3.75 7 7.35 5.2a1.6 1.6 0 0 0 1.8 0L20.25 7" />
    </svg>
  );
}

/** Simplified WhatsApp mark — speech bubble with a handset, drawn in the same
 *  stroke shape as the rest of the set rather than pulling in a brand icon font. */
export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 20.5l1.3-4a8 8 0 1 1 3.2 3.2l-4.5.8Z" />
      <path d="M9 9.2c.3 1.6 2.2 3.5 3.8 3.8l1-1.2 2 .9v1.4a1.3 1.3 0 0 1-1.5 1.2 7.3 7.3 0 0 1-6.8-6.8A1.3 1.3 0 0 1 8.7 7h1.4l.9 2-1 1.2Z" />
    </svg>
  );
}

/** Pulse line — recovery and rehabilitation. */
export function ActivityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 12h3.5l2.5-6 4 12 2.5-6H21" />
    </svg>
  );
}

/** Trend line — ongoing monitoring of a long-term condition. */
export function ChartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4v15.5h16" />
      <path d="m7.5 15 3.5-4 3 2.5 4.5-6" />
    </svg>
  );
}

export function PharmacyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="3.5" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

export function BedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 18V7m0 6h18v5m0-5a3 3 0 0 0-3-3h-6v3" />
      <circle cx="7.25" cy="10.75" r="1.75" />
    </svg>
  );
}

export function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.25l7 2.5v5.5c0 4.2-2.9 7.6-7 9.5-4.1-1.9-7-5.3-7-9.5v-5.5l7-2.5Z" />
      <path d="m9 11.75 2.25 2.25L15.25 10" />
    </svg>
  );
}

export function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.75" />
    </svg>
  );
}
