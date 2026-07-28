// Care inquiry form (§5 /contact, Level 1).
//
// Submits through the Server Action in src/app/contact/actions.ts, which emails the
// clinic via Resend. The API key never touches this component — it is read server-side
// only. Using `<form action={…}>` with useActionState also means the form still posts
// if JS never arrives, which matters on the weak connections §1 describes.
"use client";

import { useActionState, useState, type ReactNode } from "react";
import { submitCareInquiry, type FormState } from "@/app/contact/actions";
import { Button, Toast } from "@/components/ui";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

const INITIAL: FormState = { status: "idle" };

// 6px radius, 44px min touch target, hairline border, flat — matches §6 button grammar.
const CONTROL =
  "w-full min-h-11 rounded-md border border-hairline bg-surface px-3 py-2 " +
  "text-base text-foreground transition-colors duration-150 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary " +
  "focus-visible:border-primary disabled:opacity-50";

const CARE_FOR = [
  "Myself",
  "A parent",
  "A spouse",
  "A child",
  "Someone else",
];

const NEEDS = [
  "Stroke rehabilitation",
  "Convalescent / in-patient care",
  "Maternity & antenatal",
  "Long-term condition (diabetes, blood pressure, arthritis)",
  "General illness",
  "Family planning",
  "Dental",
  "Something else",
];

function Field({
  label,
  htmlFor,
  required = false,
  helper,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  helper?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block font-medium text-foreground">
        {label}
        {required ? (
          <span className="text-muted"> (required)</span>
        ) : (
          <span className="text-muted"> (optional)</span>
        )}
      </label>
      {helper ? <p className="text-sm text-muted">{helper}</p> : null}
      {children}
    </div>
  );
}

export function CareInquiryForm() {
  const [state, formAction, pending] = useActionState(submitCareInquiry, INITIAL);
  // Derived, not set from an effect: the toast shows on success until dismissed. The
  // inline block below is the durable record, so this is only the moment-of-send nod.
  const [toastDismissed, setToastDismissed] = useState(false);

  if (state.status === "success") {
    return (
      <>
        {toastDismissed ? null : (
          <Toast
            message="Request sent — we have it and will be in touch."
            onDismiss={() => setToastDismissed(true)}
          />
        )}
        <div
          role="status"
          className="rounded-lg border border-hairline bg-surface p-6 text-foreground"
        >
          <p className="font-medium">Thank you</p>
          <p className="mt-2">
            We have your request and will get back to you within{" "}
            {site.responseWindow}. If the situation becomes urgent before then, call{" "}
            <a
              href={`tel:${site.phones[0].tel}`}
              className="font-medium text-primary tabular-nums hover:text-foreground"
            >
              {site.phones[0].label}
            </a>
            .
          </p>
        </div>
      </>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <Field label="Your name" htmlFor="name" required>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={CONTROL}
        />
      </Field>

      <Field
        label="Phone number"
        htmlFor="phone"
        required
        helper="This is how we will reach you. WhatsApp is fine."
      >
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          className={CONTROL}
        />
      </Field>

      <Field label="Who is the care for?" htmlFor="careFor">
        <select id="careFor" name="careFor" className={CONTROL} defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {CARE_FOR.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field label="What do you need help with?" htmlFor="need">
        <select id="need" name="need" className={CONTROL} defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          {NEEDS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Preferred date to visit"
        htmlFor="preferredDate"
        helper="If you would like to come and see the clinic first, tell us when suits you."
      >
        <input
          id="preferredDate"
          name="preferredDate"
          type="date"
          className={CONTROL}
        />
      </Field>

      <Field
        label="Anything we should know?"
        htmlFor="notes"
        helper="A hospital discharge summary, current medication, or how long this has been going on — whatever helps us understand."
      >
        <textarea id="notes" name="notes" rows={4} className={cn(CONTROL, "min-h-28")} />
      </Field>

      {state.status === "error" ? (
        <p role="alert" className="text-foreground">
          <span className="font-medium">
            {state.message ?? "That did not send."}
          </span>{" "}
          Please try again, or call{" "}
          <a
            href={`tel:${site.phones[0].tel}`}
            className="font-medium text-primary tabular-nums hover:text-foreground"
          >
            {site.phones[0].label}
          </a>{" "}
          instead.
        </p>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send your request"}
      </Button>

      <p className="text-sm text-muted">
        Your information is confidential and is only used to contact you about care.
      </p>
    </form>
  );
}
