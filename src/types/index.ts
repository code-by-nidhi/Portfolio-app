/** Icon keys resolved by `components/ui/icon.tsx`. */
export type IconName =
  | "code"
  | "database"
  | "chart-column"
  | "chart-line"
  | "brain"
  | "sparkles"
  | "server"
  | "dashboard"
  | "table"
  | "spreadsheet"
  | "gauge"
  | "git"
  | "workflow"
  | "layers"
  | "boxes"
  | "cpu"
  | "terminal"
  | "briefcase"
  | "graduation"
  | "music"
  | "dance"
  | "globe"
  | "handshake"
  | "zap"
  | "palette"
  | "cart"
  | "wrench";

export type Discipline = "engineering" | "analytics";

export interface NavItem {
  label: string;
  href: string;
  /** Opens in a new tab instead of scrolling to a section. */
  external?: boolean;
}

export interface Track {
  id: Discipline;
  eyebrow: string;
  title: string;
  summary: string;
  icon: IconName;
  /** Tailwind token stem, e.g. "lilac" -> bg-lilac-mist / text-lilac-deep. */
  accent: "lilac" | "mint" | "blush" | "sky" | "sand";
  capabilities: string[];
  tools: string[];
}

export interface Skill {
  name: string;
  /** Logo file in /public/skills. */
  logo: string;
}

export interface Project {
  id: string;
  title: string;
  discipline: Discipline;
  category: string;
  summary: string;
  detail: string;
  tech: string[];
  highlights: string[];
  metrics?: { label: string; value: string }[];
  repoUrl?: string;
  liveUrl?: string;
  /** Further deployments beside the main site, e.g. an admin portal or API docs. */
  extraLinks?: { label: string; href: string }[];
  accent: Track["accent"];
  status: string;
  /** Year or range shown beside the project index, e.g. "2025—26". */
  period?: string;
}

/** A production site I contributed to, listed in the Contributions section. */
export interface Contribution {
  id: string;
  title: string;
  description: string;
  stack: string;
  url: string;
  year: string;
}
