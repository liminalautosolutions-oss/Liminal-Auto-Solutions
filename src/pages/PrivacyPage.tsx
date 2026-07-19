import { useEffect } from "react";
import { Navigation } from "@/components/liminal/Navigation";
import { Footer } from "@/components/liminal/Footer";

const PrivacyPage = () => {
  useEffect(() => {
    document.title = "Liminal — Privacy Policy";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-ember selection:text-ink relative">
      <Navigation />

      <section className="pt-32 pb-24 md:pt-48 md:pb-32 container relative z-10 max-w-4xl mx-auto">
        <h1 className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.9] tracking-tight text-ink mb-12">
          Privacy Policy
        </h1>
        
        <div className="font-mono-label text-ink-dim space-y-8 text-sm md:text-base leading-relaxed uppercase tracking-widest">
          <p>
            This Privacy Policy describes how Liminal ("we", "us", or "our") collects, uses, and protects your information when you use our website.
          </p>
          
          <h2 className="text-ember text-xl mb-4 mt-12">1. Information We Collect</h2>
          <p>
            When you use our Contact form, we collect the following Personally Identifiable Information (PII): Name, Email Address, and Company details.
          </p>

          <h2 className="text-ember text-xl mb-4 mt-12">2. How We Use Your Information</h2>
          <p>
            The information collected is used strictly for communication regarding your project inquiry. We do not sell, trade, or rent your personal information to third parties.
          </p>

          <h2 className="text-ember text-xl mb-4 mt-12">3. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure.
          </p>

          <h2 className="text-ember text-xl mb-4 mt-12">4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at liminalautosolutions@gmail.com.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PrivacyPage;
