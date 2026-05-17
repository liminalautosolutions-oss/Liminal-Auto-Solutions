import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const segments = [
  {
    title: "Detailing Studios",
    desc: "We build digital systems that translate your meticulous craft into high-converting storefronts, showcasing paint correction and protection with cinematic clarity."
  },
  {
    title: "Garages & Workshops",
    desc: "From complex rebuilds to routine maintenance, we structure your expertise into trust-building narratives that capture high-intent local search traffic."
  },
  {
    title: "Dealerships",
    desc: "Elevate your showroom floor to the digital realm. We engineer premium discovery experiences that match the luxury and scale of the vehicles you move."
  },
  {
    title: "Car Spas",
    desc: "Position your spa as a premium destination. We create visually striking content and seamless booking workflows that drive repeat, loyal clientele."
  },
  {
    title: "Accessory Businesses",
    desc: "Whether wheels, exhaust systems, or bespoke modifications, we build e-commerce and showcase platforms engineered for speed and conversion."
  },
  {
    title: "PPF & Ceramic Studios",
    desc: "Communicating invisible protection requires visible proof. We capture the microscopic perfection of your work and rank it where enthusiasts search."
  },
];

export const Industry = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="industry" className="relative py-20 md:py-16 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-baseline justify-between mb-6"
        >
          <span className="font-mono-label text-ink-dim">04 / Industry</span>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 items-end mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-8 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight text-ink"
          >
            Built for a <span className="text-ember">single</span> industry.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="md:col-span-4 text-ink-dim leading-relaxed"
          >
            Every system, process and frame is tuned for automotive workflows.
            We don't adapt — we were built here.
          </motion.p>
        </div>

        <div className="neu-lg overflow-hidden">
          {segments.map((seg, i) => {
            const isExpanded = expandedIndex === i;
            return (
              <motion.div
                key={seg.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.06 }}
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
                className="group border-b border-border/50 last:border-b-0 flex flex-col cursor-pointer transition-colors duration-500"
              >
                <div className={`py-8 md:py-10 px-6 md:px-10 flex items-center justify-between transition-colors duration-500 ${isExpanded ? "bg-surface-raised" : "hover:bg-surface-raised/50"}`}>
                  <div className="flex items-center gap-8 md:gap-16">
                    <span className="font-mono-label text-ink-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`font-display text-3xl md:text-6xl transition-colors duration-500 ${isExpanded ? "text-ember" : "text-ink group-hover:text-ink/80"}`}>
                      {seg.title}
                    </span>
                  </div>
                  <span className={`font-mono-label transition-all duration-500 ${isExpanded ? "text-ember rotate-90" : "text-ink-faint group-hover:text-ember group-hover:translate-x-2"}`}>
                    →
                  </span>
                </div>
                
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden bg-surface-raised"
                    >
                      <div className="px-6 md:px-10 pb-10 pl-[5.5rem] md:pl-[8.5rem] max-w-4xl">
                        <p className="text-ink-dim leading-relaxed text-lg md:text-xl">
                          {seg.desc}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
