// Email template for care inquiries (§5 /contact).
//
// Hand-built HTML rather than a component library, because email rendering is not web
// rendering:
//   · Tables for layout — Gmail and Outlook are unreliable with flex/grid.
//   · Every style inline — <style> blocks get stripped by several clients.
//   · No webfont — General Sans cannot load in email, so this falls back to the same
//     system stack globals.css lists behind it.
//
// Brand tokens are written as literal hex here since the CSS variables do not exist in
// an inbox. NO urgent red anywhere: a form notification is not the call block (§4).
import { site } from "@/lib/site";

const COLOR = {
  ground: "#FAF8F4",
  surface: "#FFFFFF",
  hairline: "#E8E4DC",
  text: "#221F1A",
  muted: "#6B655C",
  primary: "#1E5F7A",
  gold: "#C9962E",
} as const;

const FONT =
  "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export type CareInquiry = {
  name: string;
  phone: string;
  careFor: string;
  need: string;
  preferredDate: string;
  notes: string;
};

/** Escapes untrusted form input before it is interpolated into HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** One label/value row. Returns "" for blank optional fields so they are omitted. */
function row(label: string, value: string, asTel = false): string {
  if (!value.trim()) return "";
  const safe = escapeHtml(value);
  const rendered = asTel
    ? `<a href="tel:${safe.replace(/[^\d+]/g, "")}" style="color:${COLOR.primary};text-decoration:none;font-weight:600;">${safe}</a>`
    : safe;
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid ${COLOR.hairline};vertical-align:top;width:38%;">
        <span style="font:400 13px/1.4 ${FONT};color:${COLOR.muted};">${label}</span>
      </td>
      <td style="padding:12px 0;border-bottom:1px solid ${COLOR.hairline};vertical-align:top;">
        <span style="font:400 15px/1.5 ${FONT};color:${COLOR.text};white-space:pre-wrap;">${rendered}</span>
      </td>
    </tr>`;
}

export function careInquiryHtml(data: CareInquiry): string {
  const rows = [
    row("Name", data.name),
    row("Phone", data.phone, true),
    row("Who the care is for", data.careFor),
    row("What they need help with", data.need),
    row("Preferred date to visit", data.preferredDate),
    row("Anything we should know", data.notes),
  ].join("");

  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:${COLOR.ground};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLOR.ground};padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${COLOR.surface};border:1px solid ${COLOR.hairline};border-radius:8px;">

        <tr><td style="padding:24px 24px 0 24px;">
          <p style="margin:0;font:600 17px/1.3 ${FONT};color:${COLOR.text};">${escapeHtml(site.name)}</p>
          <p style="margin:4px 0 0 0;font:500 13px/1.4 ${FONT};color:${COLOR.gold};">${escapeHtml(site.tagline)}</p>
        </td></tr>

        <tr><td style="padding:20px 24px 0 24px;">
          <p style="margin:0;font:600 20px/1.3 ${FONT};color:${COLOR.text};">New care inquiry</p>
          <p style="margin:8px 0 0 0;font:400 15px/1.6 ${FONT};color:${COLOR.text};">
            Someone has asked about care through the website. Their phone number is below — it is the fastest way to reach them.
          </p>
        </td></tr>

        <tr><td style="padding:8px 24px 24px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
        </td></tr>

        <tr><td style="padding:16px 24px 24px 24px;border-top:1px solid ${COLOR.hairline};">
          <p style="margin:0;font:400 13px/1.6 ${FONT};color:${COLOR.muted};">
            ${escapeHtml(site.address.full)}<br>
            ${site.phones.map((p) => escapeHtml(p.label)).join(" &middot; ")}
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/** Plain-text alternative, for clients that block HTML. */
export function careInquiryText(data: CareInquiry): string {
  const line = (label: string, value: string) =>
    value.trim() ? `${label}: ${value}\n` : "";

  return [
    `New care inquiry — ${site.name}`,
    ``,
    `Someone has asked about care through the website.`,
    `Their phone number is the fastest way to reach them.`,
    ``,
    line("Name", data.name),
    line("Phone", data.phone),
    line("Who the care is for", data.careFor),
    line("What they need help with", data.need),
    line("Preferred date to visit", data.preferredDate),
    line("Anything we should know", data.notes),
    ``,
    site.address.full,
    site.phones.map((p) => p.label).join(" · "),
  ].join("\n");
}
