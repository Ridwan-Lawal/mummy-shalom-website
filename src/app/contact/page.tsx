// /contact — "Reach us" (§5).
//
// Copy source: contact-copy.md. Institutional voice throughout (§9).
//
// Colour (§4): the call block is the ONE place urgent red appears on this page.
// Everything else — the form's submit, the directions link — is primary teal.
//
// §5 requires the emergency path and the routine path to be visibly separate: the
// call block sits above the form, and the intro tells an urgent visitor in plain
// words not to use the form at all.
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Card, Container, Heading, Section } from "@/components/ui";
import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/layout/icons";
import { CareInquiryForm } from "@/components/forms/CareInquiryForm";
import { MapEmbed } from "@/components/MapEmbed";
import { site } from "@/lib/site";

// Decorative banner backdrop — the overlaid text carries the meaning, so the image
// takes an empty alt rather than describing a corridor nobody is being shown.
import bannerImage from "../../../public/07-facility-corridor.jpg";

export const metadata: Metadata = {
  title: `Reach us — ${site.name}`,
  description: `Call the clinic on either number, message us, or send a care inquiry. We are on ${site.address.street}, ${site.address.short}.`,
};

// Returns null unless site.whatsapp holds a real number, so a placeholder can never
// ship as a live link to a non-existent account (§11: "WhatsApp opens right number").
// The client has now confirmed the primary line, so this resolves.
function whatsappHref(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 10) return null;
  // Nigerian local format (0801…) to international (234801…).
  const intl = digits.startsWith("0") ? `234${digits.slice(1)}` : digits;
  return `https://wa.me/${intl}`;
}

const waHref = whatsappHref(site.whatsapp);

const contactStrip: { Icon: typeof MapPinIcon; title: string; detail: ReactNode }[] =
  [
    {
      Icon: MapPinIcon,
      title: "Visit us",
      detail: <span>{site.address.full}.</span>,
    },
    {
      Icon: PhoneIcon,
      title: "Call us",
      detail: (
        <span className="flex flex-col gap-1">
          {site.phones.map((phone) => (
            <a
              key={phone.tel}
              href={`tel:${phone.tel}`}
              className="tabular-nums hover:text-primary"
            >
              {phone.label}
            </a>
          ))}
        </span>
      ),
    },
    {
      Icon: WhatsAppIcon,
      title: "WhatsApp us",
      detail: waHref ? (
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          {site.whatsapp}
        </a>
      ) : (
        <span>{site.whatsapp}</span>
      ),
    },
    {
      Icon: MailIcon,
      title: "Email us",
      detail: (
        <a href={`mailto:${site.email}`} className="break-all hover:text-primary">
          {site.email}
        </a>
      ),
    },
  ];

export default function ContactPage() {
  return (
    <main>
      {/* ---- Page header banner. Teal overlay at 65% carries white text over the
           photo; no red anywhere here — red belongs to the call block only (§4). ---- */}
      <section className="relative h-[180px] overflow-hidden lg:h-[280px]">
        <Image
          src={bannerImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-primary/65" aria-hidden />
        <Container className="relative flex h-full flex-col justify-center">
          <Heading as="h1" className="text-white">
            Contact us
          </Heading>
          <nav aria-label="Breadcrumb" className="mt-2 text-sm text-white/85">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="font-medium text-white">
                Contact
              </li>
            </ol>
          </nav>
        </Container>
      </section>

      {/* ---- Contact strip. Hairline dividers between items (§6); teal icons and
           headings; details in foreground. No urgent red here (§4). ---- */}
      <section className="border-y border-hairline bg-surface">
        <Container className="py-8 sm:py-10">
          {/* Dividers are per-item rather than `divide-*`, because the divider that is
              wanted changes with the column count: horizontal when stacked, a column
              rule at sm (2x2, so item 2 loses its top border), and a single row of
              vertical rules at lg. */}
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
            {contactStrip.map(({ Icon, title, detail }) => (
              <li
                key={title}
                className={
                  "flex gap-3 border-hairline py-5 " +
                  "border-t first:border-t-0 " +
                  "sm:py-4 sm:[&:nth-child(2)]:border-t-0 " +
                  "sm:[&:nth-child(even)]:border-l sm:[&:nth-child(even)]:pl-6 " +
                  "lg:border-t-0 lg:border-l lg:py-0 lg:pl-6 " +
                  "lg:first:border-l-0 lg:first:pl-0"
                }
              >
                <Icon className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <div className="min-w-0">
                  <h2 className="font-medium text-primary">{title}</h2>
                  <div className="mt-1 text-sm text-foreground">{detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---- Page header. Kept short so the call block below stays reachable
           without scrolling on a small Android (§11). ---- */}
      {/* The call block shares this section with the header, rather than starting a
           new one: Section's default rhythm would push it down the page, and §11
           requires it reachable without scrolling on a small Android. */}
      {/* Padding and type sizes are trimmed below sm purely to keep the call block
          above the fold on a 360x640 Android (§11) — desktop keeps the page rhythm. */}
      <Section className="pt-6 sm:pt-14">
        <Container>
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            {/* Demoted from h1: the banner above now carries the page's only h1. */}
            <Heading as="h2">Reach us</Heading>
            <p className="text-foreground sm:text-lg">
              For anything urgent, call. Do not fill in the form and wait — pick up the
              phone or come straight in. For everything else, the form below reaches us
              and we will respond within {site.responseWindow}.
            </p>
          </div>

          {/* ---- 1. Urgent / call block — the only urgent red on this page (§4, §6:
               urgent colour, both numbers, tap-to-dial, phone icon). ---- */}
          <Card className="mt-6 max-w-3xl sm:mt-8">
            <Heading as="h2">Need us now?</Heading>
            <p className="mt-2 text-foreground sm:mt-3">
              Call either number, any time — we are reachable around the clock for
              emergencies. If it is an emergency, come
              straight to the clinic.
            </p>

            {/* Both numbers, large and tappable (§3: phones large, bold, unmissable). */}
            <div className="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row">
              {site.phones.map((phone) => (
                <Button
                  key={phone.tel}
                  variant="urgent"
                  href={`tel:${phone.tel}`}
                  className="min-h-14 flex-1 text-lg tabular-nums"
                >
                  <PhoneIcon className="h-5 w-5" />
                  {phone.label}
                </Button>
              ))}
            </div>

            <p className="mt-5 flex items-start gap-2.5 text-foreground">
              <MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <span>{site.address.full}.</span>
            </p>
          </Card>
        </Container>
      </Section>

      {/* ---- 2. Other ways to reach us ---- */}
      <Section className="border-t border-hairline">
        <Container>
          <div className="max-w-3xl space-y-5">
            <Heading as="h2">Other ways to reach us</Heading>

            <div className="space-y-2">
              <h3 className="font-medium text-foreground">WhatsApp</h3>
              <p className="text-foreground">
                Message us on{" "}
                {waHref ? (
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary tabular-nums hover:text-foreground"
                  >
                    {site.whatsapp}
                  </a>
                ) : (
                  site.whatsapp
                )}
                . Good for questions that are not urgent.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Email</h3>
              <p className="text-foreground">
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-primary break-all hover:text-foreground"
                >
                  {site.email}
                </a>
                . We check it during clinic hours.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---- 3 + 4. Find us and the care inquiry form, side by side.
           Map is first in DOM, so it leads on mobile where the columns stack.
           Section ground stays warm `background`; each column presents on white
           `surface` inside hairline borders — no grey panels, no shadows (§6).
           No urgent red in this section: red belongs to the call block only (§4). ---- */}
      <Section className="border-t border-hairline">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
            {/* Map column — ~57% at lg. */}
            <div className="space-y-4">
              <Heading as="h2">Find us</Heading>
              <p className="text-foreground">
                We are on {site.address.street} in {site.address.estate},{" "}
                {site.address.areaFull}, Ikorodu. {site.landmark}
              </p>

              <MapEmbed />

              <p className="flex items-start gap-2.5 text-foreground">
                <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>{site.hours}</span>
              </p>
            </div>

            {/* Form column. */}
            <div className="space-y-4">
              <Heading as="h2">Ask about care</Heading>
              <p className="text-foreground">
                Tell us a little about the situation and we will get back to you. If
                you are asking on behalf of a relative, that is fine — most people who
                contact us are.
              </p>
              <Card>
                <CareInquiryForm />
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
