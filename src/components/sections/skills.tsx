import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { skills } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center">
          <span className="inline-block rounded-full border border-hairline bg-lilac-mist px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-lilac-deep">
            Skills
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl leading-tight text-ink sm:text-4xl">
            The skills, tools and technologies I am really good at
          </h2>
        </Reveal>

        {/* Flex rather than grid so a short last row sits centred. */}
        <RevealGroup className="mt-14 flex flex-wrap justify-center gap-y-10">
          {skills.map((skill) => (
            <RevealItem key={skill.name} className="w-1/3 px-2 sm:w-1/5 lg:w-1/8">
              <div className="group flex flex-col items-center gap-3 text-center">
                <span className="flex size-16 items-center justify-center rounded-2xl border border-transparent transition-all duration-300 group-hover:-translate-y-1 group-hover:border-hairline group-hover:bg-surface group-hover:shadow-[var(--depth-shadow)]">
                  {/* Local SVGs: next/image adds nothing for vector files. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/skills/${skill.logo}`}
                    alt=""
                    width={44}
                    height={44}
                    loading="lazy"
                    className="size-11 object-contain"
                  />
                </span>
                <span className="text-xs font-medium text-ink-soft">
                  {skill.name}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
