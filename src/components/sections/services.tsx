import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { profile } from "@/data/profile";
import { serviceSteps } from "@/data/services";
import { cn } from "@/lib/utils";

/** Radius of the curved joins where a connector meets a pill. */
const FILLET = "0.75rem";

/**
 * A concave corner piece, so a connector flares into the pill it meets rather
 * than butting against it at a right angle.
 */
function Fillet({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const top = corner[0] === "t";
  const left = corner[1] === "l";

  // The cut-out circle sits in the corner furthest from the pill and the bar.
  const at = `${left ? "0%" : "100%"} ${top ? "100%" : "0%"}`;
  const style: CSSProperties = {
    width: FILLET,
    height: FILLET,
    [top ? "top" : "bottom"]: 0,
    [left ? "right" : "left"]: "100%",
    background: `radial-gradient(circle at ${at}, transparent ${FILLET}, var(--color-ink) calc(${FILLET} + 0.5px))`,
  };

  return <span aria-hidden className="absolute" style={style} />;
}

/** The bar carrying the path down to the next row. */
function Connector({ side }: { side: "left" | "right" }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute top-full z-0 h-4 w-9 bg-ink sm:h-5 sm:w-11",
        // Far enough in from the pill's rounded end that it meets a flat edge.
        side === "right" ? "right-[22%] sm:right-[18%]" : "left-[22%] sm:left-[18%]",
      )}
    >
      <Fillet corner="tl" />
      <Fillet corner="tr" />
      <Fillet corner="bl" />
      <Fillet corner="br" />
    </span>
  );
}

function StepPill({
  label,
  index,
  side,
}: {
  label: string;
  index: number;
  side: "left" | "right";
}) {
  // Filled and outlined alternate along the path.
  const filled = index % 2 === 0;

  return (
    <div
      className={cn(
        // Each pill reaches past the column's centre line so neighbours join.
        side === "left" ? "-mr-3" : "-ml-3",
        filled ? "relative z-20" : "relative z-10",
      )}
    >
      <div
        className={cn(
          "flex h-12 items-center justify-center gap-2 rounded-full border-2 border-ink px-4 text-center text-xs font-medium leading-tight transition-colors duration-300 sm:h-14 sm:text-sm",
          filled
            ? "bg-ink text-ivory hover:bg-lilac-deep hover:border-lilac-deep"
            : "bg-surface text-ink hover:bg-lilac-mist",
        )}
      >
        <span
          className={cn(
            "hidden font-mono text-[0.6rem] tracking-[0.1em] sm:inline",
            filled ? "text-lilac" : "text-ink-muted",
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        {label}
      </div>
    </div>
  );
}

/** Steps two to a row, snaking left-right then right-left down the rows. */
function StepPath() {
  const rows = Array.from(
    { length: Math.ceil(serviceSteps.length / 2) },
    (_, row) => serviceSteps.slice(row * 2, row * 2 + 2),
  );

  return (
    <RevealGroup className="flex flex-col gap-4 sm:gap-5">
      {rows.map((pair, row) => {
        const leftToRight = row % 2 === 0;
        const first = row * 2;
        const isLast = row === rows.length - 1;

        // Grid cells run left to right, so a right-to-left row is reversed.
        const steps = pair.map((label, i) => ({ label, index: first + i }));
        const cells = (leftToRight ? steps : steps.reverse()).map(
          (step, column) => ({
            ...step,
            side: column === 0 ? ("left" as const) : ("right" as const),
          }),
        );

        return (
          <RevealItem key={row} className="relative grid grid-cols-2">
            {cells.map((cell) => (
              <StepPill key={cell.label} {...cell} />
            ))}
            {isLast ? null : (
              <Connector side={leftToRight ? "right" : "left"} />
            )}
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}

export function Services() {
  return (
    <section id="services" className="relative flex min-h-[100svh] items-center py-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        {/* The full-length figure needs room; below `lg` the steps carry it. */}
        <div className="hidden lg:block">
          <Image
            src="/sitting-pose-cutout.png"
            alt={`${profile.name} seated, arms folded`}
            width={1123}
            height={1401}
            sizes="30rem"
            className="mx-auto max-h-[72vh] w-auto object-contain"
          />
        </div>

        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-ink-muted">
              <span className="h-px w-6 bg-lilac" />
              Services
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
              What I can build for you
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
              From the first design to launch day and beyond: one person taking
              your website through every step, so nothing gets lost between
              hand-offs.
            </p>
          </Reveal>

          <div className="mt-10">
            <p className="mb-4 flex items-center justify-end gap-2 text-sm text-ink-soft">
              <span aria-hidden className="size-2.5 rounded-full bg-blush-deep" />
              Work with me
            </p>
            <StepPath />
          </div>
        </div>
      </div>
    </section>
  );
}
