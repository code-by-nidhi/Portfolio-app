import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Contributions } from "@/components/sections/contributions";
import { Hero } from "@/components/sections/hero";
import { MarqueeStrip } from "@/components/sections/marquee-strip";
import { Resume } from "@/components/sections/resume";
import { Services } from "@/components/sections/services";
import { Skills } from "@/components/sections/skills";
import { Why } from "@/components/sections/why";
import { Work } from "@/components/sections/work";
import { PortraitFlight } from "@/components/ui/portrait-flight";

export default function HomePage() {
  return (
    <>
      {/* The single portrait shared by the hero and the About section. */}
      <PortraitFlight />
      <Hero />
      <MarqueeStrip />
      <About />
      <Resume />
      <Services />
      <Why />
      <Work />
      <Contributions />
      <Skills />
      <Contact />
    </>
  );
}
