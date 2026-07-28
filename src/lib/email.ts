// Resend configuration and send functions.
//
// SERVER ONLY. This module reads RESEND_API_KEY, which has no NEXT_PUBLIC_ prefix and
// must never reach the browser. It is imported solely by the Server Action in
// src/app/contact/actions.ts — do not import it from a client component.
import { Resend } from "resend";
import {
  careInquiryHtml,
  careInquiryText,
  type CareInquiry,
} from "@/lib/email-template";
import { site } from "@/lib/site";

// PLACEHOLDER DOMAIN. lawalridwan.me is the developer's Resend-verified domain, used
// until the clinic's own domain is bought and verified (§12: "Domain owned or
// needed?"). Swap this one line when that happens — nothing else references it.
const FROM = "Mummy Shalom Medical Services <care@lawalridwan.me>";

// §12 still lists the clinic's primary email as unconfirmed, so the destination is
// overridable: point CONTACT_INBOX at a test address before it goes to the real inbox.
const TO = process.env.CONTACT_INBOX?.trim() || site.email;

export type SendResult = { ok: true } | { ok: false; error: string };

/**
 * Emails a care inquiry to the clinic.
 *
 * Never throws — the caller is a Server Action whose job is to return a result the
 * form can render, not to crash the request. `data` is expected to be already
 * validated; escaping happens in the template.
 */
export async function sendCareInquiry(data: CareInquiry): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Surfaced as a handled failure rather than a crash at import time, so a missing
    // key shows the form's error state instead of a 500.
    console.error("[email] RESEND_API_KEY is not set — cannot send care inquiry.");
    return { ok: false, error: "Email is not configured." };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `New care inquiry — ${data.name}`,
      html: careInquiryHtml(data),
      text: careInquiryText(data),
    });

    if (error) {
      console.error("[email] Resend rejected the send:", error);
      return { ok: false, error: "The email service rejected the message." };
    }
    return { ok: true };
  } catch (cause) {
    console.error("[email] Unexpected failure sending care inquiry:", cause);
    return { ok: false, error: "Could not reach the email service." };
  }
}
