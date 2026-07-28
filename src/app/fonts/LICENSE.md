# General Sans — font files

Typeface: **General Sans**, by the Indian Type Foundry (ITF), distributed via
[Fontshare](https://www.fontshare.com/fonts/general-sans).

## License

General Sans is a **Closed Source** Fontshare font, governed by the
**ITF Free Font License (FFL), Version 1.0 — 20 Jan 2021**.

Fontshare states that all its fonts are "100% free for personal and commercial use"
and "can be used in any media, at any scale, at any location worldwide." Web
embedding/self-hosting is covered by §03 (Embedding) of the FFL.

Full terms: <https://www.fontshare.com/licenses/itf-ffl>

The typeface remains the intellectual property of the Indian Type Foundry. These files
may not be resold or redistributed as a font product; they are embedded here solely to
serve this website.

## Provenance

Retrieved 2026-07-27 from the Fontshare CDN, at the URLs that
`https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600` resolved to:

| File | Weight | Size |
|---|---|---|
| `GeneralSans-Regular.woff2` | 400 | 23,084 bytes |
| `GeneralSans-Medium.woff2` | 500 | 22,904 bytes |
| `GeneralSans-Semibold.woff2` | 600 | 23,092 bytes |

These three weights are the ones the brand system uses: 400 body, 500/600 headlines
(§3, and `src/components/ui/Heading.tsx`).

## Why these are committed to the repo

The site previously loaded General Sans at runtime from the Fontshare CSS API. That
endpoint began returning `HTTP 200` with a body of
`/* Access to the Fontshare API has been temporarily restricted. */` and **no
`@font-face` rules**, so the brand face silently stopped rendering with no error
anywhere — the site fell back to a system sans.

Self-hosting via `next/font/local` removes that runtime dependency entirely. Do not
replace it with a CDN link.
