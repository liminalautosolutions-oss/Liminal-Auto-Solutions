import { motion } from "framer-motion";

export const About = () => {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="container">
        {/* Top Grid: Labels & Big Heading */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-4 flex flex-col justify-start"
          >
            <span className="font-mono-label text-ember mb-2">06 / Foundation</span>
            <span className="font-mono-label text-ink-faint">Est. 2019</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-8"
          >
            <h2 className="font-display text-[clamp(2rem,5.5vw,4.2rem)] leading-[1.05] tracking-tighter text-ink uppercase">
              We exist to build digital systems for the automotive craft.
            </h2>
          </motion.div>
        </div>

        {/* Bottom Grid: Text/CTA & Reference Image */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Paragraphs and CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="md:col-span-4 space-y-8 flex flex-col items-start"
          >
            <div className="space-y-6 text-ink-dim leading-relaxed text-sm md:text-base">
              <p>
                Since 2019, we design structured digital infrastructure and cinematic
                content for workshops, studios, and dealerships that plan to lead.
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-3 font-mono-label text-ink border border-ink/20 px-8 py-3.5 rounded-lg relative overflow-hidden group hover:border-ember hover:text-ember transition-all duration-300 cursor-pointer"
            >
              <span>Explore solutions</span>
              <span className="text-base group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </motion.div>

          {/* Reference Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-8 overflow-hidden rounded-2xl shadow-lg border border-border bg-surface"
          >
            <img
              src="/images/PPFREFERENCE.jpg"
              alt="Automotive craft and protection detail work"
              className="w-full aspect-[16/10] object-cover hover:scale-[1.02] transition-transform duration-700"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
