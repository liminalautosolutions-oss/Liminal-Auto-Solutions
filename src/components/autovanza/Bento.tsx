import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import imgPaint from "@/assets/bento-wheel.jpg";
import imgWheel from "@/assets/bento-paint.jpg";
import imgCar from "@/assets/work-detail.jpg";

export const Bento = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <section id="framework" ref={ref} className="relative py-32 md:py-48 bg-background overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-baseline justify-between mb-6"
        >
          <span className="font-mono-label text-ink-dim">02 / Framework</span>
          <span className="font-mono-label text-ink-faint hidden md:block">
            A single operating surface
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.025em] max-w-5xl mb-16 md:mb-24 text-ink"
        >
          One system. <span className="text-ember">Every surface</span> of your business.
        </motion.h2>

        <div className="grid grid-cols-6 auto-rows-[11rem] md:auto-rows-[14rem] gap-4 md:gap-6">
          {/* Large feature */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-6 md:col-span-4 row-span-2 relative overflow-hidden neu-lg group"
          >
            <motion.img
              style={{ y: y1, scale: 1.12 }}
              src={imgCar}
              alt="Dashboard"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-1000 rounded-[var(--radius)]"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/60 to-transparent rounded-[var(--radius)]" />
            <div className="relative h-full p-8 md:p-12 flex flex-col justify-between">
              <span className="font-mono-label text-ember">Identity</span>
              <div className="max-w-md">
                <h3 className="font-display text-3xl md:text-5xl text-ink leading-[1.02] tracking-tight mb-4">
                  Positioning that survives a noisy market.
                </h3>
                <p className="text-ink-dim text-sm md:text-base leading-relaxed">
                  We translate craft into clarity — a voice, a visual language, a posture that reads instantly.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Metric tile */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-3 md:col-span-2 row-span-1 neu p-6 md:p-8 flex flex-col justify-between"
          >
            <span className="font-mono-label text-ink-faint">Presence</span>
            <div>
              <div className="font-display text-5xl md:text-6xl text-ink leading-none">24/7</div>
              <div className="mt-2 text-xs text-ink-dim">Always-on content & discovery systems</div>
            </div>
          </motion.div>

          {/* Visual tile */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-3 md:col-span-2 row-span-1 relative overflow-hidden neu group"
          >
            <motion.img
              style={{ y: y2, scale: 1.12 }}
              src={imgPaint}
              alt="Water beads on paint"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover rounded-[var(--radius)]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent rounded-[var(--radius)]" />
            <div className="relative h-full p-6 md:p-8 flex items-end">
              <span className="font-display text-2xl md:text-3xl text-ink leading-tight">
                Cinematic craft.
              </span>
            </div>
          </motion.div>

          {/* CRM tile */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-6 md:col-span-2 row-span-1 neu p-6 md:p-8 flex flex-col justify-between"
          >
            <span className="font-mono-label text-ink-faint">Operations</span>
            <div>
              <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight mb-2">
                CRM & pipeline hygiene
              </h3>
              <p className="text-xs md:text-sm text-ink-dim leading-relaxed">
                Structured intake, follow-up and retention — engineered, not improvised.
              </p>
            </div>
          </motion.div>

          {/* Wheel visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-3 md:col-span-2 row-span-2 relative overflow-hidden neu group"
          >
            <motion.img
              style={{ y: y3, scale: 1.12 }}
              src={imgWheel}
              alt="Forged wheel"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover rounded-[var(--radius)]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/80 rounded-[var(--radius)]" />
            <div className="relative h-full p-6 md:p-8 flex flex-col justify-between">
              <span className="font-mono-label text-ink">Performance</span>
              <h3 className="font-display text-2xl md:text-4xl text-ink leading-tight">
                Engineered for motion.
              </h3>
            </div>
          </motion.div>

          {/* Search tile */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-3 md:col-span-2 row-span-1 neu p-6 md:p-8 flex flex-col justify-between"
          >
            <span className="font-mono-label text-ember">Visibility</span>
            <div>
              <div className="font-display text-3xl md:text-4xl text-ink leading-none">Local & intent</div>
              <p className="mt-2 text-xs text-ink-dim">Ranked where buyers actually search.</p>
            </div>
          </motion.div>

          {/* Wide CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-6 md:col-span-4 row-span-1 neu-lg p-6 md:p-10 flex items-center justify-between gap-6"
          >
            <div>
              <h3 className="font-display text-2xl md:text-4xl text-ink leading-tight">
                Built only for <span className="text-ember">automotive</span>.
              </h3>
              <p className="mt-2 text-xs md:text-sm text-ink-dim">
                No generalists, no templates, no noise.
              </p>
            </div>
            <a
              href="#contact"
              className="shrink-0 font-mono-label text-ink neu-sm px-4 py-2.5 hover:shadow-none transition-all duration-300"
            >
              Engage →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
