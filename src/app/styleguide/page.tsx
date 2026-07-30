// Review page for UI primitives — labeled, not real page sections. Route: /styleguide
// TEMPORARY — delete before launch.
import type { Metadata } from "next";
import {
  Button,
  Card,
  Container,
  Eyebrow,
  Heading,
  Section,
} from "@/components/ui";
import type { ReactNode } from "react";

// Publicly routable until deleted — keep it out of the index (see /test for why
// both this and the robots.ts disallow are needed).
export const metadata: Metadata = {
  title: "UI primitives (internal)",
  robots: { index: false, follow: false },
};

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-3 border-t border-hairline pt-6">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        {label}
      </p>
      {children}
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-14">
      <Container>
        <header className="space-y-1 pb-4">
          <p className="font-mono text-xs uppercase tracking-widest text-urgent">
            temporary — delete before launch
          </p>
          <Heading as="h1">UI primitives</Heading>
          <p className="text-muted">
            Every primitive from <code className="font-mono">src/components/ui</code>,
            built to CLAUDE.md §4 (color) and §6 (component grammar).
          </p>
        </header>

        <div className="space-y-10">
          {/* Buttons */}
          <Row label="Button — variants">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">Ask about care</Button>
              <Button variant="ghost">View services</Button>
              <Button variant="urgent" href="tel:08161587676">
                Call 08161 587676
              </Button>
            </div>
            <p className="text-sm text-muted">
              <strong>primary</strong> (solid teal) for the main action ·{" "}
              <strong>ghost</strong> (outline) for secondary ·{" "}
              <strong>urgent</strong> (red) is used <strong>only</strong> for call
              actions, and here renders a real <code className="font-mono">tel:</code>{" "}
              link.
            </p>
          </Row>

          <Row label="Button — states (hover / focus / disabled)">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">Hover &amp; focus me</Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
            </div>
          </Row>

          {/* Eyebrow + Heading scale */}
          <Row label="Eyebrow + Heading (h1–h4)">
            <Eyebrow>We Care, God Heals</Eyebrow>
            <Heading as="h1">Rehabilitation &amp; everyday care</Heading>
            <Heading as="h2">Meet Mummy Shalom</Heading>
            <Heading as="h3">What we care for</Heading>
            <Heading as="h4">Maternity &amp; safe delivery</Heading>
          </Row>

          {/* Card */}
          <Row label="Card — white surface, 1px hairline, 8px radius, no shadow">
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <Heading as="h4">Stroke rehabilitation</Heading>
                <p className="mt-2 text-muted">
                  Nursing care and therapy through recovery, in-patient where needed.
                </p>
              </Card>
              <Card>
                <Eyebrow>NHIS / HMO accepted</Eyebrow>
                <Heading as="h4">Convalescent care</Heading>
                <p className="mt-2 text-muted">
                  Long-term recovery in a staffed, caring clinic.
                </p>
                <div className="mt-4">
                  <Button variant="ghost">Learn more</Button>
                </div>
              </Card>
            </div>
          </Row>

          {/* Container */}
          <Row label="Container — max-w-7xl, responsive padding (dashed = its bounds)">
            <div className="bg-primary/5">
              <Container>
                <div className="rounded-md border border-dashed border-primary/40 bg-surface p-4 text-sm text-muted">
                  This box sits inside a nested Container. The tinted band is
                  full-bleed; the Container constrains and pads its content.
                </div>
              </Container>
            </div>
          </Row>

          {/* Section */}
          <Row label="Section — vertical band (surface variant shown, bordered to reveal padding)">
            <div className="rounded-lg border border-hairline overflow-hidden">
              <Section surface className="!py-10">
                <Container>
                  <Eyebrow>Section</Eyebrow>
                  <Heading as="h3">A pure-white band</Heading>
                  <p className="mt-2 text-muted">
                    <code className="font-mono">surface</code> renders #FFFFFF for
                    gentle separation from the warm-white ground. Default vertical
                    padding is <code className="font-mono">py-16 sm:py-24</code>{" "}
                    (reduced here to show the band).
                  </p>
                </Container>
              </Section>
            </div>
          </Row>
        </div>
      </Container>
    </main>
  );
}
