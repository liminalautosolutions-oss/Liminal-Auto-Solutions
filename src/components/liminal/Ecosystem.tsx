import { motion } from "framer-motion";

const row = ["Detailing", "Workshops", "Dealerships", "PPF", "Ceramic", "Accessories", "Car Spas", "Restoration"];

export const Ecosystem = () => {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="container mb-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-mono-label text-ink-dim"
        >
          05 / Ecosystem presence
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="marquee-track flex gap-16 whitespace-nowrap">
          {[...row, ...row, ...row].map((w, i) => (
            <span
              key={i}
              className="font-display text-5xl md:text-8xl text-ink-faint hover:text-ember transition-colors duration-500"
            >
              {w} <span className="text-ember">·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container mt-10 flex justify-between text-xs font-mono-label text-ink-faint">
        <span>400+ businesses in ecosystem exposure</span>
        <span className="hidden md:block">Bengaluru / India</span>
      </div>
    </section>
  );
};
