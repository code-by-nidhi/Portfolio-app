"use client";

import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { profile } from "@/data/profile";

/**
 * One fixed-position portrait that travels from the hero into the About
 * section as the visitor scrolls.
 *
 * Rather than animating to hard-coded coordinates, every frame reads the live
 * rects of the two `[data-portrait-slot]` boxes and interpolates between them.
 * That keeps the flight correct through resizes, font loading and any layout
 * change, because the destination is always measured rather than assumed —
 * GSAP only supplies the scrubbed progress value.
 */
export function PortraitFlight() {
  const flyRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const fly = flyRef.current;
    if (!fly || reduceMotion) return;

    // Resolved per frame rather than captured once. A detached node reports a
    // zero rect, so holding a stale reference collapses the portrait into the
    // top-left corner instead of landing it in the badge — which is what a
    // hot reload of either section used to do, and what any future conditional
    // render of a slot would do in production.
    const cache: Record<"hero" | "about", HTMLElement | null> = {
      hero: null,
      about: null,
    };

    const slot = (variant: "hero" | "about") => {
      const cached = cache[variant];
      if (cached?.isConnected) return cached;
      return (cache[variant] = document.querySelector<HTMLElement>(
        `[data-portrait-slot="${variant}"]`,
      ));
    };

    const about = document.querySelector<HTMLElement>("#about");
    if (!slot("hero") || !slot("about") || !about) return;

    gsap.registerPlugin(ScrollTrigger);
    // Don't let ScrollTrigger restore the previous scroll position on refresh;
    // the page always opens at the top (see the script in the root layout).
    ScrollTrigger.clearScrollMemory("manual");

    // Scroll drives this single number; scrub supplies the smoothing.
    const state = { progress: 0 };
    const tween = gsap.to(state, {
      progress: 1,
      // Linear: the portrait should track the scroll, not race through the
      // middle of the range and then coast.
      ease: "none",
      scrollTrigger: {
        trigger: about,
        // Starts the moment the About section enters the viewport and ends
        // as it settles, spreading the travel over a long scroll distance.
        // A start above 100% would clamp to a negative scroll, which would
        // leave the portrait already part-way along at page load.
        start: "top bottom",
        end: "top 12%",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    let revealed = false;
    let lastMaskStop = -1;
    let lastWidth = -1;
    let lastTransform = "";

    const render = () => {
      const heroSlot = slot("hero");
      const aboutSlot = slot("about");
      if (!heroSlot || !aboutSlot) return;

      const from = heroSlot.getBoundingClientRect();
      const to = aboutSlot.getBoundingClientRect();
      const p = state.progress;

      // Rounded to half a pixel so sub-pixel jitter in the measured rects
      // doesn't rewrite styles (and repaint the portrait) on idle frames.
      const snap = (n: number) => Math.round(n * 2) / 2;
      const x = snap(from.left + (to.left - from.left) * p);
      const y = snap(from.top + (to.top - from.top) * p);
      const width = snap(from.width + (to.width - from.width) * p);

      // A slight tilt at the midpoint, flat again once it lands.
      const tilt = (Math.sin(p * Math.PI) * -4).toFixed(2);

      if (width !== lastWidth) {
        lastWidth = width;
        fly.style.width = `${width}px`;
      }
      const transform = `translate3d(${x}px, ${y}px, 0) rotate(${tilt}deg)`;
      if (transform !== lastTransform) {
        lastTransform = transform;
        fly.style.transform = transform;
      }

      // In the hero the portrait fades out at the bottom so it melts into the
      // page; inside the badge window it should read as a printed photo. The
      // stop is quantised so the mask is only rewritten a handful of times.
      const maskStop = Math.round(88 + 12 * p);
      if (maskStop !== lastMaskStop) {
        lastMaskStop = maskStop;
        const mask = `linear-gradient(to bottom, #000 ${maskStop}%, transparent)`;
        fly.style.maskImage = mask;
        fly.style.webkitMaskImage = mask;
      }

      if (!revealed && width > 0) {
        revealed = true;
        gsap.to(fly, { autoAlpha: 1, duration: 0.3 });
      }
    };

    render();
    gsap.ticker.add(render);

    return () => {
      gsap.ticker.remove(render);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div
      ref={flyRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 origin-top opacity-0 will-change-transform"
    >
      <Image
        src="/portrait.png"
        alt={`${profile.name}, ${profile.role}`}
        width={905}
        height={1198}
        priority
        sizes="(max-width: 640px) 70vw, 24rem"
        className="h-auto w-full"
      />
    </div>
  );
}
