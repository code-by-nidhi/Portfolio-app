"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [lifted, setLifted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Don't leave a hidden menu open behind a resize to desktop.
  useEffect(() => {
    if (!menuOpen) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const close = () => setMenuOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 transition-[background-color,border-color,box-shadow] duration-500 sm:px-6",
          lifted
            ? "border-hairline bg-surface/85 shadow-[0_10px_30px_-12px_rgba(110,95,176,0.35)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <a
          href="#top"
          className="py-1 font-display text-lg tracking-[0.2em] text-ink transition-colors hover:text-lilac-deep"
        >
          {profile.wordmark}
          <span className="text-lilac">.</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer noopener" : undefined}
              className="rounded-lg px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-lilac-mist hover:text-lilac-deep"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="btn-3d hidden px-4 py-2 text-sm font-medium text-ivory md:inline-flex"
          >
            Get in touch
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="btn-3d btn-3d-soft p-2 md:hidden"
          >
            {menuOpen ? (
              <X className="size-5" strokeWidth={1.7} />
            ) : (
              <Menu className="size-5" strokeWidth={1.7} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-hairline bg-surface/95 p-2 shadow-[0_18px_40px_-18px_rgba(110,95,176,0.5)] backdrop-blur-xl md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer noopener" : undefined}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm text-ink-soft transition-colors hover:bg-lilac-mist hover:text-lilac-deep"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-1 block rounded-xl bg-ink px-4 py-3 text-center text-sm font-medium text-ivory"
            >
              Get in touch
            </a>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
