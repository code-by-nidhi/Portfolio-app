"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { accentStyles } from "@/components/ui/accent";
import { Reveal } from "@/components/ui/reveal";
import { reasons, type Reason } from "@/data/why";
import { cn } from "@/lib/utils";

const COUNT = reasons.length;

/** Where the first card pins, clear of the fixed header. */
const STICK_TOP_REM = 7;
/** Each later card pins this much lower, so the edges of the stack show. */
const STACK_STEP_REM = 1.25;
/** How much a card shrinks for every card that lands on top of it. */
const SCALE_STEP = 0.04;

function ReasonCard({
  reason,
  index,
  progress,
}: {
  reason: Reason;
  index: number;
  progress: MotionValue<number>;
}) {
  const accent = accentStyles[reason.accent];
  const reduceMotion = useReducedMotion();

  // Once its own turn starts, a card eases back as the rest pile on top.
  const scale = useTransform(
    progress,
    [index / COUNT, 1],
    [1, 1 - (COUNT - 1 - index) * SCALE_STEP],
  );

  return (
    <li
      className="sticky"
      style={{ top: `${STICK_TOP_REM + index * STACK_STEP_REM}rem` }}
    >
      <motion.div
        style={reduceMotion ? undefined : { scale }}
        className="card-3d flex min-h-[15rem] origin-top flex-col p-6 sm:min-h-[16rem] sm:p-8"
      >
        <div className="flex items-center justify-between gap-4">
          <span
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-xl font-mono text-xs font-bold",
              accent.mist,
              accent.text,
            )}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-ink-muted">
            {String(index + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-6 font-display text-2xl leading-snug text-ink sm:text-3xl">
          {reason.title}
        </h3>
        <p className={cn("mt-2 text-base font-medium leading-snug", accent.text)}>
          {reason.lead}
        </p>
        {reason.detail ? (
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            {reason.detail}
          </p>
        ) : null}
      </motion.div>
    </li>
  );
}

/**
 * The intro stays pinned on the left while the reason cards scroll up on the
 * right, each one pinning slightly below the last so they build into a stack.
 */
export function Why() {
  const listRef = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="why" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-ink-muted">
              <span className="h-px w-6 bg-lilac" />
              Why work with me
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
              Good code is important. A good freelance experience is too.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">
              I focus on understanding what you actually need, building a
              solution that works for your users, and keeping the process clear
              from start to finish.
            </p>
          </Reveal>
        </div>

        {/* Space between cards is the scroll distance each one travels. */}
        <ul ref={listRef} className="flex flex-col gap-[28vh] pb-4">
          {reasons.map((reason, index) => (
            <ReasonCard
              key={reason.title}
              reason={reason}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
