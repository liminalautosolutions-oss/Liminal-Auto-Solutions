import { motion } from "framer-motion";
import { useState } from "react";

export const Contact = () => {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    const formData = new FormData(e.currentTarget);
    
    // Web3Forms Access Key
    formData.append("access_key", "9ce9c7a5-a601-4d65-9468-31541c5767bc");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      if (response.ok) {
        setFormStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus("error");
      }
    } catch (err) {
      setFormStatus("error");
    }
  };
  return (
    <section id="contact" className="relative py-16 md:py-32 overflow-hidden bg-background">
      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-baseline justify-between mb-4 md:mb-6"
          >
            <span className="font-mono-label text-ink-dim">05 / Contact</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.5rem,10vw,10rem)] leading-[0.9] tracking-tighter max-w-5xl text-ink"
          >
          Let's <span className="text-ember-gradient">build</span> something that lasts.
        </motion.h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start mt-12">
          
          {/* Left Column - Form */}
          <motion.form 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col gap-8 w-full"
            onSubmit={handleSubmit}
          >
            {/* Honeypot Spam Protection */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 relative group">
                <input type="text" name="name" id="name" placeholder=" " required className="peer w-full bg-transparent border-b border-ink/20 py-4 font-mono-label text-ink focus:outline-none focus:border-ember transition-colors duration-300" />
                <label htmlFor="name" className="absolute left-0 top-4 font-mono-label text-ink-faint transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-ember peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-ink-dim cursor-text uppercase tracking-widest">Name</label>
              </div>
              <div className="flex-1 relative group">
                <input type="email" name="email" id="email" placeholder=" " required className="peer w-full bg-transparent border-b border-ink/20 py-4 font-mono-label text-ink focus:outline-none focus:border-ember transition-colors duration-300" />
                <label htmlFor="email" className="absolute left-0 top-4 font-mono-label text-ink-faint transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-ember peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-ink-dim cursor-text uppercase tracking-widest">Email</label>
              </div>
            </div>
            
            <div className="relative group mt-2">
              <input type="text" name="company" id="company" placeholder=" " className="peer w-full bg-transparent border-b border-ink/20 py-4 font-mono-label text-ink focus:outline-none focus:border-ember transition-colors duration-300" />
              <label htmlFor="company" className="absolute left-0 top-4 font-mono-label text-ink-faint transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-ember peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-ink-dim cursor-text uppercase tracking-widest">Company (Optional)</label>
            </div>

            <div className="relative group mt-2">
              <textarea name="message" id="message" rows={4} placeholder=" " required className="peer w-full bg-transparent border-b border-ink/20 py-4 font-mono-label text-ink focus:outline-none focus:border-ember transition-colors duration-300 resize-none" />
              <label htmlFor="message" className="absolute left-0 top-4 font-mono-label text-ink-faint transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-ember peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-ink-dim cursor-text uppercase tracking-widest">Project Details</label>
            </div>

            <button 
              type="submit" 
              disabled={formStatus === "submitting" || formStatus === "success"}
              className="group self-start inline-flex items-center gap-4 mt-6 px-10 py-5 bg-ink text-surface rounded-full hover:bg-ember disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-500"
            >
              <span className="font-mono-label text-sm uppercase tracking-widest">
                {formStatus === "submitting" ? "Sending..." : formStatus === "success" ? "Message Sent" : "Send Inquiry"}
              </span>
              {formStatus === "idle" && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="transform group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
                </svg>
              )}
            </button>
            {formStatus === "error" && (
              <p className="text-red-500 font-mono-label text-xs mt-2">Failed to send message. Please try again.</p>
            )}
            {formStatus === "success" && (
              <p className="text-ember font-mono-label text-xs mt-2">Thank you! We will get back to you shortly.</p>
            )}
          </motion.form>

          {/* Right Column - Contact Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {[
              { label: "Email", value: "liminalautosolutions@gmail.com", href: "mailto:liminalautosolutions@gmail.com" },
              { label: "WhatsApp", value: "+971 56 714 2180", href: "https://wa.me/971567142180" },
              { label: "Location", value: "United Kingdom", href: "#" },
            ].map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group neu p-8 hover:shadow-none transition-shadow duration-500"
              >
                <div className="font-mono-label text-ink-faint mb-4 uppercase tracking-widest text-xs">{c.label}</div>
                <div className="font-display text-2xl text-ink group-hover:text-ember transition-colors duration-500">
                  {c.value}
                </div>
                <div className="mt-6 w-8 h-px bg-ink-faint group-hover:w-16 group-hover:bg-ember transition-all duration-500" />
              </motion.a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
