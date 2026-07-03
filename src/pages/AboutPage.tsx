import { useEffect } from "react";
import { Navigation } from "@/components/liminal/Navigation";
import { Footer } from "@/components/liminal/Footer";
import { About } from "@/components/liminal/About";
import { Authority } from "@/components/liminal/Authority";

const AboutPage = () => {
  useEffect(() => {
    document.title = "Liminal — About | Digital systems for automotive businesses";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden pt-16 md:pt-20">
      <Navigation />
      <About />
      <Authority />
      <Footer />
    </main>
  );
};

export default AboutPage;
