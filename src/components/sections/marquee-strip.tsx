import { marqueeItems } from "@/data/navigation";

/**
 * Continuous tech ribbon. Kept flat with an opaque-enough fill: a 3D tilt plus
 * backdrop blur over a constantly moving track made the band flicker.
 */
export function MarqueeStrip() {
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <section aria-label="Technologies" className="relative z-10 overflow-hidden py-6">
      <div className="border-y border-hairline bg-surface/85 py-5">
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-10 pr-10">
            {doubled.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="flex items-center gap-10 font-mono text-sm uppercase tracking-[0.18em] text-ink-muted"
              >
                {item}
                <span aria-hidden className="size-1.5 rounded-full bg-lilac" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
