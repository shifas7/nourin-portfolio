import Nav from "@/components/Nav";
import Hero from "@/sections/Hero";
import Clients from "@/sections/Clients";
import CaseStudies from "@/sections/CaseStudies";
import Campaigns from "@/sections/Campaigns";
import Services from "@/sections/Services";
import Process from "@/sections/Process";
import About from "@/sections/About";
import CtaBand from "@/sections/CtaBand";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";
import PhoneLayer from "@/components/phone/PhoneLayer";
import MobileBar from "@/components/MobileBar";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Clients />
        <CaseStudies />
        <Campaigns />
        <Services />
        <Process />
        <About />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <PhoneLayer />
      <MobileBar />
    </>
  );
}
