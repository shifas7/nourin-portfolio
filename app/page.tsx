import Nav from "@/components/Nav";
import Hero from "@/sections/Hero";
import CaseStudies from "@/sections/CaseStudies";
import Services from "@/sections/Services";
import Process from "@/sections/Process";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <CaseStudies />
        <Services />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
