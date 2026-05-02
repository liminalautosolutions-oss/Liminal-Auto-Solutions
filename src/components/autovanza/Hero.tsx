import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero-car.jpg";

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={ref} id="top" className="relative h-screen w-full overflow-hidden bg-background">
      {/* Full-bleed car image */}
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroImg}
          alt="Orange McLaren 650S side profile studio shot"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          width={1920}
          height={1080}
        />
        {/* Top fade to bg */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-background to-transparent" />
      </motion.div>

      {/* Giant AUTOVANZA text — positioned above car */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="absolute inset-0 z-10 flex items-start justify-center pt-[18vh] md:pt-[14vh] pointer-events-none"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(4rem,14vw,13rem)] leading-none tracking-[-0.04em] text-foreground select-none"
        >
          AUTOVANZA
        </motion.h1>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />

      {/* Top meta */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute top-28 md:top-32 left-6 right-6 md:left-[calc((100vw-1400px)/2+1.5rem)] md:right-[calc((100vw-1400px)/2+1.5rem)] flex justify-between items-start text-xs font-mono-label text-ink-dim z-40"
      >
        <span>
          <span className="text-ember">●</span> Est. 2019 — Bengaluru
        </span>
        <span className="text-right hidden sm:block">
          Digital systems company<br />
          built only for automotive
        </span>
      </motion.div>
    </section>
  );
};
