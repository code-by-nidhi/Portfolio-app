import { Reveal } from "@/components/ui/reveal";
import { contributions } from "@/data/contributions";

export function Contributions() {
  return (
    <section id="contributions" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-ink-muted">
            Contributions
          </span>
          <div className="mt-3 h-px w-full bg-hairline" />
          <h2 className="mt-6 font-display text-[clamp(2.1rem,6.5vw,5rem)] leading-none text-ink">
            Out in the wild
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-muted">
            Production sites for TechCADD institute branches, each live on its
            own domain.{" "}
            <span className="text-ink-soft">{contributions.length} sites.</span>
          </p>
        </Reveal>

        <Reveal className="mt-14" delay={0.1}>
          <div className="h-px w-full bg-hairline" />
          {contributions.map((site, index) => (
            <a
              key={site.id}
              href={site.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group block border-b border-hairline"
            >
              <div className="relative grid grid-cols-12 items-center gap-3 py-5 transition-[padding] duration-500 group-hover:pl-3 sm:gap-4 sm:py-6">
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-lilac-deep transition-transform duration-500 group-hover:scale-y-100"
                />
                <span className="col-span-2 font-mono text-[0.65rem] tracking-[0.16em] text-ink-muted sm:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="col-span-10 text-[17px] leading-tight text-ink sm:col-span-4 sm:text-xl">
                  <span className="transition-colors duration-300 group-hover:text-lilac-deep">
                    {site.title}
                  </span>
                  <span className="ml-2 inline-block align-middle font-mono text-[0.65rem] text-lilac-deep opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    LIVE
                  </span>
                </h3>
                <p className="col-span-12 text-sm leading-snug text-ink-muted sm:col-span-4 sm:col-start-6">
                  {site.description}
                </p>
                <span className="col-span-6 flex items-center gap-2 sm:col-span-2 sm:justify-end">
                  <span className="size-1.5 rounded-full bg-mint-deep" />
                  <span className="font-mono text-[0.65rem] tracking-[0.12em] text-ink-muted">
                    {site.stack}
                  </span>
                </span>
                <span className="col-span-6 text-right font-mono text-[0.65rem] tracking-[0.12em] text-ink-muted sm:col-span-1">
                  {site.year}
                  <span className="ml-2 inline-block text-lilac-deep opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    ↗
                  </span>
                </span>
              </div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
