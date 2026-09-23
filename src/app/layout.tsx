import type { Metadata, Viewport } from "next";
import {
  Inter,
  JetBrains_Mono,
  Playfair_Display,
  Poppins,
} from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AmbientScene } from "@/components/ui/ambient-scene";
import { profile } from "@/data/profile";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // TODO: point this at the real domain before deploying — it is what makes
  // the canonical URL and social image URLs absolute.
  metadataBase: new URL(profile.siteUrl),
  alternates: { canonical: "/" },
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.bio,
  keywords: [
    "MERN Stack Developer",
    "Data Analyst",
    "React Developer",
    "Next.js Developer",
    "Node.js REST API",
    "SQL Analyst",
    "Power BI Dashboards",
    "Full-Stack Developer",
    "1-on-1 coding coach",
    "Freelance web developer",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.subheadline,
    url: "/",
    siteName: `${profile.name} — Portfolio`,
    type: "profile",
    locale: "en_US",
    images: [{ url: "/portrait.png", width: 905, height: 1198, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.subheadline,
    images: ["/portrait.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/** Person structured data, so search engines read the role and availability. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: profile.bio,
  email: `mailto:${profile.email}`,
  image: `${profile.siteUrl}/portrait.png`,
  url: profile.siteUrl,
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: [
    "MERN stack development",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "Data analysis",
    "SQL",
    "Python",
    "Power BI",
    "Tableau",
  ],
  seeks: {
    "@type": "Demand",
    name: "Full-time roles (national or international) and freelance projects",
  },
};

const SCROLL_TO_TOP = `(function(){try{
if("scrollRestoration" in history)history.scrollRestoration="manual";
if(location.hash)history.replaceState(null,"",location.pathname+location.search);
var top=function(){window.scrollTo({top:0,left:0,behavior:"instant"})};
top();window.addEventListener("load",top);window.addEventListener("pageshow",top);
}catch(e){}})();`;

export const viewport: Viewport = {
  themeColor: "#faf8f5",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh font-sans">
        <script
          // Runs before first paint: always open at the top on refresh instead
          // of the browser restoring the old scroll position or jumping to a
          // leftover #section hash. `behavior: "instant"` overrides the
          // smooth scrolling set on <html>.
          dangerouslySetInnerHTML={{ __html: SCROLL_TO_TOP }}
        />
        <script
          type="application/ld+json"
          // Static, developer-authored object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <AmbientScene />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
