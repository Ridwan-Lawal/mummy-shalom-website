// Renders a JSON-LD block. Server component — no client JS.
//
// `dangerouslySetInnerHTML` is the sanctioned way to emit JSON-LD: React would
// otherwise HTML-escape the quotes inside the script body and crawlers would fail
// to parse it. Everything passed here is static, built in src/lib/schema.ts from
// src/lib/site.ts — no user input reaches this component, and none should.

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // "</script>" inside a string value would close the tag early. Nothing in
      // site.ts contains one, but escaping it is one character and removes the
      // failure mode entirely if someone later feeds this real content.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
