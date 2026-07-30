// /about — "Our clinic & team" (§5).
//
// Copy source: about-copy.md. Institutional voice throughout — the clinic is the
// subject; the founder appears in the third person as founder & lead practitioner
// (§2 signature element 1, §9). Never first person (§10).
//
// Colour (§4): no urgent red anywhere on this page. Red is reserved for the call
// block, and "come and see the place" is not one — §10 lists urgent colour outside
// the call block as a never-ship item. Gold appears once, on the tagline line, which
// is the only place §4 permits it.
import type { Metadata } from "next";
import Image from "next/image";
import { Button, Card, Container, Frame, Heading, Section } from "@/components/ui";
import { CheckIcon } from "@/components/layout/icons";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

// Decorative banner backdrop — the overlaid heading carries the meaning, so it takes
// an empty alt rather than describing an entrance nobody is being shown.
import bannerImage from "../../../public/08-facility-entrance-CROPPED.jpg";

// Team photos — all three at the same size, so no one is a hero and the rest
// footnotes (§2, §5).
import founderPhoto from "../../../public/11-team-clinical-portrait.jpg";
import nursePhoto from "../../../public/02-team-nurse-portrait.jpg";
// NOTE — outstanding §8/§11 check, same as on Home: this is the uncropped ward frame,
// with an IV stand, tubing and bedding at the left edge.
// public/04-team-staff-duo-CROPPED.jpg is the sanctioned crop of the same scene.
import staffPhoto from "../../../public/10-team-staff-duo-ward.jpg";

import facilityEmergency from "../../../public/06-facility-emergency-room.jpg";
import facilityCorridor from "../../../public/07-facility-corridor.jpg";
import facilityEntrance from "../../../public/08-facility-entrance-CROPPED.jpg";

// WITHHELD PENDING CONSENT — do not uncomment without the client's confirmation.
// See the note above the maternity section below.
// import maternityPhoto from "../../../public/05-maternity-PENDING-CONSENT.jpg";

const primaryPhone = site.phones[0];

export const metadata: Metadata = {
  // The brand suffix comes from the title template in layout.tsx.
  title: "About our clinic",
  description:
    "A registered clinic, maternity home and convalescent centre in Igbogbo, Ikorodu, serving the community since 2016. Our team, our values and our facility.",
  alternates: { canonical: "/about" },
};

const values = [
  "Compassion and dignity for every patient",
  "Excellence and clinical professionalism",
  "Patient safety and superior quality care",
  "Integrity and accountability",
  "Community health advancement",
];

// PENDING CLIENT CONFIRMATION — these goals were drafted for review and have not yet
// been signed off. Confirm the wording with the client before launch, or remove the
// list; §11 keeps unverified claims off the site.
const goals = [
  "To give every patient recovering from stroke or long illness the time and care that recovery actually takes",
  "To make safe delivery and proper antenatal care available close to home in Igbogbo",
  "To keep long-term conditions well managed so families are not forced into emergencies",
  "To remain reachable — day or night — for the community we serve",
];

// Named institutions as clean text — never badges, never certificate photos (§2, §8).
const credentials = [
  "Registered Nurse & Registered Midwife (RN/RM, BNSc) — Nursing & Midwifery Council of Nigeria",
  "Nursing & Midwifery Council of Nigeria — Continuing Professional Development certified",
  "Lagos State Traditional Medicine Board — registered practitioner",
  "Association of General Private Nursing Practitioners, Lagos State Chapter",
  "CAC-registered business since 2016",
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
    alt: "A bright corridor inside the clinic, with doors leading off to treatment rooms and wards.",
    caption: "Treatment rooms and wards",
  },
  {
    src: facilityEntrance,
    alt: "The clinic entrance, showing the signage and the handwashing point beside the door.",
    caption: `The clinic entrance on ${site.address.street}`,
  },
];

export default function AboutPage() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema("About our clinic", "/about")} />
      {/* ---- Page header banner. Teal overlay at 70% carries white text over the
           photo; no red anywhere here — red belongs to the call block only (§4). ---- */}
      <section className="relative h-[200px] overflow-hidden lg:h-[320px]">
        <Image
          src={bannerImage}
          alt=""
          fill
          priority
          sizes="100vw"
          // Anchored at 30% rather than centre: a full-width band shows only ~17% of
          // this portrait source, and the centre slice lands on doors and bins. 30%
          // catches the window, the archway and the clinic signage instead.
          className="object-cover object-[50%_30%]"
        />
        <div className="absolute inset-0 bg-primary/70" aria-hidden />
        <Container className="relative flex h-full flex-col items-center justify-center text-center">
          <Heading as="h1" className="text-white">
            About us
          </Heading>
        </Container>
      </section>

      {/* ---- Page header ---- */}
      <Section className="pt-10 pb-12 sm:pt-14 sm:pb-16">
        <Container>
          <div className="max-w-3xl space-y-4">
            {/* Demoted from h1: the banner above now carries the page's only h1. */}
            <Heading as="h2">
              A registered clinic in {site.address.area}, looking after people through
              the slow part of getting better
            </Heading>
            <p className="text-lg text-foreground">
              {site.name} is a clinic, maternity home and convalescent centre on{" "}
              {site.address.street}, {site.address.short}. We have been registered and
              serving this community since 2016. We accept NHIS and HMO cover.
            </p>
          </div>
        </Container>
      </Section>

      {/* ---- 1. Our clinic ---- */}
      <Section className="border-t border-hairline">
        <Container>
          <div className="max-w-3xl space-y-4 text-foreground">
            <Heading as="h2">Our clinic</Heading>
            <p className="text-lg">
              Most clinics are built around the visit that lasts twenty minutes. We
              built ours around the recovery that lasts months.
            </p>
            <p>
              That means we have in-patient beds for people who cannot yet go home
              safely — patients recovering from a stroke, from surgery, or from a long
              illness. It means our nursing care and therapy is set up to continue
              week after week rather than end at discharge. And it means the
              people who work here know the patients by name, because the same patients
              come back, or stay.
            </p>
            <p>
              Alongside that, we do the ordinary work a neighbourhood clinic should do:
              deliver babies, treat illness, manage long-term conditions, and stay open
              for emergencies, day and night.
            </p>

            {/* CEPIC moved to the Vision / Mission / Values section below, so the
                values appear once on the page rather than twice. */}

            {/* Deliberately a plain label + one paragraph, NOT a formal
                Vision/Mission block — §10 forbids mission-statement text walls. */}
            <div className="!mt-8">
              <h3 className="font-medium text-foreground">
                What we are working towards
              </h3>
              <p className="mt-2 text-foreground">
                To be the clinic families in Ikorodu trust with the people they love —
                for safe deliveries, for recovery that takes time, and for the everyday
                care that keeps a community well.
              </p>
            </div>

            {/* Gold is permitted on this line and nowhere else (§4). */}
            <p className="!mt-8 text-lg font-medium italic text-gold">
              {site.tagline}.
            </p>
          </div>
        </Container>
      </Section>

      {/* ---- 2. Vision, mission, values and goals.
           Kept deliberately tight — short statements, plain lists, no decorative
           icon circles and no long paragraphs. §10 forbids mission-statement text
           walls, so this section states each thing once and stops. ---- */}
      <Section surface className="border-t border-hairline">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <h2 className="font-medium text-primary">Vision</h2>
              <p className="mt-2 text-foreground">
                To be a trusted and leading healthcare provider, delivering
                compassionate, high-quality and accessible care for safe motherhood and
                for every person who comes to us.
              </p>
            </Card>
            <Card>
              <h2 className="font-medium text-primary">Mission</h2>
              <p className="mt-2 text-foreground">
                To deliver patient-centred healthcare defined by clinical excellence and
                continuous improvement, while promoting preventive care and health
                education in our community.
              </p>
            </Card>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-12">
            <div>
              <h2 className="font-medium text-primary">Core values — CEPIC</h2>
              <ul className="mt-3 space-y-2">
                {values.map((value) => (
                  <li key={value} className="flex items-start gap-2.5 text-foreground">
                    <CheckIcon className="mt-1.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* GOALS — PENDING CLIENT CONFIRMATION.
                These were drafted for review and have not been signed off. Confirm the
                wording with the client before launch, or drop the list; §11 keeps
                unverified claims off the site. */}
            <div>
              <h2 className="font-medium text-primary">Our goals</h2>
              <ul className="mt-3 space-y-2">
                {goals.map((goal) => (
                  <li key={goal} className="flex items-start gap-2.5 text-foreground">
                    <CheckIcon className="mt-1.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- 3. Our team — equal photo sizes and equal columns, so the founder is
           the lead practitioner rather than a hero with footnotes (§2, §5). ---- */}
      <Section className="border-t border-hairline">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Heading as="h2">Our team</Heading>
            <p className="text-foreground">
              Care here is delivered by qualified nursing and midwifery staff. The
              clinic is led by its founder and lead practitioner, whose qualifications
              underpin the care the whole team provides.
            </p>
          </div>

          {/* Two cards only: the founder is the one person named individually; the
              nursing staff are presented collectively, with no individual names.
              The staff card spans two columns so its pair of photos render at the
              same width as the founder's single one — all three frames stay
              comparable in weight, so this reads as a team rather than a hero plus
              footnotes (§2, §5). Vertical gap is the larger of the two because that
              is the axis the cards stack on below lg. */}
          <ul className="mt-10 grid gap-x-10 gap-y-14 lg:grid-cols-3">
            {/* Founder — named, with her qualifications in the band below. */}
            <li className="space-y-3">
              <Frame
                src={founderPhoto}
                alt="The clinic's founder and lead practitioner in scrubs, wearing a stethoscope and staff ID."
                ratio="4/5"
                mobileRatio="1/1"
                align="top"
                sizes="(min-width: 1024px) 22rem, 100vw"
              />
              <div>
                <h3 className="font-medium text-foreground">{site.founderName}</h3>
                <p className="text-sm text-primary">Founder &amp; Lead Practitioner</p>
              </div>
              <p className="text-foreground">
                A Registered Nurse and Registered Midwife (RN/RM, BNSc) with the
                Nursing and Midwifery Council of Nigeria, and a practitioner
                registered with the Lagos State Traditional Medicine Board. She leads
                our maternity service and is in charge of antenatal and postnatal
                care. She founded the clinic in 2016 and continues to practise here.
              </p>
            </li>

            {/* Nursing staff — collective. Two photos rather than one, so the card
                shows staff plural instead of resting on a single portrait that would
                read as an unnamed individual standing in for the whole team. */}
            <li className="space-y-3 lg:col-span-2">
              <div className="grid grid-cols-2 gap-5">
                <Frame
                  src={nursePhoto}
                  alt="A member of the clinic's nursing team in navy scrubs, wearing a stethoscope."
                  ratio="4/5"
                  mobileRatio="1/1"
                  align="top"
                  sizes="(min-width: 1024px) 22rem, 45vw"
                />
                <Frame
                  src={staffPhoto}
                  alt="Two of the clinic's nursing staff on the ward."
                  ratio="4/5"
                  mobileRatio="1/1"
                  align="top"
                  sizes="(min-width: 1024px) 22rem, 45vw"
                />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Our nursing staff</h3>
                <p className="text-sm text-primary">Nursing &amp; in-patient care</p>
              </div>
              <p className="max-w-2xl text-foreground">
                Our nurses handle the daily work that recovery actually depends on:
                medication, monitoring, therapy sessions, and the hourly attention
                that in-patient care requires.
              </p>
            </li>
          </ul>

          {/* Credentials band: named institutions as clean text (§2, §6). Kept out of
              the founder's column so the three team cells stay comparable in weight. */}
          <Card className="mt-10 max-w-3xl">
            <h3 className="font-medium text-foreground">
              {site.founderName} — qualifications
            </h3>
            <ul className="mt-3 space-y-2">
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
            <p className="mt-4 text-sm italic text-muted">
              Certificates are available for inspection at the clinic.
            </p>
          </Card>
        </Container>
      </Section>

      {/* ---- 3. Maternity care ----
           MATERNITY PHOTO — WITHHELD PENDING CONSENT (§8, §10, §11).

           public/05-maternity-PENDING-CONSENT.jpg shows an identifiable mother and
           newborn. §8: "ONLY with the mother's explicit consent, confirmed via the
           client. If consent: centerpiece... If not: do not use, no exceptions."
           §10 lists identifiable patients without consent as a never-ship item, and
           §11 gates launch on that confirmation.

           Commented out rather than omitted so the slot is ready. When the client
           confirms consent, uncomment the import at the top of this file and render:

             <Frame
               src={maternityPhoto}
               alt="A mother and her newborn at the clinic entrance."
               ratio="4/5"
               mobileRatio="1/1"
               sizes="(min-width: 768px) 20rem, 100vw"
             />
             <figcaption>Caption pending consent.</figcaption>
      ---- */}
      <Section surface className="border-t border-hairline">
        <Container>
          <div className="max-w-3xl space-y-4">
            <Heading as="h2">Maternity care</Heading>
            <p className="text-foreground">
              We are a registered maternity home, and antenatal, delivery and
              postnatal care are led by a Registered Nurse and Registered Midwife
              (RN/RM, BNSc) registered with the Nursing and Midwifery Council of
              Nigeria. A maternity home should be led by a registered midwife —
              ours is. Mothers who come to us for antenatal care are looked after by
              staff who know them by the time labour comes, rather than meeting them
              for the first time that night.
            </p>
          </div>
        </Container>
      </Section>

      {/* ---- 4. Our facility ---- */}
      <Section className="border-t border-hairline">
        <Container>
          <div className="max-w-3xl space-y-4 text-foreground">
            <Heading as="h2">Our facility</Heading>
            <p>
              We are a small clinic, and we would rather you saw it honestly than found
              it different from the photographs.
            </p>
            <p>
              On site we have an emergency room, consulting and treatment rooms,
              in-patient beds for convalescent patients, and a pharmacy where
              prescriptions are filled on the premises.
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
                  sizes="(min-width: 640px) 22rem, 100vw"
                />
                <p className="text-sm text-muted">{photo.caption}</p>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-3xl text-foreground">{site.address.full}.</p>
        </Container>
      </Section>

      {/* ---- Closing. Replaces the shared ContactCTA on this route (suppressed in
           ContactCTA.tsx). Deliberately NOT the urgent variant: this is an invitation
           to visit, not the emergency call block (§4, §10). ---- */}
      <Section surface className="border-t border-hairline">
        <Container>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-2">
              <Heading as="h2">Come and see the place</Heading>
              <p className="text-foreground">
                Families deciding on care for someone they love usually want to visit
                before they commit. Call us and arrange a time — we would rather you
                came and looked.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={`tel:${primaryPhone.tel}`}>
                Call {primaryPhone.label}
              </Button>
              <Button variant="ghost" href="/contact">
                Ask about care
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
