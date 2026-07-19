import { motion } from "framer-motion";

const stats = [
  { value: "2019", label: "Founded" },
  { value: "400+", label: "Businesses in ecosystem" },
  { value: "6yrs", label: "Automotive exposure" },
  { value: "100%", label: "Industry-specific focus" },
];

export const Authority = () => {
  return (
    <section className="relative py-16 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-baseline justify-between mb-16 md:mb-24"
        >
          <span className="font-mono-label text-ink-dim">07 / Authority</span>
          <span className="font-mono-label text-ink-faint hidden md:block">
            Credibility, observed — not claimed
          </span>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="neu p-8 md:p-10"
            >
              <div className="font-mono-label text-ink-faint mb-6">
                0{i + 1}
              </div>
              <div className="font-display text-4xl md:text-6xl text-ink leading-none">
                {s.value}
              </div>
              <div className="mt-4 text-sm text-ink-dim max-w-[14ch]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
