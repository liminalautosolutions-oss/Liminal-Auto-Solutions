import { Navigation } from "@/components/autovanza/Navigation";
import { Hero } from "@/components/autovanza/Hero";
import { ScrollReveal } from "@/components/autovanza/ScrollReveal";
import { Authority } from "@/components/autovanza/Authority";
import { Bento } from "@/components/autovanza/Bento";
import { Capabilities } from "@/components/autovanza/Capabilities";
import { Work } from "@/components/autovanza/Work";
import { Industry } from "@/components/autovanza/Industry";
import { About } from "@/components/autovanza/About";
import { Process } from "@/components/autovanza/Process";
import { Ecosystem } from "@/components/autovanza/Ecosystem";
import { Contact } from "@/components/autovanza/Contact";
import { Footer } from "@/components/autovanza/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "AutoVanza — Built to Drive | Digital systems for automotive businesses";
    const desc = "AutoVanza is a systems-driven digital partner built only for automotive — detailing studios, workshops, dealerships. Content, visibility, CRM and performance.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  return (
    <main className="relative bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <Hero />
      <ScrollReveal />
      <Authority />
      <Bento />
      <Capabilities />
      <Work />
      <Industry />
      <About />
      <Process />
      <Ecosystem />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
