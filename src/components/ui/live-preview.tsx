"use client";

import { Loader2 } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Viewport width the embedded site is rendered at before scaling down. */
const VIRTUAL_WIDTH = 1440;

/**
 * A scaled-down, non-interactive snapshot of a deployed site inside browser
 * chrome. The site renders at a desktop viewport so it shows its full layout,
 * then the frame is shrunk to fit like a picture; clicking it opens the site.
 * `overlay` is drawn above the frame without catching pointer events.
 */
export function LivePreview({
  url,
  title,
  overlay,
  className,
}: {
  url: string;
  title: string;
  overlay?: ReactNode;
  className?: string;
}) {
  const viewportRef = useRef<HTMLAnchorElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const scale = size.width ? size.width / VIRTUAL_WIDTH : 1;
  const host = new URL(url).host;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-[#1f3a32] bg-[#0a1a16] shadow-[0_24px_60px_-24px_rgba(10,26,22,0.6)]",
        className,
      )}
    >
      <div className="flex items-center gap-5 border-b border-[#1f3a32] px-5 py-3.5">
        <div aria-hidden className="flex gap-2.5">
          <span className="size-2.5 rounded-full bg-[#1f4a3e]" />
          <span className="size-2.5 rounded-full bg-[#1f4a3e]" />
          <span className="size-2.5 rounded-full bg-[#1f4a3e]" />
        </div>
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          className="min-w-0 flex-1 truncate rounded-full border border-[#2a4a41] px-4 py-1.5 font-mono text-[0.7rem] text-[#b8c9c2] transition-colors hover:border-[#5fd4a8] hover:text-[#e8efe9]"
        >
          {host}
        </a>
      </div>

      <a
        ref={viewportRef}
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Open ${title} in a new tab`}
        className="relative block aspect-[16/10] w-full overflow-hidden bg-[#0a1a16]"
      >
        {size.width ? (
          <iframe
            src={url}
            title={title}
            loading="lazy"
            scrolling="no"
            tabIndex={-1}
            aria-hidden
            onLoad={() => setLoaded(true)}
            className="pointer-events-none absolute left-0 top-0 origin-top-left select-none border-0"
            style={{
              width: VIRTUAL_WIDTH,
              height: size.height / scale,
              transform: `scale(${scale})`,
            }}
          />
        ) : null}

        {!loaded ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0a1a16] text-center">
            <Loader2
              className="size-5 animate-spin text-[#5fd4a8]"
              strokeWidth={1.8}
            />
            <p className="px-6 text-xs text-[#7f978f]">
              Loading live preview. The free-tier server may take a moment to
              wake up.
            </p>
          </div>
        ) : null}

        {overlay ? (
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {overlay}
          </div>
        ) : null}
      </a>
    </div>
  );
}
