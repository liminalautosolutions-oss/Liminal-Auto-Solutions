import { motion } from "framer-motion";

export const About = () => {
  return (
    <section id="about" className="relative py-32 md:py-48">
      <div className="container">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-4"
          >
            <div className="font-mono-label text-ink-dim mb-4">◦ 06 / Foundation</div>
            <div className="font-mono-label text-ink-faint">Est. 2019</div>
          </motion.div>

          <div className="md:col-span-8 space-y-10">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-tight"
            >
              We exist because the automotive industry deserves a partner
              that <em className="text-ember">understands its floor</em>,
              not just its funnel.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-6 text-ink-dim leading-relaxed max-w-2xl"
            >
              <p>
                Since 2019, AutoVanza has lived inside the automotive ecosystem —
                in detailing bays, workshops, dealerships and showrooms. That
                proximity shaped a different kind of company: one that treats
                digital presence as infrastructure, not a campaign.
              </p>
              <p>
                We don't chase trends or promise overnight growth. We build
                structured, long-term systems for businesses that take their
                craft seriously and plan to be around for a long time.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
