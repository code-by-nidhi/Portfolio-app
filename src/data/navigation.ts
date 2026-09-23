import { profile } from "@/data/profile";
import type { NavItem } from "@/types";

/** Order mirrors the order of the sections on the page. */
export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Resume", href: profile.resumeUrl, external: true },
  { label: "Services", href: "#services" },
  { label: "Why me", href: "#why" },
  { label: "Work", href: "#work" },
  { label: "Contributions", href: "#contributions" },
  { label: "Skills", href: "#skills" },
];

export const marqueeItems: string[] = [
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "SQL",
  "Python",
  "pandas",
  "Power BI",
  "Redis",
  "Render",
];
