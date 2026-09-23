"use client";

import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/**
 * Web3Forms access key, inlined at build time. It is designed to be public:
 * it only lets a form deliver mail to the inbox it was issued for.
 * Get one at https://web3forms.com and set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY.
 */
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
const ENDPOINT = "https://api.web3forms.com/submit";

type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "w-full rounded-lg border border-transparent bg-lilac-mist/70 px-4 py-3 text-sm text-ink placeholder:text-ink-muted/80 transition-colors focus:border-lilac focus:bg-surface focus:outline-none focus:ring-2 focus:ring-lilac/40";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!ACCESS_KEY) {
      setStatus("error");
      setError("The form isn't connected yet.");
      return;
    }

    setStatus("sending");
    setError("");

    const data = new FormData(form);
    const field = (key: string) => String(data.get(key) ?? "").trim();
    const name = `${field("firstName")} ${field("lastName")}`.trim();

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New portfolio message from ${name}`,
          from_name: "Portfolio contact form",
          name,
          email: field("email"),
          phone: field("phone") || "—",
          message: field("message"),
          page: window.location.href,
          // Web3Forms' honeypot: bots fill it, people never see it.
          botcheck: data.get("botcheck") === "on",
        }),
      });
      const json = (await res.json()) as { success: boolean; message?: string };
      if (!json.success) throw new Error(json.message || "Submission failed");

      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-2xl border border-mint/60 bg-mint-mist/70 px-6 py-12 text-center"
      >
        <CheckCircle2 className="size-8 text-mint-deep" strokeWidth={1.6} />
        <p className="font-display text-xl text-ink">Message received</p>
        <p className="text-sm text-ink-soft">
          Thanks for reaching out — I&apos;ll reply within a couple of days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-lilac-deep underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="block">
        <span className="sr-only">First name</span>
        <input
          name="firstName"
          required
          maxLength={50}
          autoComplete="given-name"
          placeholder="First Name"
          className={fieldClass}
        />
      </label>

      <label className="block">
        <span className="sr-only">Last name</span>
        <input
          name="lastName"
          maxLength={50}
          autoComplete="family-name"
          placeholder="Last Name"
          className={fieldClass}
        />
      </label>

      <label className="block sm:col-span-2">
        <span className="sr-only">Email address</span>
        <input
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          placeholder="Email Address"
          className={fieldClass}
        />
      </label>

      <label className="block sm:col-span-2">
        <span className="sr-only">Phone number (optional)</span>
        <input
          name="phone"
          type="tel"
          maxLength={20}
          autoComplete="tel"
          placeholder="Phone Number"
          className={fieldClass}
        />
      </label>

      <label className="block sm:col-span-2">
        <span className="sr-only">Your message</span>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={3000}
          placeholder="Your Message"
          className={cn(fieldClass, "resize-y")}
        />
      </label>

      {/* Honeypot — hidden from people, filled in by bots. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-lilac-deep to-blush-deep px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_-12px_rgba(110,95,176,0.7)] transition-[filter,transform] hover:-translate-y-0.5 hover:brightness-110 disabled:pointer-events-none disabled:opacity-70"
        >
          {sending ? (
            <>
              <Loader2 className="size-4 animate-spin" strokeWidth={1.8} />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <Send className="size-4" strokeWidth={1.8} />
            </>
          )}
        </button>

        <p aria-live="polite" className="mt-3 text-center text-sm text-blush-deep">
          {status === "error" && (
            <>
              {error} You can email me directly at{" "}
              <a
                href={`mailto:${profile.email}`}
                className="underline underline-offset-4"
              >
                {profile.email}
              </a>
              .
            </>
          )}
        </p>
      </div>
    </form>
  );
}
