import { Navigation } from "@/components/liminal/Navigation";
import { Hero } from "@/components/liminal/Hero";
import { ScrollReveal } from "@/components/liminal/ScrollReveal";
import { Capabilities } from "@/components/liminal/Capabilities";
import { Work } from "@/components/liminal/Work";
import { Industry } from "@/components/liminal/Industry";
import { Process } from "@/components/liminal/Process";
import { Ecosystem } from "@/components/liminal/Ecosystem";
import { Contact } from "@/components/liminal/Contact";
import { Footer } from "@/components/liminal/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Liminal — Built to Drive | Digital systems for automotive businesses";
    const desc = "Liminal is a systems-driven digital partner built only for automotive — detailing studios, workshops, dealerships. Content, visibility, CRM and performance.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  useEffect(() => {
    if (location.hash) {
      // Small timeout to ensure Framer Motion sections have mounted
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, [location]);

  return (
    <main className="relative bg-background text-foreground overflow-x-clip">
      <Navigation />
      <Hero />
      <ScrollReveal />
      <Capabilities />
      <Industry />
      <Work />
      <Process />
      <Ecosystem />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
