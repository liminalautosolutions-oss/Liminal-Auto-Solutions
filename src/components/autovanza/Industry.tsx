import { motion } from "framer-motion";

const segments = [
  "Detailing Studios",
  "Garages & Workshops",
  "Dealerships",
  "Car Spas",
  "Accessory Businesses",
  "PPF & Ceramic Studios",
];

export const Industry = () => {
  return (
    <section id="industry" className="relative py-32 md:py-48">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-baseline justify-between mb-6"
        >
          <span className="font-mono-label text-ink-dim">◦ 04 / Industry</span>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 items-end mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-8 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight"
          >
            Built for a <em className="text-ember">single</em> industry.
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

        <div className="border-t border-border">
          {segments.map((seg, i) => (
            <motion.div
              key={seg}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.06 }}
              className="group border-b border-border py-8 md:py-10 flex items-center justify-between cursor-default hover:bg-surface-raised transition-colors duration-500 px-2 md:px-4"
            >
              <div className="flex items-center gap-8 md:gap-16">
                <span className="font-mono-label text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-3xl md:text-6xl text-ink group-hover:text-ember transition-colors duration-500">
                  {seg}
                </span>
              </div>
              <span className="font-mono-label text-ink-faint group-hover:text-ember group-hover:translate-x-2 transition-all duration-500">
                →
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
