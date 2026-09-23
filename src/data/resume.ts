import type { IconName, Track } from "@/types";

export interface ResumeEntry {
  period: string;
  role: string;
  org: string;
  points: string[];
}

/** Left column of the résumé panel. Mirrors `public/resume.pdf`. */
export const experiences: ResumeEntry[] = [
  {
    period: "Feb 2025 — Present",
    role: "IT Trainer",
    org: "Techcadd Computer Education · Phagwara",
    points: [
      "Web development training for 40+ students",
      "Curriculum, assignments & project mentoring",
      "Built & maintain techcaddjalandhar.com and techcaddludhiana.com",
    ],
  },
  {
    period: "Sep 2024 — Jan 2025",
    role: "Software Developer Trainee",
    org: "Numetry Technologies · Pune",
    points: [
      "Full-stack MERN e-commerce application",
      "Reusable, responsive React components",
      "REST API integration for products, cart & CRUD",
    ],
  },
  {
    period: "Jan 2024 — Jun 2024",
    role: "MERN Stack Developer Trainee",
    org: "Omninos Solutions · Mohali",
    points: [
      "Multiple full-stack MERN applications",
      "RESTful APIs wired to dynamic React frontends",
      "Responsive layouts & UI animations",
    ],
  },
];

/** Middle column. */
export const formations: ResumeEntry[] = [
  {
    period: "Jun 2020 — Jun 2024",
    role: "B.Tech Computer Science & Engineering",
    org: "Guru Nanak Dev Engineering College · Ludhiana",
    points: ["GPA 8.74 / 10.0"],
  },
];

/** Right column, top. */
export const hobbies: {
  icon: IconName;
  label: string;
  accent: Track["accent"];
}[] = [
  { icon: "music", label: "Singing", accent: "blush" },
  { icon: "dance", label: "Dancing", accent: "sand" },
  { icon: "graduation", label: "Teaching", accent: "sky" },
];

/** Left column, bottom — the tool wall. */
export const aptitudes: string[] = [
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "MySQL",
  "JavaScript",
  "SQL",
  "Python",
  "Java",
  "pandas",
  "NumPy",
  "Power BI",
  "Git",
  "Postman",
  "Figma",
];
