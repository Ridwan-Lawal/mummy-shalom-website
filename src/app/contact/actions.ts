// Server Action for the care inquiry form (§5 /contact).
//
// Per node_modules/next/dist/docs/01-app/02-guides/server-actions.md, an action "runs
// as a POST request against the page that invokes it… the route is reachable to anyone
// who can send the same POST. Treat every action as an untrusted entry point."
//
// So nothing here trusts the form: required fields are re-checked server-side, every
// value is length-capped, and the template escapes before interpolating. The browser's
// `required` attributes are a convenience, not a control.
"use server";

import { sendCareInquiry } from "@/lib/email";
import type { CareInquiry } from "@/lib/email-template";

export type FormState = { status: "idle" | "success" | "error"; message?: string };

// Caps are generous for real answers but stop a megabyte of text reaching the inbox.
const LIMITS: Record<keyof CareInquiry, number> = {
  name: 120,
  phone: 40,
  careFor: 60,
  need: 120,
  preferredDate: 20,
  notes: 2000,
};

function read(formData: FormData, key: keyof CareInquiry): string {
  const raw = formData.get(key);
  if (typeof raw !== "string") return "";
  // Collapse newlines only in single-line fields; notes keeps its formatting.
  const trimmed = raw.trim();
  return trimmed.slice(0, LIMITS[key]);
}

export async function submitCareInquiry(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const data: CareInquiry = {
    name: read(formData, "name"),
    phone: read(formData, "phone"),
    careFor: read(formData, "careFor"),
    need: read(formData, "need"),
    preferredDate: read(formData, "preferredDate"),
    notes: read(formData, "notes"),
  };

  if (!data.name || !data.phone) {
    return {
      status: "error",
      message: "Please give your name and a phone number so we can reach you.",
    };
  }

  // Loose on purpose: Nigerian numbers get written many ways, and rejecting a real
  // person's number is worse than passing an odd one through to a human.
  if (!/\d{6,}/.test(data.phone)) {
    return { status: "error", message: "That phone number does not look complete." };
  }

  const result = await sendCareInquiry(data);
  if (!result.ok) return { status: "error" };

  return { status: "success" };
}
