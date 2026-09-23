import { Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import { ContactForm } from "@/components/ui/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-shell/60 py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_20%_60%,rgba(185,174,232,0.25),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center">
          <h2 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
            Get In <span className="text-lilac-deep">Touch</span>
          </h2>
          <p className="mt-3 text-sm text-ink-muted sm:text-base">
            Let&apos;s discuss your project
          </p>
        </Reveal>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative mx-auto w-full max-w-sm lg:max-w-md">
            <Sparkles
              aria-hidden
              className="float-slow absolute left-2 top-10 size-7 text-sand-deep"
              strokeWidth={1.6}
            />

            <Image
              src="/portrait.png"
              alt={`${profile.name}, ready to hear about your project`}
              width={905}
              height={1198}
              sizes="(max-width: 1024px) 24rem, 28rem"
              className="h-auto w-full [mask-image:linear-gradient(to_bottom,#000_80%,transparent)]"
            />

            {/* Mail bubble with an unread badge, as in a messaging app. */}
            <div
              aria-hidden
              className="float-slow absolute -right-2 top-16 sm:-right-6"
            >
              <div className="relative flex size-20 items-center justify-center rounded-2xl rounded-bl-md bg-gradient-to-br from-sky to-sky-deep shadow-[0_14px_30px_-12px_rgba(70,115,159,0.7)] sm:size-24">
                <Mail className="size-10 text-white sm:size-12" strokeWidth={1.5} />
                <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-blush-deep text-xs font-semibold text-white ring-4 ring-shell">
                  1
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-3d p-6 sm:p-8">
              <div className="relative">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
