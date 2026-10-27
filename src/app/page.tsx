// Home (§5 "/") — the whole story, condensed. A visitor who never clicks anything
// must still be convinced by this page alone.
//
// Copy source: homepage-copy.md (institutional voice — "we / our clinic", never "I";
// the founder appears in the third person as lead practitioner, §9).
// Language rule (§9, §10): describe services as management, care or rehabilitation
// only. Never promise recovery from a chronic condition. (Kept free of the forbidden
// word so the §11 grep stays clean, comments included.)
// Body copy is foreground at full contrast — §3 targets older and stressed readers,
// so the substantive sentences must not be the lightest thing on the page.
import Link from "next/link";
import {
  Button,
  Card,
  Container,
  Eyebrow,
  Frame,
  Heading,
  Section,
} from "@/components/ui";
import {
  ArrowRightIcon,
  BedIcon,
  CheckIcon,
  ClockIcon,
  PharmacyIcon,
  PhoneIcon,
  ShieldIcon,
} from "@/components/layout/icons";
import { site } from "@/lib/site";

// Statically imported so Next reads the intrinsic dimensions at build time
// (same pattern as the logo in SiteHeader/SiteFooter). Real photos only (§8).
import heroPortrait from "../../public/01-hero-mummy-shalom-desk.jpg";
import nursePortrait from "../../public/02-team-nurse-portrait.jpg";
// NOTE — outstanding §8/§11 check. This is the uncropped ward frame: an IV stand,
// tubing, bed frame and bedding are visible at the left edge. §8 disqualifies "IV
// lines, patient clothing, or partial views" and §11 gates launch on the staff-duo
// crop fully excluding the patient area. 04-team-staff-duo-CROPPED.jpg is the
// sanctioned crop of this same scene if this needs to be swapped before launch.
import staffDuo from "../../public/10-team-staff-duo-ward.jpg";
import facilityEmergency from "../../public/06-facility-emergency-room.jpg";
import facilityCorridor from "../../public/07-facility-corridor.jpg";
import facilityEntrance from "../../public/08-facility-entrance-CROPPED.jpg";
import clinicEntrance from "../../public/entrance.jpg";
import clinicReception from "../../public/reception.jpg";

const primaryPhone = site.phones[0];

const services = [
  {
    // Client correction: stroke rehabilitation and the arthritis group are treated
    // through the founder's registered alternative/homeopathic practice, so they are
    // grouped under it rather than listed separately. Physiotherapy is NOT a
    // standalone service here — see the SERVICE RULE in CLAUDE.md §5.
    // Stroke rehabilitation leads the sentence deliberately: it is the reason most
    // families arrive (§1), so the words must stay findable inside the group.
    name: "Alternative & traditional medicine",
    line: "Our founder and lead practitioner is a practitioner registered with the Lagos State Traditional Medicine Board. Stroke rehabilitation, and the management of arthritis, osteoarthritis, osteoporosis and rheumatoid arthritis, are treated through this practice — alongside conventional treatment, and never without explanation.",
  },
  {
    name: "Maternity & safe delivery",
    line: "Antenatal care through pregnancy, delivery, and postnatal support afterwards. Our clinic is a registered maternity home, and antenatal, delivery and postnatal care are led by a Registered Nurse and Registered Midwife (RN/RM, BNSc) registered with the Nursing and Midwifery Council of Nigeria.",
  },
  {
    // The arthritis group moved to the practice above. Which practice treats these
    // three is still open with the client, so the question renders literally rather
    // than being guessed — same convention as the placeholders in src/lib/site.ts.
    name: "Long-term condition management",
    line: "Diabetes, high blood pressure and severe ulcers are managed, not fixed once. We provide the ongoing treatment, monitoring and adjustment that keeps a condition under control and daily life workable. [CONFIRM: conventional or alternative practice?]",
  },
  {
    name: "Everyday & emergency care",
    line: "General illness, dental services, family planning, and 24-hour emergency care. For anything urgent, call us or come straight in — do not fill in a form.",
  },
];

// What the clinic HAS on site.
const facilities = [
  {
    Icon: PharmacyIcon,
    label: "On-site pharmacy",
    line: "Prescriptions filled on the premises, so you are not sent out to find medication.",
  },
  {
    Icon: ClockIcon,
    label: "24-hour emergency care",
    line: "Someone is here when it cannot wait until morning.",
  },
  {
    Icon: BedIcon,
    label: "In-patient convalescent care",
    line: "Beds for patients whose recovery needs weeks or months, not hours.",
  },
  {
    Icon: ShieldIcon,
    label: "NHIS / HMO accepted",
    line: "So cover can be used here rather than paid out of pocket.",
  },
];

// Institution names as plain text — never badges, never certificate photos (§2, §8).
const credentials = [
  "Accredited by HEFAMAA (Health Facility Monitoring and Accreditation Agency)",
  "Registered Nurse & Registered Midwife (RN/RM, BNSc) — Nursing & Midwifery Council of Nigeria",
  "Lagos State Traditional Medicine Board — registered practitioner",
  "CAC-registered since 2016",
  "Works with doctors across the relevant areas, including a gynaecologist",
];

const facility = [
  {
    src: facilityEmergency,
    alt: "The clinic's emergency room, with a trolley, blood-pressure monitor and treatment protocol on the wall.",
    caption: "Our emergency room",
  },
  {
    src: facilityCorridor,
    alt: "A bright corridor inside the clinic, with doors leading off to treatment and consulting rooms.",
    caption: "Treatment and consulting rooms",
  },
  {
    src: facilityEntrance,
    alt: "The clinic entrance, showing the signage and the handwashing point beside the door.",
    caption: `The clinic entrance on ${site.address.street}`,
  },
];

export default function Home() {
  return (
    <main>
      {/* ---- 1. Hero (§5) — the dominant headline is the CAPABILITY, not the clinic
           name; the name is already in the nav and logo. Left-aligned; text before
           image so the call action stays above the fold on a small Android (§11). ---- */}
      <Section className="pt-10 pb-14 sm:pt-14 sm:pb-20">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
            {/* Order swaps below md: the call action sits above the intro paragraph so
                it stays visible without scrolling on a small Android (§11), and the
                urgent visitor taps in seconds (§1). Desktop keeps the written order. */}
            <div className="flex flex-col gap-5">
              {/* Gold is permitted here and nowhere else (§4). */}
              <p className="order-1 text-sm font-medium uppercase tracking-widest text-gold">
                {site.tagline}
              </p>
              <Heading as="h1" className="order-2">
                Rehabilitation, maternity and everyday care in Ikorodu
              </Heading>
              <p className="order-3 text-lg font-medium text-foreground">
                {site.name} · NHIS/HMO accepted
              </p>
              <p className="order-5 max-w-xl text-foreground md:order-4">
                We are a clinic and convalescent home in {site.address.short}.
                We look after people recovering from stroke and long illness,
                women through pregnancy and delivery, and families needing
                everyday medical care — including emergencies. Some patients
                stay with us through their recovery; others come in for
                treatment and go home the same day.
              </p>
              <div className="order-4 flex flex-col gap-3 sm:flex-row md:order-5 md:pt-1">
                {/* The one urgent element on this page (§4). */}
                <Button variant="urgent" href={`tel:${primaryPhone.tel}`}>
                  <PhoneIcon className="h-4 w-4" />
                  Call us
                </Button>
                <Button href="/contact">Ask about care</Button>
              </div>
              <p className="order-6 text-sm text-muted">
                Or call{" "}
                <a
                  href={`tel:${primaryPhone.tel}`}
                  className="font-medium text-primary tabular-nums hover:text-foreground"
                >
                  {primaryPhone.label}
                </a>{" "}
                — {site.address.short}.
              </p>
            </div>

            {/* Clinic composition, not a personal portrait (§9): staff at work leads,
                with the lead practitioner and the facility supporting it. Consistent
                hairline frames; one ratio per size tier; no shadows (§6).
                Mobile shows the primary only — two fewer image fetches on weak data
                (§1), and the Call button stays above the fold. */}
            {/* Capped below md so the composition doesn't run the full phone width. */}
            <div className="max-w-xs space-y-3 sm:max-w-sm md:max-w-md md:justify-self-end">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.6fr_1fr]">
                <Frame
                  src={clinicEntrance}
                  alt="Two of the clinic's nursing staff on the ward."
                  ratio="3/5"
                  mobileRatio="1/1"
                  align="top"
                  sizes="(min-width: 768px) 17rem, 90vw"
                  priority
                />
                {/* Supporting tier — both 3/4, hidden below md. */}
                <div className="hidden grid-rows-2 gap-3 md:grid">
                  <Frame
                    src={staffDuo}
                    alt="The clinic's founder and lead practitioner at her desk in a white coat, with the clinic's logo on the wall behind her."
                    ratio="3/4"
                    sizes="10rem"
                  />
                  <Frame
                    src={clinicReception}
                    alt="The clinic's emergency room, with a trolley, blood-pressure monitor and treatment protocol on the wall."
                    ratio="3/4"
                    sizes="10rem"
                  />
                </div>
              </div>
              <p className="text-sm text-muted">
                Our clinic in {site.address.short}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- 2. What we care for (§5) ---- */}
      <Section surface className="border-t border-hairline">
        <Container>
          <div className="max-w-2xl space-y-3">
            <Eyebrow>What we care for</Eyebrow>
            <Heading as="h2">Care for the long road, and the everyday</Heading>
            <p className="text-foreground">
              Most people come to us for one of four reasons. If your situation
              isn&rsquo;t listed, call and ask — we will tell you honestly
              whether we are the right place for it.
            </p>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service.name}>
                <Link href="/services" className="group block h-full">
                  <Card className="flex h-full flex-col gap-2 transition-colors duration-150 group-hover:border-primary/40">
                    <h3 className="text-xl font-medium text-foreground">
                      {service.name}
                    </h3>
                    <p className="text-foreground">{service.line}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-medium text-primary">
                      See what we care for
                      <ArrowRightIcon className="h-4 w-4" />
                    </span>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>

          {/* The clinic's separate complementary/traditional practice (client
              request). A single line rather than a fifth card, so it reads as
              adjacent to the four medical services rather than one of them.
              Deep-links to the band on /services. */}
          <p className="mt-8">
            <Link
              href="/services#complementary-therapy"
              className="inline-flex items-center gap-1.5 font-medium text-primary transition-colors duration-150 hover:text-foreground"
            >
              We also run a separate complementary and traditional therapy practice
              <ArrowRightIcon className="h-4 w-4 shrink-0" />
            </Link>
          </p>
        </Container>
      </Section>

      {/* ---- 3. Facilities band — what the clinic has on site. Calm ground with
           hairline rules, never a saturated panel (§4); no urgent red here (§6). ---- */}
      <Section className="border-y border-hairline">
        <Container>
          <h2 className="text-xl font-medium text-foreground">
            What we have on site
          </h2>
          <ul className="mt-8 grid divide-y divide-hairline md:grid-cols-4 md:divide-x md:divide-y-0">
            {facilities.map(({ Icon, label, line }) => (
              <li
                key={label}
                className="flex flex-col gap-2 py-6 first:pt-0 last:pb-0 md:px-6 md:py-0 md:first:pl-0 md:last:pr-0"
              >
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="font-medium text-foreground">{label}</h3>
                <p className="text-sm text-foreground">{line}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---- 4. Care you can trust (§5 item 3) — clinic-level credibility.
           Institutional voice (§9): the clinic is the speaker and the subject; the
           founder appears in the third person as lead practitioner. ---- */}
      <Section>
        <Container>
          <div className="grid items-start gap-10 md:grid-cols-[18rem_1fr] md:gap-12">
            <div className="max-w-[15rem] space-y-2.5 sm:max-w-xs md:max-w-none">
              <Frame
                src={nursePortrait}
                alt="A member of the clinic's nursing team in navy scrubs, wearing a stethoscope."
                ratio="4/5"
                mobileRatio="1/1"
                align="top"
                sizes="(min-width: 768px) 18rem, 15rem"
              />
              {/* Captioned as team, not as the founder. This is a different person from
                  the practitioner described alongside, and an uncaptioned pairing would
                  read as her portrait (§8: honest captions). Name pending client (§12). */}
              <p className="text-sm text-muted">
                A member of our nursing team.
              </p>
            </div>

            <div className="space-y-5">
              <Eyebrow>Care you can trust</Eyebrow>
              <Heading as="h2">
                A HEFAMAA-accredited clinic, run by qualified people
              </Heading>
              <div className="space-y-3 text-foreground">
                <p>
                  {site.name} has been registered and serving Ikorodu since
                  2016, as a clinic, maternity home and convalescent centre.
                  Care here is delivered by qualified nursing and midwifery
                  staff, and we accept NHIS and HMO cover.
                </p>
                <p>
                  Our clinic is led by {site.founderName}, its founder and lead
                  practitioner — a Registered Nurse and Registered Midwife
                  (RN/RM, BNSc) with the Nursing and Midwifery Council of
                  Nigeria, and a practitioner registered with the Lagos State
                  Traditional Medicine Board. She leads our maternity service
                  and is in charge of antenatal and postnatal care.
                </p>
              </div>

              <ul className="space-y-2 border-t border-hairline pt-5">
                {credentials.map((credential) => (
                  <li
                    key={credential}
                    className="flex items-start gap-2.5 text-foreground"
                  >
                    <CheckIcon className="mt-1.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{credential}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sm text-muted">
                Certificates are available for inspection at the clinic.
              </p>

              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 font-medium text-primary hover:text-foreground"
              >
                About our clinic
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- 5. Why families bring their people to us (§5) ---- */}
      <Section surface className="border-y border-hairline">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Heading as="h2">Why families bring their people to us</Heading>
            <p className="text-foreground">
              Families usually come to us at a difficult moment — after a
              hospital discharge, in the middle of a pregnancy, or when a
              long-term condition stops being manageable at home. What they need
              is somewhere close by that will take the situation seriously and
              stay with it.
            </p>
            <p className="text-foreground">
              That is what we do. We are a small clinic, which means the person
              you speak to knows the patient. We keep people for as long as
              their recovery takes rather than moving them on. And we are ten
              minutes from home rather than an afternoon in Lagos traffic.
            </p>
          </div>
        </Container>
      </Section>

      {/* ---- 6. Our clinic (§5 facility glimpse) — small and honest, never
           full-bleed (§8) ---- */}
      <Section>
        <Container>
          <div className="max-w-2xl space-y-3">
            <Eyebrow>The clinic</Eyebrow>
            <Heading as="h2">Our clinic in {site.address.area}</Heading>
            <p className="text-foreground">
              We are on {site.address.street} in {site.address.estate},{" "}
              {site.address.area}, with an emergency room, treatment rooms and
              in-patient beds on site.
            </p>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            {facility.map((photo) => (
              <li key={photo.caption} className="space-y-2.5">
                <Frame
                  src={photo.src}
                  alt={photo.alt}
                  ratio="3/4"
                  mobileRatio="4/3"
                  sizes="(min-width: 640px) 20rem, 100vw"
                />
                <p className="text-sm text-muted">{photo.caption}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---- 7. Closing CTA band. Replaces the shared ContactCTA on "/" (suppressed
           in ContactCTA.tsx) so the page ends with one band, not two. ---- */}
      <Section surface className="border-t border-hairline">
        <Container>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-2">
              <Heading as="h2">Not sure if we are the right place?</Heading>
              <p className="text-foreground">
                Call and describe the situation. We will tell you what we can do
                and what we cannot, and if somewhere else is better suited we
                will say so.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="urgent" href={`tel:${primaryPhone.tel}`}>
                <PhoneIcon className="h-4 w-4" />
                Call {primaryPhone.label}
              </Button>
              <Button href="/contact">Ask about care</Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
