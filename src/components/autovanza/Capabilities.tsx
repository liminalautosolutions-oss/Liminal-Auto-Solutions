import { motion } from "framer-motion";

const pillars = [
  {
    n: "01",
    title: "Content ecosystems",
    body: "Sustained content frameworks that reflect craft, process and identity — not one-off posts.",
  },
  {
    n: "02",
    title: "Video production",
    body: "Cinematic, workshop-grade visuals shot on location — the way automotive deserves to be seen.",
  },
  {
    n: "03",
    title: "Digital visibility",
    body: "Search, Google presence and location visibility built around how buyers actually find automotive businesses.",
  },
  {
    n: "04",
    title: "Performance systems",
    body: "Structured lead acquisition infrastructure — engineered, measured, owned.",
  },
  {
    n: "05",
    title: "CRM & workflow",
    body: "Operational systems that turn attention into organised pipelines and repeat clients.",
  },
  {
    n: "06",
    title: "Brand positioning",
    body: "Clarifying who you are in a crowded, commoditised market — with intent and structure.",
  },
];

export const Capabilities = () => {
  return (
    <section id="capabilities" className="relative py-32 md:py-48">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-baseline justify-between mb-6"
        >
          <span className="font-mono-label text-ink-dim">◦ 02 / Capabilities</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight max-w-4xl mb-20 md:mb-28"
        >
          Six disciplines, one <em className="italic text-ember">operating system</em>.
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {pillars.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-surface p-8 md:p-12 hover:bg-surface-raised transition-colors duration-700 relative"
            >
              <div className="flex items-start justify-between mb-10">
                <span className="font-mono-label text-ink-faint">{p.n}</span>
                <span className="w-8 h-px bg-ink-faint group-hover:w-16 group-hover:bg-ember transition-all duration-700" />
              </div>
              <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">
                {p.title}
              </h3>
              <p className="text-ink-dim leading-relaxed max-w-md">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
