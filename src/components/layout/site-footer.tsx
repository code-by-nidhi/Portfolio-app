import { Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { GithubMark, LinkedinMark } from "@/components/ui/brand-icons";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-hairline bg-shell/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_auto]">
        <div>
          <p className="font-display text-2xl text-ink">
            {profile.wordmark}
            <span className="text-lilac">.</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
            {profile.subheadline}
          </p>
        </div>

        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-ink-muted">
            Elsewhere
          </p>
          <div className="mt-4 flex gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="btn-3d btn-3d-soft p-2.5 text-ink-soft"
            >
              <GithubMark className="size-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="btn-3d btn-3d-soft p-2.5 text-ink-soft"
            >
              <LinkedinMark className="size-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="btn-3d btn-3d-soft p-2.5 text-ink-soft"
            >
              <Mail className="size-4" strokeWidth={1.7} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with Next.js and
            Tailwind CSS.
          </p>
          <p className="font-mono tracking-wide">{profile.shortRole}</p>
        </div>
      </div>
    </footer>
  );
}
