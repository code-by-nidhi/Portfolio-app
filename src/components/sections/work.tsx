"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LivePreview } from "@/components/ui/live-preview";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

/** Bright accent tones that read on the dark preview frames. */
const TINT: Record<Project["accent"], string> = {
  lilac: "#b9aee8",
  mint: "#5fd4a8",
  blush: "#f2a7b0",
  sky: "#8fbcec",
  sand: "#e8b86b",
};

/** Accent classes for the text column, spelled out for Tailwind's scanner. */
const ACCENT: Record<
  Project["accent"],
  { text: string; bullet: string; button: string }
> = {
  lilac: {
    text: "text-lilac-deep",
    bullet: "bg-lilac-deep",
    button: "border-lilac-deep text-lilac-deep hover:bg-lilac-mist",
  },
  mint: {
    text: "text-mint-deep",
    bullet: "bg-mint-deep",
    button: "border-mint-deep text-mint-deep hover:bg-mint-mist",
  },
  blush: {
    text: "text-blush-deep",
    bullet: "bg-blush-deep",
    button: "border-blush-deep text-blush-deep hover:bg-blush-mist",
  },
  sky: {
    text: "text-sky-deep",
    bullet: "bg-sky-deep",
    button: "border-sky-deep text-sky-deep hover:bg-sky-mist",
  },
  sand: {
    text: "text-sand-deep",
    bullet: "bg-sand-deep",
    button: "border-sand-deep text-sand-deep hover:bg-sand-mist",
  },
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * On desktop the gallery pins to the viewport and vertical scrolling slides
 * the panels sideways; on small screens they simply stack.
 */
export function Work() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isDesktop) {
      setDistance(0);
      return;
    }

    const measure = () =>
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isDesktop]);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, (value) => -value * distance);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActive(Math.round(value * (projects.length - 1)));
  });

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-ink-muted">
            Selected work
          </span>
          <div className="mt-3 h-px w-full bg-hairline" />
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(2.1rem,6.5vw,5rem)] leading-none text-ink">
              Things I&apos;ve built
            </h2>
            <p className="hidden max-w-xs text-sm text-ink-muted md:block">
              Live builds, start to finish. Scroll sideways.
            </p>
          </div>
        </Reveal>
      </div>

      <div
        ref={pinRef}
        className="relative mt-14"
        style={isDesktop ? { height: `calc(100svh + ${distance}px)` } : undefined}
      >
        <div className="md:sticky md:top-0 md:flex md:h-[100svh] md:flex-col md:justify-center md:overflow-hidden">
          <motion.div
            ref={trackRef}
            style={isDesktop ? { x } : undefined}
            className="flex flex-col gap-24 px-4 sm:px-6 md:w-max md:flex-row md:gap-[8vw] md:px-[7vw]"
          >
            {projects.map((project, index) => (
              <ProjectPanel key={project.id} project={project} index={index} />
            ))}
          </motion.div>

          <div className="mx-auto hidden w-full max-w-6xl px-[7vw] pt-10 md:block">
            <div className="flex items-center gap-5 font-mono text-[0.7rem] tracking-[0.2em]">
              <span className="text-lilac-deep">{pad(active + 1)}</span>
              <span className="relative h-px flex-1 overflow-hidden bg-hairline">
                <motion.span
                  style={{ scaleX: scrollYProgress }}
                  className="absolute inset-0 origin-left bg-lilac-deep"
                />
              </span>
              <span className="text-ink-muted">{pad(projects.length)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer noopener"
          className="group inline-flex items-center gap-2 py-2 text-sm text-ink-soft transition-colors hover:text-lilac-deep"
        >
          More on GitHub
          <ArrowUpRight
            className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.8}
          />
        </a>
      </div>
    </section>
  );
}

function ProjectPanel({ project, index }: { project: Project; index: number }) {
  const accent = ACCENT[project.accent];
  const number = pad(index + 1);

  const links = [
    { label: "Live site", href: project.liveUrl },
    ...(project.extraLinks ?? []),
    { label: "Source", href: project.repoUrl },
  ].filter((link): link is { label: string; href: string } =>
    Boolean(link.href),
  );

  return (
    <article className="flex w-full shrink-0 flex-col justify-center gap-8 md:w-[74vw] lg:w-[62vw] lg:flex-row lg:items-center lg:gap-12">
      <div className="w-full lg:w-[46%]">
        <div className="flex items-center gap-4 font-mono text-[0.7rem] tracking-[0.2em]">
          <span className={accent.text}>{number}</span>
          <span aria-hidden className="h-px flex-1 bg-hairline" />
          {project.period ? (
            <span className="uppercase text-ink-muted">{project.period}</span>
          ) : null}
        </div>

        <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-ink-muted">
          {project.category}
        </p>
        <h3 className="mt-3 font-display text-[clamp(1.9rem,3.6vw,3.25rem)] leading-tight text-ink">
          {project.title}
        </h3>
        <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft">
          {project.summary}
        </p>

        <ul className="mt-7 space-y-2.5">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-sm text-ink-soft">
              <span
                aria-hidden
                className={cn("mt-[7px] size-1 shrink-0 rotate-45", accent.bullet)}
              />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-hairline px-3 py-1 font-mono text-[0.65rem] tracking-[0.12em] text-ink-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {links.map((link, linkIndex) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] transition-colors",
                linkIndex === 0
                  ? accent.button
                  : "border-hairline text-ink-soft hover:border-ink-muted hover:text-ink",
              )}
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>

      {project.liveUrl ? (
        <div className="w-full lg:w-[54%]">
          <LivePreview
            url={project.liveUrl}
            title={`${project.title} live preview`}
            overlay={
              <span
                className="absolute -bottom-6 -right-2 font-display text-[7rem] leading-none opacity-[0.12] sm:text-[10rem]"
                style={{ color: TINT[project.accent] }}
              >
                {number}
              </span>
            }
          />
        </div>
      ) : null}
    </article>
  );
}
