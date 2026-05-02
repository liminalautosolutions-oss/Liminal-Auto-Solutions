import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero-car.png";

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const carY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const carScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={ref} id="top" className="relative h-screen w-full overflow-hidden bg-background">
      {/* Subtle neumorphic ambient glow */}
      <div className="absolute inset-0 bg-gradient-radial-ember opacity-30 pointer-events-none" />

      {/* Giant AUTOVANZA text */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(4rem,15vw,14rem)] leading-none tracking-[-0.04em] text-ink select-none"
        >
          AUTOVANZA
        </motion.h1>
      </motion.div>

      {/* Car image — positioned in lower portion */}
      <motion.div
        style={{ y: carY, scale: carScale }}
        className="absolute bottom-0 left-0 right-0 z-20 flex justify-center"
      >
        <motion.img
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          src={heroImg}
          alt="Premium orange McLaren sports car"
          className="w-full max-w-[85vw] md:max-w-[70vw] object-contain drop-shadow-2xl mix-blend-multiply"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* Subtle bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-30 pointer-events-none" />

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
