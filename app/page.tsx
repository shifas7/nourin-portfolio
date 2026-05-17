import Hero from "@/sections/Hero";
import PinnedInsights from "@/sections/PinnedInsights";
import DigitalDiary from "@/sections/DigitalDiary";
import Results from "@/sections/Results";
import Services from "@/sections/Services";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";

export default function HomePage() {
  return (
    <main id="main-content" aria-label="Nourin Nassar Portfolio">
      <Hero />
      <PinnedInsights />
      <DigitalDiary />
      <Results />
      <Services />
      <Testimonials />
      <Contact />
    </main>
  );
}
