import { motion } from "framer-motion";

const steps = [
  { n: "01", title: "Capture", body: "On-ground presence. We document the craft, the workshop, the product — raw material that actually represents your business." },
  { n: "02", title: "Craft", body: "Editorial-grade content, film, and narrative. Shaped to the standards the automotive world demands." },
  { n: "03", title: "Position", body: "Placed where decisions happen — search, discovery, social surfaces and owned channels, with intent." },
  { n: "04", title: "Optimize", body: "CRM, workflows and feedback loops that compound attention into structured, measurable outcomes." },
];

export const Process = () => {
  return (
    <section className="relative py-12 md:py-20 bg-surface-raised">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6 font-mono-label text-ink-dim"
        >
          04 / Operating Model
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight max-w-4xl mb-12 md:mb-28 text-ink"
        >
          A four-stage <span className="text-ember">system</span>.
        </motion.h2>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="neu p-6 md:p-10 relative min-h-[18rem] md:min-h-[22rem] flex flex-col"
            >
              <div className="font-mono-label text-ember mb-8">{s.n}</div>
              <h3 className="font-display text-4xl md:text-5xl text-ink mb-6 leading-none">{s.title}</h3>
              <p className="text-ink-dim leading-relaxed text-sm mt-auto">{s.body}</p>
              <div className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-ember/40" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
