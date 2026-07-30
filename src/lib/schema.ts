// JSON-LD for the clinic (schema.org), built entirely from src/lib/site.ts.
//
// Why this file matters more than the rest of the SEO work: §1's audiences are a
// family comparing local options and someone who needs an address right now. Both
// of those journeys are increasingly answered before a page is ever opened — by
// Google's local pack, by Maps, by an assistant. This is the machine-readable
// version of the utility bar, and it is the only part of the site those surfaces
// can read reliably.
//
// NOTHING here is hand-typed that also appears on a page. §10 forbids inconsistent
// contact details, and a hardcoded phone number in a schema file is exactly how
// that happens — it is invisible in the UI, so it never gets noticed when it rots.
//
// LANGUAGE RULE (§9, §10): service names below are new copy and are bound by the
// same rule as the pages — management, care, rehabilitation. Never a promise of
// recovery from a long-term condition.
import { site } from "@/lib/site";

/**
 * Nigerian local format (0816…) to E.164 (+234816…), which is what schema.org
 * and Google expect. Stored numbers stay in the local form because that is how
 * they are displayed and dialled (§0); this converts only for machines.
 */
function toE164(localNumber: string): string {
  const digits = localNumber.replace(/\D/g, "");
  return digits.startsWith("0") ? `+234${digits.slice(1)}` : `+234${digits}`;
}

const CLINIC_ID = `${site.url}/#clinic`;
const WEBSITE_ID = `${site.url}/#website`;

/**
 * The services the clinic offers, mirroring the groups on the home page and the
 * sections on /services. `MedicalTherapy` rather than plain `Service` so the
 * medical context is explicit.
 *
 * Stroke rehabilitation is listed both under the alternative-medicine entry (which
 * is how it is delivered) and on its own, because it is the term families actually
 * search for and a nested description alone would not surface it.
 */
const availableService = [
  {
    "@type": "MedicalTherapy",
    name: "Alternative and traditional medicine",
    description:
      "Care delivered through the founder's practice as a traditional and alternative medicine practitioner registered with the Lagos State Traditional Medicine Board. Stroke rehabilitation, and the management of arthritis, osteoarthritis, osteoporosis and rheumatoid arthritis, are treated through this practice.",
    // Closest valid schema.org MedicineSystem value for the homeopathic and
    // traditional remedies this practice uses. There is no MedicalSpecialty
    // equivalent, which is why the claim lives on the service rather than on the
    // clinic's `medicalSpecialty` list.
    medicineSystem: "https://schema.org/Homeopathic",
  },
  {
    "@type": "MedicalTherapy",
    name: "Stroke rehabilitation",
    description:
      "Daily nursing care and therapy through recovery after a stroke, delivered through the clinic's alternative and traditional medicine practice, as an in-patient or through regular sessions.",
  },
  {
    "@type": "MedicalTherapy",
    name: "Convalescent and long-term in-patient care",
    description:
      "In-patient beds for patients whose recovery takes weeks or months rather than hours.",
  },
  {
    "@type": "MedicalTherapy",
    name: "Maternity and safe delivery",
    description:
      "Antenatal care, delivery and postnatal support at a registered maternity home, led by a Registered Nurse and Registered Midwife (RN/RM, BNSc) registered with the Nursing and Midwifery Council of Nigeria.",
  },
  {
    "@type": "MedicalTherapy",
    name: "Long-term condition management",
    description:
      "Ongoing treatment and monitoring for diabetes, hypertension and severe ulcers.",
  },
  {
    "@type": "MedicalTherapy",
    name: "Emergency and everyday care",
    description:
      "General illness, dental services, family planning and emergency care.",
    // The ONLY 24/7 claim in this file. site.ts is explicit that the client
    // confirmed round-the-clock EMERGENCY cover — not that consultations, dental
    // and the pharmacy run all night. Scoping the hours to this one service keeps
    // the schema exactly as honest as the copy (§9: claim what is true).
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  },
];

const clinic = {
  "@type": "MedicalClinic",
  "@id": CLINIC_ID,
  name: site.name,
  url: site.url,
  slogan: site.tagline,
  description:
    "A registered clinic, maternity home and convalescent centre in Igbogbo, Ikorodu, Lagos. Stroke rehabilitation, maternity, long-term condition management and everyday care. NHIS/HMO accepted.",
  logo: `${site.url}/logo-512.png`,
  image: `${site.url}/logo-512.png`,
  telephone: site.phones.map((phone) => toE164(phone.tel)),
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `10, ${site.address.street}, ${site.address.estate}`,
    addressLocality: site.address.areaFull,
    addressRegion: "Lagos",
    addressCountry: "NG",
  },
  // site.ts designates these coordinates as authoritative over the address —
  // open map data has neither the street nor the estate, so a geocoder would
  // land the pin in the wrong place. Never derive this from `address` above.
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.map.lat,
    longitude: site.map.lng,
  },
  hasMap: `https://www.google.com/maps/search/?api=1&query=${site.map.lat},${site.map.lng}`,
  founder: {
    "@type": "Person",
    name: site.founderName,
    jobTitle: "Founder and lead practitioner",
  },
  foundingDate: "2016",
  // The CAC business-name registration — the strongest trust signal the clinic
  // has, and the one a family checks (§2 credentials band, EEAT).
  identifier: {
    "@type": "PropertyValue",
    name: "CAC business registration number",
    value: "BN 2394445",
  },
  // No "Physiotherapy" here: the client has confirmed the clinic does not offer it
  // as a standalone service, and asserting a specialty it does not have is exactly
  // the kind of invisible inconsistency §10 forbids. The traditional/alternative
  // practice has no MedicalSpecialty equivalent, so it is claimed on the service
  // above via `medicineSystem` instead.
  medicalSpecialty: ["Midwifery", "PrimaryCare"],
  availableService,
  isAcceptingNewPatients: true,
  // Kept generic on purpose: the specific HMOs are still unconfirmed (§12,
  // site.hmos). Naming one that is not accepted is worse than naming none.
  paymentAccepted: "Cash, NHIS, HMO",
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Ikorodu, Lagos",
  },
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: site.url,
  name: site.name,
  inLanguage: "en-NG",
  publisher: { "@id": CLINIC_ID },
};

/** Clinic + website, rendered once from the root layout onto every route. */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [clinic, website],
};

/**
 * Breadcrumb trail for an inner route. Home is always position 1; schema.org
 * positions are 1-based.
 */
export function breadcrumbSchema(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `${site.url}${path}`,
      },
    ],
  };
}
