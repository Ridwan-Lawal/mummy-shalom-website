// Single source of truth for contact details + nav (CLAUDE.md §0, §9).
// One phones/email/hours/address set, used by the utility bar, nav, and footer.

export const site = {
  name: "Mummy Shalom Medical Services",
  tagline: "We Care, God Heals",
  positioning:
    "Rehabilitation, maternity and everyday care in Ikorodu. NHIS/HMO accepted.",

  // Both numbers from §0. `tel` is the raw dialable string; `label` is display.
  phones: [
    { label: "0816 158 7676", tel: "08161587676" },
    { label: "0812 322 6954", tel: "08123226954" },
  ],

  email: "mummyshalommedicalservices@gmail.com",

  address: {
    full: "10, Kingsley Omoruyi Street, Olubi Harmony Estate, Morekete Igbogbo, Ikorodu, Lagos",
    short: "Igbogbo, Ikorodu",
    // Parts, so prose can reference the location without re-typing the address (§9).
    street: "Kingsley Omoruyi Street",
    estate: "Olubi Harmony Estate",
    area: "Igbogbo",
    // The area as it appears in the full address; `area` alone reads better in prose.
    areaFull: "Morekete Igbogbo",
  },

  // Placeholders to confirm with the client (§12). These render literally on the page
  // on purpose — an open question stays visible instead of being invented.
  // Confirmed by the client: emergencies are covered around the clock. Worded as
  // "for emergencies" on purpose — she confirmed 24/7 EMERGENCY cover, not that
  // consultations, dental and the pharmacy run all night (§9: claim what is true).
  hours: "24/7 for emergencies",
  // How quickly the clinic replies to a form inquiry — shown twice on /contact.
  responseWindow: "an hour",
  // A nearby landmark to help people find the turning (§5 /contact).
  landmark: "Adeboruwa Palace, Igbogbo",
  // Confirmed by the client: WhatsApp runs on the primary line.
  whatsapp: "0816 158 7676",

  // From the clinic's own Google Maps listing, so the pin lands on the building.
  // Open map data has neither the street nor the estate, so these coordinates are
  // the authoritative source — derive every maps URL from them, not from the address.
  map: {
    lat: 6.5649914,
    lng: 3.4970447,
    // Wider zoom, so the surrounding streets give people something to orient by.
    // The lat/lng above stay the pin itself and drive the Open-in-Maps and
    // directions links; only the embed's framing changes here.
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10856.157931791182!2d3.492601915265224!3d6.565584273052953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bef005b0319d3%3A0xb195ec84b1117637!2sMummy%20Shalom%20Medical%20Services!5e0!3m2!1sen!2sng!4v1785243337217!5m2!1sen!2sng",
  },
  years: "[YEARS — CONFIRM]",
  hmos: "[HMOs — CONFIRM]",
  // How the founder wants her name shown publicly (§12). NOTE: "Mummy Shalom" is the
  // CLINIC's name — never use it as the founder's personal name, or the institutional
  // framing in §9 collapses back into a one-person profile.
  founderName: "Ashiru Olubunmi Elizabeth",
  cac: "CAC registered 2016 · BN 2394445",

  nav: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export type SitePhone = (typeof site.phones)[number];
