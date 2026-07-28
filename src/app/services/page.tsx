// /services — "What we care for (in depth)" (§5).
//
// Copy source: services-copy.md. Institutional voice throughout — "we / our clinic",
// never "I" (§9). Language rule (§9, §10): management, care, rehabilitation only;
// never promise recovery from a long-term condition. Section 4's "What we do not
// promise" enforces that in the copy itself.
//
// Ground: every service section stays on `background` and is separated by a hairline,
// rather than alternating with `surface`. The callouts are white Cards, and a white
// card on a white band would disappear.
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { Button, Card, Container, Frame, Heading, Section } from "@/components/ui";
import {
  ActivityIcon,
  ChartIcon,
  CheckIcon,
  PhoneIcon,
} from "@/components/layout/icons";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

// Photos only where one honestly matches the service (§8 — no decorative filler).
// Stroke rehabilitation and long-term condition management stay text-only; they get an
// icon accent and a lead paragraph for rhythm instead.
import corridorPhoto from "../../../public/07-facility-corridor.jpg";
import emergencyPhoto from "../../../public/06-facility-emergency-room.jpg";

// WITHHELD PENDING CONSENT — do not uncomment without the client's confirmation.
// See the note above the maternity section below.
// import maternityPhoto from "../../../public/05-maternity-PENDING-CONSENT.jpg";

const primaryPhone = site.phones[0];

export const metadata: Metadata = {
  title: "What we care for — Mummy Shalom Medical Services",
  description:
    "Stroke rehabilitation, convalescent care, maternity and safe delivery, long-term condition management, and everyday and emergency care in Igbogbo, Ikorodu.",
};

/** Practical aside closing a service section — "What to bring", "When to come". */
function Callout({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Card className="mt-6">
      <p className="font-medium text-foreground">{label}</p>
      <p className="mt-1 text-foreground">{children}</p>
    </Card>
  );
}

/** Bold label, then prose — the shape sections 4 and 6 are written in. */
function Term({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="font-medium text-foreground">{label}</h3>
      <p className="mt-1 text-foreground">{children}</p>
    </div>
  );
}

/**
 * One service band. Hairline-separated, anchored so Home's cards can deep-link.
 *
 * `image` is optional and deliberately so: a section only gets a photo when a real one
 * matches what it describes (§8). `icon` marks the sections that have no honest photo,
 * so they still carry a visual beat.
 */
function ServiceSection({
  id,
  title,
  icon: Icon,
  image,
  children,
}: {
  id: string;
  title: string;
  icon?: (props: { className?: string }) => ReactNode;
  image?: { src: StaticImageData; alt: string; caption: string };
  children: ReactNode;
}) {
  return (
    <Section id={id} className="border-t border-hairline">
      <Container>
        <div
          className={cn(
            image && "grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12",
          )}
        >
          <div className="max-w-3xl">
            {Icon ? <Icon className="mb-3 h-7 w-7 text-primary" /> : null}
            <Heading as="h2">{title}</Heading>
            <div className="mt-5 space-y-4 text-foreground">{children}</div>
          </div>

          {image ? (
            <figure className="space-y-2.5 lg:pt-2">
              <Frame
                src={image.src}
                alt={image.alt}
                ratio="3/4"
                mobileRatio="4/3"
                sizes="(min-width: 1024px) 18rem, 100vw"
              />
              <figcaption className="text-sm text-muted">
                {image.caption}
              </figcaption>
            </figure>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

export default function ServicesPage() {
  return (
    <main>
      {/* ---- Page header banner. No reception photo exists in the asset set — §8
           excludes the waiting-area shots — so this uses the emergency room, the one
           clinical space not already carrying a banner elsewhere. No red here (§4). ---- */}
      <section className="relative h-[200px] overflow-hidden lg:h-[320px]">
        <Image
          src={emergencyPhoto}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-primary/70" aria-hidden />
        <Container className="relative flex h-full flex-col items-center justify-center text-center">
          <Heading as="h1" className="text-white">
            What we care for
          </Heading>
        </Container>
      </section>

      {/* ---- Page header ---- */}
      <Section className="pt-10 pb-12 sm:pt-14 sm:pb-16">
        <Container>
          <div className="max-w-3xl space-y-4">
            {/* Demoted from h1: the banner above now carries the page's only h1. */}
            <Heading as="h2">
              Care for recovery, for pregnancy, and for everyday illness
            </Heading>
            <p className="text-lg text-foreground">
              We are a clinic, maternity home and convalescent centre in{" "}
              {site.address.short}. If your situation isn&rsquo;t described below, call
              and ask — we will tell you honestly whether we are the right place for it.
            </p>
          </div>
        </Container>
      </Section>

      {/* ---- 1 ---- */}
      <ServiceSection
        id="stroke-rehabilitation"
        title="Stroke rehabilitation & physiotherapy"
        icon={ActivityIcon}
      >
        <p className="text-lg">
          Recovery after a stroke continues long after the hospital has done its part.
          Patients are often discharged still unable to walk unaided or speak clearly.
        </p>
        <p>
          That stretch is what we do: physiotherapy and daily nursing care — relearning
          movement, rebuilding strength and balance, and managing medication alongside
          it. Patients can stay with us as in-patients, or come in for regular sessions
          while living at home. We will advise which is realistic.
        </p>
        <Callout label="What to bring">
          The hospital discharge summary and any current medication list.
        </Callout>
      </ServiceSection>

      {/* ---- 2 ---- */}
      <ServiceSection
        id="convalescent-care"
        title="Convalescent & long-term care"
        image={{
          src: corridorPhoto,
          alt: "A bright corridor inside the clinic leading to the in-patient wards.",
          caption: "The corridor to our in-patient wards.",
        }}
      >
        <p className="text-lg">
          Most families meet the same gap: the hospital says the patient is stable
          enough to leave, but home is not yet a safe place for them to be.
        </p>
        <p>
          Our convalescent home exists for that gap — nursing supervision, help with
          daily living, medication management and monitoring, for as long as recovery
          takes. Families visit, the patient is looked after around the clock, and when
          they are ready to go home, they go home.
        </p>
        <Callout label="Come and see it first.">
          Most families want to look at the place before deciding. Call and arrange a
          visit.
        </Callout>
      </ServiceSection>

      {/* ---- 3 ----
           MATERNITY PHOTO — WITHHELD PENDING CONSENT (§8, §10, §11).

           public/05-maternity-PENDING-CONSENT.jpg shows an identifiable mother and
           newborn. §8: "ONLY with the mother's explicit consent, confirmed via the
           client. If consent: centerpiece... If not: do not use, no exceptions."
           §10 lists identifiable patients without consent as a never-ship item, and
           §11 gates launch on that confirmation.

           It is commented out rather than omitted so the slot is ready. When the
           client confirms consent, uncomment the import at the top of this file AND
           add this prop to the section below:

             image={{
               src: maternityPhoto,
               alt: "A mother and her newborn at the clinic entrance.",
               caption: "A delivery at the clinic.",
             }}
      ---- */}
      <ServiceSection id="maternity" title="Maternity & safe delivery">
        <p>
          We are a registered maternity home, and our maternity care is led by a
          certified Community Birth Attendant trained through the Lagos State College
          of Health Technology.
        </p>
        <div className="space-y-4 pt-1">
          <Term label="Antenatal care">
            Regular checks through pregnancy — the mother&rsquo;s blood pressure and
            health, the baby&rsquo;s growth, and problems caught early.
          </Term>
          <Term label="Delivery">
            We deliver at the clinic, with staff who know the mother from her antenatal
            visits rather than meeting her for the first time in labour.
          </Term>
          <Term label="Postnatal care">
            Support for mother and baby in the weeks after birth.
          </Term>
          <Term label="Family planning">
            Private, unhurried consultation about the options, with no pressure toward
            any particular choice.
          </Term>
        </div>
        <Callout label="When to come">
          As early in the pregnancy as you can. The earlier antenatal care starts, the
          more we can do.
        </Callout>
      </ServiceSection>

      {/* ---- 4 ---- */}
      <ServiceSection
        id="long-term-conditions"
        title="Long-term condition management"
        icon={ChartIcon}
      >
        <p className="text-lg">
          Diabetes, high blood pressure, arthritis and severe ulcers are managed rather
          than fixed once — regular monitoring, medication adjusted as the body
          changes, and someone who knows the patient&rsquo;s history well enough to
          notice when something shifts.
        </p>
        {/* Icon markers rather than disc bullets — this section carries no photo, so
            the list does the visual work (§8: no decorative filler). */}
        <ul className="space-y-2.5">
          {[
            <>
              <span className="font-medium">Diabetes management</span> — monitoring,
              medication, and practical guidance on living with the condition day to
              day.
            </>,
            <>
              <span className="font-medium">Hypertension management</span> — regular
              blood pressure checks and treatment adjusted over time rather than set
              once and forgotten.
            </>,
            <>
              <span className="font-medium">
                Arthritis, osteoarthritis, osteoporosis and rheumatoid arthritis
              </span>{" "}
              — pain management, physiotherapy, and support for keeping mobility for
              as long as possible.
            </>,
            <>
              <span className="font-medium">Severe ulcer management</span> — treatment
              and ongoing monitoring.
            </>,
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckIcon className="mt-1.5 h-4 w-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          We also offer alternative and traditional therapy alongside conventional
          treatment, registered with the Lagos State Traditional Medicine Board.
          Nothing is given without explanation.
        </p>
        <Callout label="What we do not promise:">
          These are long-term conditions, and we will not tell you they can be made to
          disappear. What good management does is keep a condition under control and
          daily life workable.
        </Callout>
      </ServiceSection>

      {/* ---- 5 ---- */}
      <ServiceSection
        id="everyday-emergency"
        title="Everyday & emergency care"
        image={{
          src: emergencyPhoto,
          alt: "The clinic's emergency room, with a trolley, blood-pressure monitor and treatment protocol on the wall.",
          caption: "Our emergency room.",
        }}
      >
        <div className="space-y-4">
          <Term label="General illness">
            Fevers, infections, pains, and the ordinary things that need seeing to. No
            appointment needed — come in.
          </Term>
          <Term label="Dental services">Available at the clinic.</Term>
          <Term label="24-hour emergency care">
            For anything urgent, call us or come straight in. Do not fill in a form and
            wait for a reply. The number is{" "}
            <a
              href={`tel:${primaryPhone.tel}`}
              className="font-medium text-primary tabular-nums hover:text-foreground"
            >
              {primaryPhone.label}
            </a>{" "}
            and someone is here.
          </Term>
          <Term label="On-site pharmacy">
            Prescriptions are filled on the premises, so you are not sent elsewhere to
            find medication.
          </Term>
        </div>
      </ServiceSection>

      {/* ---- Closing section. Replaces the shared ContactCTA on this route
           (suppressed in ContactCTA.tsx) so the page ends with one band. ---- */}
      <Section surface className="border-t border-hairline">
        <Container>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl space-y-2">
              <Heading as="h2">Not sure whether we are the right place?</Heading>
              <p className="text-foreground">
                Call and describe the situation. We will tell you what we can do and
                what we cannot, and if somewhere else is better suited to the case, we
                will say so. NHIS and HMO cover is accepted here.
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
