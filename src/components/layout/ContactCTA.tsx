// Contact CTA band above the footer (§5): no page is a dead end. Its own viewport,
// so the dual-action module (urgent "Call us" + primary "Ask about care") is allowed.
//
// Suppressed on routes that end with their own closing band (see OWN_CLOSING_BAND).
// Those pages carry page-specific closing copy; rendering this as well would stack two
// near-identical bands and put a third urgent red on the page (§4).
"use client";

import { usePathname } from "next/navigation";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { site } from "@/lib/site";
import { PhoneIcon } from "./icons";

const primaryTel = site.phones[0].tel;

// Routes whose page already ends with a closing CTA band of its own.
// "/contact" is included for a different reason than the others: this band's whole
// job is to send people to /contact, so on /contact it is a self-link dead end.
const OWN_CLOSING_BAND = new Set(["/", "/services", "/about", "/contact"]);

export function ContactCTA() {
  const pathname = usePathname();
  if (OWN_CLOSING_BAND.has(pathname)) return null;

  return (
    <Section surface className="border-t border-hairline">
      <Container>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Eyebrow>{site.tagline}</Eyebrow>
            <Heading as="h2">Need care or advice?</Heading>
            <p className="max-w-xl text-muted">
              Speak with us about a loved one&rsquo;s recovery, a delivery, or everyday
              care. Call now, or send a care inquiry and we&rsquo;ll respond.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/contact">Ask about care</Button>
            <Button variant="urgent" href={`tel:${primaryTel}`}>
              <PhoneIcon className="h-4 w-4" />
              Call us
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
