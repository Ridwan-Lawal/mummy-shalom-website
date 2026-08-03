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
//
// ONE EXCEPTION: the "Shalom Complementary, Alternative & Homeopathic Therapy" band
// near the bottom is `surface` on purpose. The client asked for that practice to read
// as separate from the clinic's medical services, so it breaks the rhythm deliberately.
// It carries no Card, so nothing disappears. Do not normalise it back to `background`.
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
import { JsonLd } from "@/components/JsonLd";
import { cn } from "@/lib/cn";
import { breadcrumbSchema } from "@/lib/schema";
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

// What patients bring to the separate complementary/traditional practice — client-
// supplied copy, verbatim. These are presentations people ARRIVE with, not outcomes
// the practice claims: do not reword them, do not add timeframes or success rates,
// and do not mark them with check icons (a tick reads as "we fix this"). The closing
// paragraph is required and must stay — it is what keeps the block honest (§9, §10).
const therapyConcerns = [
  "Stroke — rehabilitation and recovery care",
  "Osteoarthritis, osteoporosis and rheumatoid arthritis",
  "Severe hypertension",
  "Diabetes mellitus",
  "Fibroids",
  "Fertility concerns, including low sperm count",
  "Hormonal imbalance and hyperprolactinaemia",
  "Weight management",
  "Ear wax removal",
  "Traditional and spiritual remedies",
];

export const metadata: Metadata = {
  // The brand suffix comes from the title template in layout.tsx.
  title: "What we care for",
  description:
    "Stroke rehabilitation, convalescent care, maternity and safe delivery, long-term condition management, alternative and traditional medicine, and everyday and emergency care in Igbogbo, Ikorodu.",
  alternates: { canonical: "/services" },
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

/**
 * Bold label, then prose — the shape the grouped sections are written in.
 *
 * `id` is optional and exists so a service that lost its own section in the
 * regrouping can keep its anchor: Home and any existing link to
 * #stroke-rehabilitation still land on the right paragraph. `scroll-mt` clears
 * the sticky header so the heading isn't hidden underneath it.
 */
function Term({
  id,
  label,
  children,
}: {
  id?: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div id={id} className={cn(id && "scroll-mt-32")}>
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
      <JsonLd data={breadcrumbSchema("What we care for", "/services")} />
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

      {/* ---- 1 ----
           Per the client, stroke rehabilitation and the arthritis group are treated
           through the founder's registered alternative and homeopathic practice, so
           they are grouped here as one named service rather than listed as separate
           ones. Physiotherapy is NOT a standalone service — see the SERVICE RULE in
           CLAUDE.md §5. The stroke Term keeps the #stroke-rehabilitation anchor so
           existing links still resolve. Language rule holds: management, care,
           relief and rehabilitation only. ---- */}
      <ServiceSection
        id="alternative-traditional-medicine"
        title="Alternative & traditional medicine"
        icon={ActivityIcon}
      >
        <p className="text-lg">
          Our founder and lead practitioner is a practitioner registered with the
          Lagos State Traditional Medicine Board. Two of the things families most
          often come to us for are treated through this practice, alongside
          conventional treatment where that is what a patient needs.
        </p>
        <div className="space-y-4 pt-1">
          <Term id="stroke-rehabilitation" label="Stroke rehabilitation">
            Recovery after a stroke continues long after the hospital has done its
            part — patients are often discharged still unable to walk unaided or speak
            clearly. That stretch is what we do: daily nursing care and therapy
            through this practice, relearning movement, rebuilding strength and
            balance, and managing medication alongside it. Patients can stay with us
            as in-patients, or come in for regular sessions while living at home. We
            will advise which is realistic.
          </Term>
          <Term label="Arthritis, osteoarthritis, osteoporosis and rheumatoid arthritis">
            Treated through our alternative and homeopathic remedies — pain relief,
            and support for keeping mobility for as long as possible. These are
            long-term conditions: the work is management and relief, month after
            month, not a one-off treatment.
          </Term>
        </div>
        <p>Nothing is given without explanation, and you are free to ask what any remedy is and why it has been chosen.</p>
        <Callout label="What to bring">
          For a stroke patient: the hospital discharge summary and any current
          medication list.
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
          We are a registered maternity home, and antenatal, delivery and postnatal
          care are led by a Registered Nurse and Registered Midwife (RN/RM, BNSc)
          registered with the Nursing and Midwifery Council of Nigeria. A maternity
          home should be led by a registered midwife — ours is.
        </p>
        <p>
          We also work with doctors across the relevant areas, including a
          gynaecologist.
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
          Diabetes, high blood pressure and severe ulcers are managed rather than fixed
          once — regular monitoring, medication adjusted as the body changes, and
          someone who knows the patient&rsquo;s history well enough to notice when
          something shifts.
        </p>
        {/* OPEN QUESTION (§12 convention): the client has confirmed that stroke
            rehabilitation and the arthritis group are treated through the alternative
            practice, but has not yet said which practice treats these three. It
            renders literally rather than being guessed — an open question stays
            visible. Remove this line once she answers. */}

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

      {/* ---- 6. The separate practice (client request) ----
           Deliberately NOT a ServiceSection: the client asked for this to read as a
           distinct practice rather than another item in the clinic's service list, so
           it breaks the page's rhythm on purpose — `surface` ground plus a hairline
           rule top and bottom. That is the one sanctioned exception to the
           all-sections-on-`background` rule noted at the top of this file; it is safe
           here because this block carries no white Card to disappear against.
           No urgent red (§4) — red belongs to the call block alone. ---- */}
      <Section
        id="complementary-therapy"
        surface
        className="scroll-mt-32 border-y border-hairline"
      >
        <Container>
          <div className="max-w-3xl">
            <Heading as="h2">
              Shalom Complementary, Alternative &amp; Homeopathic Therapy
            </Heading>
            {/* Subheading stays muted and small — it is the one line here that is
                meant to recede. Everything below it is foreground (§3). */}
            <p className="mt-3 text-sm text-muted">
              A separate practice at {site.name}, run by a practitioner registered
              with the Lagos State Traditional Medicine Board.
            </p>

            <p className="mt-6 text-foreground">
              Alongside the clinic&rsquo;s medical services, we offer complementary
              and traditional therapy. Patients come to this practice with:
            </p>

            {/* Hairline-ruled cells: the 1px gaps let the `hairline` token show
                through as the rules, so the list is bordered and flat with no
                shadow (§6) and no bullet glyph implying an outcome. */}
            <ul className="mt-6 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2">
              {therapyConcerns.map((concern) => (
                <li key={concern} className="bg-surface px-4 py-3 text-foreground">
                  {concern}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-foreground">
              Come and talk to us about your situation. We will explain what this
              practice can and cannot do for it, and where conventional medical care
              is the better route we will say so.
            </p>
          </div>
        </Container>
      </Section>

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
