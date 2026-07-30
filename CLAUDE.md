# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Marketing/informational website for **Mummy Shalom Medical Services** (a clinic in
Ikorodu, Lagos). Built on Create Next App. The brand foundation (design tokens,
fonts, metadata), the shared chrome (utility bar, nav, contact band, footer) and a
small UI primitive library are in place; the content routes are what remain.
The brand system that the site must implement is documented in full below (palette,
typography, imagery policy, page structure); treat it as the design source of truth.

## Commands

```bash
npm run dev     # start dev server at http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npm run lint    # ESLint (flat config) — the only automated quality gate
```

No test framework is configured. `npm run lint` is the check to run before claiming
work is done.

## Stack & architecture

- **Next.js 16.2.12, App Router** — routes/layouts live in `src/app/`.
- **Multi-route site** — per §5 (Page structure) below, the build is multiple routes:
  `/` (Home), `/services`, `/about`, `/contact`, with shared chrome in the root layout.
  Each becomes a folder under `src/app/` (e.g. `src/app/services/page.tsx`).
- **React 19**, **TypeScript** (strict). Path alias `@/*` → `src/*`.
- **Tailwind CSS v4**, **CSS-first config**: there is NO `tailwind.config.js`.
  Brand design tokens are declared in `src/app/globals.css` inside `@theme` (colors +
  fonts, §3–§4), and PostCSS wires it via `@tailwindcss/postcss` (`postcss.config.mjs`).
  To change brand colors/fonts, edit `globals.css` — not a JS config file.
- **Fonts** — General Sans (brand headline/body per §3) is **self-hosted**. The woff2
  files for the three weights the brand uses (400/500/600) live in `src/app/fonts/`
  and are loaded by `next/font/local` in `src/app/layout.tsx`, which exposes them as
  `--font-general-sans` on `<html>`; `--font-sans` in `globals.css` chains to that.
  It is not on Google Fonts, so `next/font/google` cannot serve it.
  **Do not reintroduce a CDN `<link>` for it** — the site previously loaded it from
  the Fontshare CSS API, which began returning `HTTP 200` with *no* `@font-face`
  rules, silently dropping the brand face to a system sans with no error anywhere.
  See `src/app/fonts/LICENSE.md` (ITF Free Font License) for provenance.

### The three layers to build against

1. **`src/lib/site.ts`** — the single source of truth for phones, email, address,
   hours, and the nav list. §10 forbids inconsistent contact details, so **never
   hardcode a phone number, email, or address in a component** — import `site` and
   map over `site.phones`. Unconfirmed values (§12) sit here as bracketed
   placeholders like `"[HOURS — CONFIRM]"`; they render literally on the page, which
   is intentional — it makes open questions visible rather than inventing an answer.
2. **`src/components/ui/`** — presentational primitives (`Button`, `Card`,
   `Container`, `Section`, `Heading`, `Eyebrow`), re-exported from `ui/index.ts`;
   import as `import { Button, Card } from "@/components/ui"`. These *encode* §6
   component grammar (8px card radius, 6px button radius, hairline borders, no
   shadows, 150ms hovers, 44px touch targets). Compose them rather than
   re-implementing the styling inline — that is what keeps the discipline enforced.
   `Button` renders an `<a>` when given `href` (used for `tel:` links) and a
   `<button>` otherwise.
3. **`src/components/layout/`** — the shared chrome rendered by `layout.tsx` around
   every page: `UtilityBar`, `SiteHeader` (the only `"use client"` component — mobile
   drawer state), `ContactCTA`, `SiteFooter`, plus `icons.tsx`.

Pages render their own `<main>`; the root layout deliberately wraps `children` in a
plain `<div>`, so don't add a second `<main>`.

**Icons are hand-rolled inline SVGs** in `src/components/layout/icons.tsx` (shared
24×24 viewBox, `currentColor`, `aria-hidden`). There is no icon library and no
runtime dependency beyond React/Next — a deliberate weak-data choice (§1, §5). Add
new icons to that file in the same shape rather than installing a package.

`src/lib/cn.ts` is a minimal falsy-filtering class joiner — not `clsx`/`tailwind-merge`.
It does **not** dedupe conflicting Tailwind classes, so later classes only win if the
CSS cascade says so; primitives take a `className` prop for additive tweaks only.

## Non-obvious gotchas

- **This is Next.js 16, which differs from training-data Next.js.** Per `AGENTS.md`,
  read the relevant guide under `node_modules/next/dist/docs/` before writing Next
  code, and heed deprecation notices. Do not assume older App-Router APIs.
- **`src/app/page.tsx` is still Create-Next-App boilerplate.** It references deleted
  assets (`/next.svg`, `/vercel.svg`) and uses `dark:` + `zinc-*` classes that
  contradict the brand: the site is **light-mode only** (`color-scheme: light` is
  locked in `globals.css`), and the brand explicitly forbids the dark-gradient,
  "medical-blue slop" look a generic template implies. Replace it wholesale per §5
  (Home) — don't incrementally restyle it, and never copy its `dark:` patterns into
  new pages. `/services`, `/about` and `/contact` don't exist yet.
- **`/test` and `/styleguide` are temporary review routes, not product.** `src/app/test/`
  renders every `@theme` token to prove the tokens resolve to Tailwind utilities;
  `src/app/styleguide/` renders every UI primitive. Both are labelled
  "delete before launch" in-file and both must be removed before shipping (they also
  inherit the shared chrome, so they are publicly routable). `/test` intentionally
  spells out full literal class strings (`"bg-primary"`, not `` `bg-${name}` ``)
  because Tailwind v4 scans source text — dynamically-built class names won't compile.
- **Use brand token utilities, not raw Tailwind palette colors.** `bg-background`,
  `text-foreground`, `text-muted`, `border-hairline`, `bg-primary`, `bg-urgent`,
  `text-gold`, `text-accent` all come from `@theme`. `bg-zinc-50`/`text-black` and
  friends are off-brand. Note the §4 discipline the tokens can't enforce on their own:
  **`urgent` red is for the call block only, once per viewport**, and `gold` is only
  for the "We Care, God Heals" line.
- **Do not convert `globals.css`'s `@theme` block to `@theme inline`.** The Next.js
  font docs show `@theme inline` for the Tailwind v4 pairing, so this looks like a
  correction waiting to happen — it isn't. `body` in `globals.css` reads
  `var(--font-sans)`, `var(--color-background)` and `var(--color-foreground)`
  directly, and `inline` stops emitting those as custom properties on `:root`, which
  breaks all three **silently** (utilities keep working, so it looks fine). `inline`
  is only required when the referenced variable is set on a *nested* element; here
  `next/font`'s variable is on `<html>`, which **is** `:root`, so plain `@theme`
  resolves correctly.
- **Photos in `public/` are the real clinic's and are named by their role** — e.g.
  `01-hero-mummy-shalom-desk.jpg`, `04-team-staff-duo-CROPPED.jpg`. Two names carry
  hard constraints from §8: `05-maternity-PENDING-CONSENT.jpg` **must not be rendered**
  until the client confirms the mother's consent, and `-CROPPED` files are the
  privacy-safe crops — use those, never an uncropped re-export. No stock or internet
  photography, ever (§8).

## Design source of truth

Everything below this line is the brand/design specification. Follow it exactly
when building UI — palette is logo-derived, imagery policy is strict (no stock/
internet photos of the clinic), and "cure" claims are prohibited.

---

# Brand Identity — Mummy Shalom Medical Services

> Clinic + convalescent home + maternity + alternative/traditional medicine, Ikorodu, Lagos. FINAL v3 — all real assets catalogued, photo dos/don'ts included, imagery policy locked. Drop in as CLAUDE.md and build section by section.

---

## 0. Project header

- **Client:** Mummy Shalom Medical Services (Mummy Shalom Convalescent Home) — "We Care, God Heals"
- **Registered:** CAC 2016 (BN 2394445) — clinic and maternity home, traditional medicine
- **Location:** 10, Kingsley Omoruyi Street, Olubi Harmony Estate, Morekete Igbogbo, Ikorodu, Lagos
- **Phones:** 08161587676 · 08123226954 (click-to-call both)
- **Email:** mummyshalommedicalservices@gmail.com [CONFIRM primary — a second email exists on the banner]
- **Type:** Clinic website — convalescent/rehabilitation + alternative & traditional medicine + maternity + general care
- **Positioning:** The Ikorodu clinic families trust for long-term recovery — certified care, safe deliveries, everyday medicine. NHIS/HMO accepted.

---

## 1. Audience & job-to-be-done

- **Primary: the researching family** — choosing care for a loved one (stroke rehab, arthritis, diabetes, convalescence). Comparing carefully. Question: "Are these people qualified, safe, caring?" Mobile, possibly weak data.
- **Secondary: the urgent visitor** — sick or in labour, needs phone/address/hours instantly.
- **Success:** family submits a care inquiry or calls; urgent visitor taps call in seconds.
- **Mobile-first, weak-data-friendly. Non-negotiable.**

---

## 2. Aesthetic direction

**Direction:** **Warm, credentialed care.** A safe, professionally-run, God-fearing care home — human warmth backed by visible qualifications. NOT corporate-cold, NOT medical-blue slop, NOT the busy flyer style. Calm, light, honest, personal.

**Signature elements:**
1. **A named, credentialed clinical team.** The subject of this site is the CLINIC, not one person. Mummy Shalom Medical Services is who provides the care; the founder appears as **lead practitioner** with her credentials — the way any good clinic establishes clinical authority — and the nursing staff appear alongside her as a team. This answers the question a family actually asks: "who looks after my mother when the founder isn't on shift?" A one-person framing raises that question; a team framing answers it.
2. **A real credentials band:** Registered Nurse & Registered Midwife (RN/RM, BNSc), Nursing & Midwifery Council of Nigeria · Nursing & Midwifery Council of Nigeria CPD · Lagos State Traditional Medicine Board · AGPNP Lagos · Lagos State registered Traditional & Alternative Medicine Practitioner · CAC-registered since 2016 · NHIS/HMO accepted · works with doctors across the relevant areas, including a gynaecologist. Named institutions as clean text — never vague badges, never pasted certificate photos.

   **CREDENTIAL RULE: "Community Birth Attendant" must NOT appear anywhere on the site.** The client has removed it. The clinic's maternity credential is RN/RM (BNSc) with the Nursing & Midwifery Council of Nigeria — a maternity home must be led by a registered midwife, and this one is. Do not reintroduce the Lagos State College of Health Technology birth-attendant line from any earlier draft of this brief.
3. **Dual-action module:** "Call us" (urgent) + "Ask about care" (primary) — care-inquiry weighted, urgent path unmissable.

**A small new clinic looking professional — the principle:** professionalism comes from PRESENTATION of real assets (consistent photo treatment, calm layout, named credentials, plain confident copy, fast load) — never from borrowed imagery. Honest and considered beats padded and glossy.

---

## 3. Typography

- **Headlines:** Switzer or General Sans (Fontshare, free), 500–600. Warm humanist.
- **Body:** same family, 400, line-height 1.6+, base size 17–18px (older/stressed readers).
- **Phones:** large, bold, unmissable.
- Plain language. Short sentences. Nothing to decode.

---

## 4. Color — DERIVED FROM HER LOGO (Option B)

The palette comes from the logo itself — measured from the extracted seal — so the site and brand are one thing. Calm execution of HER colors, not the flyer's busy treatment of them.

**Measured from the logo:**
- Logo ring red: `#D42C2F` · Logo caduceus blue-teal: `#3891B1`

**The palette:**
- **Background:** warm soft white `#FAF8F4` (calm canvas; never the flyer's hexagon blue)
- **Surface:** `#FFFFFF` · **Hairlines:** `#E8E4DC`
- **Text:** `#221F1A` · **Muted:** `#6B655C`
- **Primary (trust/actions):** deep navy-teal `#1E5F7A` — a deepened, calmed version of the logo's caduceus blue. Buttons, links, headings accents, icons. (The raw `#3891B1` is too light for text/buttons; use it only for subtle icon accents if needed.)
- **Urgent (call block ONLY):** `#C2342E` — a slightly deepened version of the logo's ring red. This is an elegant mapping: HER brand red = the emergency signal. Once per viewport, nowhere else.
- **Optional warm note:** soft gold `#C9962E`, very sparing, for the "We Care, God Heals" line only.

**Why this beats inventing a palette:** the client instantly understands it ("the colors come from your logo"), the logo never clashes with the site, and brand recognition carries from flyer → signage → web. The discipline (no gradients, no hexagons, red confined to the call block, calm warm-white ground) is what separates the site from the flyer — same colors, completely different composure.

---

## 5. Page structure

**MULTI-PAGE SITE — 4 pages.** Shared layout wraps every page: persistent utility bar (top) + nav + footer. Routes: `/` `/services` `/about` `/contact`.

### Global (every page, via layout)
- **Utility bar (persistent, sticky on mobile):** both phones tap-to-call · Igbogbo, Ikorodu · hours [CONFIRM]. The emergency path is NEVER a click away.
- **Nav:** logo + Home · Services · About · Contact + a small "Call us" button (urgent variant). Mobile: clean drawer.
- **Contact CTA band (bottom of EVERY page, above footer):** "Need care or advice? Call [phone] or ask about care →" (links to /contact). No page is a dead end.
- **Footer:** phones, full address, email, hours, services links, "We Care, God Heals."

### `/` — Home (the whole story, condensed)
1. **Hero:** The dominant headline is the CAPABILITY, not the clinic name — a visitor's first question is "can they help my situation?", and the name already appears in the nav and logo. Structure:
   - Eyebrow: "We Care, God Heals" (gold token — its only permitted use)
   - Headline (largest type): "Rehabilitation, maternity and everyday care in Ikorodu"
   - Secondary line: "Mummy Shalom Medical Services · NHIS/HMO accepted" — clinic name at supporting weight
   - Dual actions: "Call us" (urgent variant, tel: from site.ts — the ONE urgent-red element on the page) and "Ask about care" (primary → /contact)
   - Tap-to-call fallback line beneath: "Or call [phone] — Igbogbo, Ikorodu"
   - Photo: /images/01-hero-mummy-shalom-desk.jpg, hairline frame, right side. Left-aligned layout, never centered.

   **Readability rule:** the headline and the capability line are foreground text at full contrast — NOT the muted token. §3 targets older and stressed readers; the most important sentence on the page must not be the lightest element.
2. **Services overview:** cards for the main service groups (alternative & traditional medicine — which covers stroke rehabilitation and the arthritis group · maternity & delivery · chronic condition management · general & everyday care) — each links to /services. Stroke rehabilitation must stay findable in the card copy even though it no longer has a card of its own: it is why most families arrive (§1).
3. **Care you can trust (clinic-level):** registered since 2016 · NHIS/HMO accepted · qualified nursing and midwifery staff · midwife-led maternity (RN/RM, BNSc) · works with doctors including a gynaecologist · in-patient convalescent care. The founder/lead practitioner is named here with her key credentials as part of the CLINIC's credibility — not as a personal profile. Voice is "we / our team / our clinic." → "About our clinic" link to /about.
4. **Why families choose us:** NHIS/HMO · CAC since 2016 · [X years — CONFIRM] · in-patient care.
5. **Facility glimpse:** small 3-photo strip (06, 07, 08).
A visitor who never clicks anything must still be convinced by Home alone.

### `/services` — What we care for (in depth)
Each service as a rich section with a plain-language paragraph (what it is, who it's for, how the clinic helps):
- **Alternative & traditional medicine** (founder is a practitioner registered with the Lagos State Traditional Medicine Board) — the named service, and the practice through which the next two are delivered:
  - Stroke rehabilitation — nursing care & therapy through recovery
  - Arthritis, osteoarthritis, osteoporosis & rheumatoid arthritis — pain relief and mobility support, via alternative/homeopathic remedies
- Convalescent / long-term care
- Maternity & safe delivery — antenatal, delivery & postnatal care led by a Registered Nurse & Registered Midwife (RN/RM, BNSc), Nursing & Midwifery Council of Nigeria
- Diabetes management · Hypertension management · Ulcer care — **[CONFIRM: conventional or alternative practice?]** pending the client's answer; the marker renders literally on the page until she confirms
- General illness & everyday medicine
**LANGUAGE RULE: management/care/relief/rehabilitation — NEVER "cure."**

**SERVICE RULE: physiotherapy is NOT a standalone service at this clinic.** Recovery
work is nursing care and therapy delivered through the alternative/traditional medicine
practice. Never list physiotherapy as its own service, in a section heading, or in a
card title — and never re-file the arthritis group under conventional long-term
condition management. This corrects an earlier version of this brief; the client was
explicit about it.
(Phase 2 option: individual service sub-pages for local SEO.)

### `/about` — Our clinic & team
1. **Our clinic:** the clinic's story and purpose — what Mummy Shalom Medical Services does, who it serves in Ikorodu, what it stands for (CEPIC values, "We Care, God Heals"), registered since 2016. Institution first.
2. **Our team:** presented as a team. Founder & lead practitioner (photo 01) with her full credentials by institution name; nursing staff (02, 03, 04-CROPPED) with names [PLACEHOLDER pending client] and roles. All members shown at comparable weight — not a hierarchy with one hero and three footnotes. Close with "Certificates available for inspection at the clinic."
3. **Maternity care:** mother-and-newborn (05) [ONLY WITH CONFIRMED CONSENT — see §8] + one warm line about the clinic's maternity service.
4. **Our facility:** facility photos with honest captions.

### `/contact` — Reach us
1. **Big contact block:** both phones (large, tap-to-dial), WhatsApp button [number — CONFIRM], email.
2. **Care inquiry form (Level 1):** name, phone (required), who the care is for, condition dropdown (real services), preferred date, notes → emails clinic [Formspree/Resend]. "We respond within [X hours — CONFIRM]." Privacy line.
3. **Location & hours:** static map image linking to Google Maps directions (no heavy iframe), full address, landmark note, hours.

**Per-page performance rule:** each page stays light and fast on weak data — the 3G/Lighthouse discipline applies to every route, not just Home.

---

## 6. Component grammar

- Radius 8px cards / 6px buttons. Hairline borders, flat, no shadows.
- Call block: urgent color, both numbers, tap-to-dial, phone icon.
- Primary buttons (green), verb-first. WhatsApp button recognizable green.
- Credentials row: institution names as text.
- Portraits: warm, respectful crops.

---

## 7. Motion

Near-none. Instant load, calm, stable. Hovers 150ms. Respect prefers-reduced-motion. Weak data is the norm.

---

## 8. IMAGERY — the complete policy (dos, don'ts, and the internet-images rule)

### The asset inventory (what exists, and where each goes)

**USE — people (lead with these):**
- ⭐ **Desk portrait** (white coat, logo behind her) → HERO / team section as founder & lead practitioner. The single best asset — but framed as the clinic's lead clinician, not a personal profile.
- **Nurse portrait** (navy scrubs, styled) → Our team.
- **Her outdoor smile** (blue scrubs) → About/team warmth. Crop tighter to her.
- **Staff duo in ward** → Our team ONLY IF cropped to fully remove the partially-visible patient (left of frame). If any patient trace remains after crop: do not use.
- **Mother & newborn at clinic door** → Maternity section — ONLY with the mother's explicit consent, confirmed via the client. If consent: centerpiece, optionally with her first name/quote. If not: do not use, no exceptions.
- Graduation portrait → optional, credentials section.

**USE — facility (small, honest, supporting):**
- **Emergency Room shot** (signage + trolley + BP monitor + protocol poster) → best facility photo.
- **Corridor** (bright, fire extinguisher visible) → good.
- **Entrance** → crop straight to doorway + signage + handwashing sink.

**DO NOT USE:**
- Waiting-area shots with worn/stained chairs and cluttered desk (both of them) — re-shoot or omit.
- Tilted exterior side-wall shot.
- Certificate photographs as page images (credentials = text; at most ONE small framed-certificate photo for authenticity).
- Any image showing an identifiable patient without explicit consent — including IV lines, patient clothing, or partial views. Privacy is absolute.

### Photo DOS
- ✅ Real people first: proprietor → team → proof → spaces. People sell care.
- ✅ Consistent light edit across ALL photos (slightly brighter, same warm tone) — one cohesive set.
- ✅ Crop aggressively — cut clutter out of frames.
- ✅ Compress hard; next/image or equivalent; lazy-load below fold.
- ✅ Daylight, phone level, tidy-then-shoot for any future photos.
- ✅ Post-launch upgrade path: staff group shot at entrance + tidied waiting room can be added later in minutes.

### Photo DON'TS
- ❌ **NO stock photos of doctors, nurses, patients, facilities, or equipment — ever.** Not even legally-free ones (Unsplash/Pexels). Reason: (1) visitors detect stock instantly and one fake image poisons trust in all the real ones; (2) a glossy stock hospital creates a promise the real visit breaks — the trust gap is fatal for a care home; (3) the clinic's authenticity IS the brand.
- ❌ No images pulled from Google/the internet of anything presented as the clinic — copyright + trust.
- ❌ No worn/cluttered interiors. No photo beats a bad photo.
- ❌ No intense clinical imagery (procedures, injections).
- ❌ No stretching weak photos into hero sizes — small honest strip instead.

### The narrow internet-imagery exceptions (all that's permitted)
- ✔ Abstract/neutral textures or soft color backgrounds (claim nothing)
- ✔ Icons and simple illustrations
- ✔ Map imagery for location
- Anything a visitor would assume is the clinic, its staff, or its patients → must be real. That is the line.

---

## 9. Voice & copy

- Warm, plain, dignified. "We Care, God Heals" kept, placed with dignity.
- **INSTITUTIONAL VOICE — "we / our team / our clinic", never "I".** The clinic is the speaker and the subject throughout. The founder is referred to in the third person as the founder & lead practitioner, alongside named staff. Never write the site as one person's personal profile or first-person story. A family must come away believing they are trusting a staffed clinic, not hiring an individual.
- **management / care / rehabilitation — never "cure"** (regulatory + credibility protection; have this conversation with the client, framed as protecting her).
- One email, one number set, one hours listing, everywhere.
- Sample hero: "Mummy Shalom Medical Services — rehabilitation, maternity and everyday care in Ikorodu. NHIS/HMO accepted. Call 08161587676."

---

## 10. Anti-patterns — never ship

- ❌ Writing the site as one person's personal profile or in first person ("I") — the clinic is the subject; see §9
- ❌ "Cure" claims for chronic conditions
- ❌ Stock/internet photos presented as the clinic (see §8)
- ❌ The flyer's gradient-hexagon style on the web
- ❌ Certificate photos as content
- ❌ Phone below the fold · urgent color outside the call block
- ❌ Identifiable patients without consent
- ❌ Mission-statement text walls
- ❌ Untested form at launch · heavy animation · inconsistent contact details

---

## 11. Launch QA checklist

- [ ] Both numbers tap-to-dial on a real phone
- [ ] Call block + hero visible without scrolling on small Android
- [ ] Form tested end-to-end to confirmed inbox · WhatsApp opens right number
- [ ] One consistent email/phones/hours site-wide
- [ ] "Cure" appears nowhere
- [ ] Patient-consent confirmed for the mother-and-baby photo (or photo removed)
- [ ] Staff-duo crop fully excludes the patient (or photo removed)
- [ ] All photos share one consistent edit · compressed · Lighthouse 90+
- [ ] Fast on throttled 3G · map correct for Igbogbo, Ikorodu

---

## 12. Open items to confirm with client

- [ ] Hours / 24-7 status · [ ] Primary email · [ ] WhatsApp number
- [ ] Specific HMOs to name · [ ] Years of practice
- [ ] **Mother's consent for the maternity photo** ← ask now
- [ ] Nurse's name for the team section · other staff to name?
- [ ] 1–2 family testimonials possible?
- [ ] The "management not cure" conversation
- [ ] Domain owned or needed?

---

*Mummy Shalom v4 — institutional framing (clinic & team, not personal profile) — complete asset inventory, photo dos/don'ts, no-stock imagery policy. Professionalism through presentation of the real, not addition of the borrowed.*
