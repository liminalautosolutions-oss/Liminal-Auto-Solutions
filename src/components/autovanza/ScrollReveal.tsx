import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const paragraph =
  "AutoVanza is not an agency. We are a systems-driven partner built entirely around the automotive industry — shaping how detailing studios, workshops and dealerships appear, operate and grow in a digital landscape.";

const Word = ({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) => {
  const opacity = useTransform(progress, range, [0.08, 1]);
  const y = useTransform(progress, range, [14, 0]);
  const blur = useTransform(progress, range, [6, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const isAccent = word === "agency.";

  return (
    <motion.span
      style={{ opacity, y, filter }}
      className="inline-block mr-[0.22em] will-change-transform"
    >
      {isAccent ? <span className="italic text-ember">{word}</span> : word}
    </motion.span>
  );
};

export const ScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.05"],
  });

  // Parallax label + radial light
  const labelY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.3]);

  const words = paragraph.split(" ");

  return (
    <section
      ref={ref}
      className="relative py-40 md:py-72 bg-surface overflow-hidden"
    >
      {/* Parallax radial glow */}
      <motion.div
        style={{ y: glowY, scale: glowScale }}
        className="absolute inset-0 bg-gradient-radial-ember opacity-50 pointer-events-none"
      />

      {/* Fine horizontal hairline */}
      <div className="absolute top-0 left-0 right-0 h-px hair-divider" />

      <div className="container relative">
        <motion.div
          style={{ y: labelY }}
          className="flex items-baseline justify-between mb-16 md:mb-24"
        >
          <span className="font-mono-label text-ember">⌁ Manifesto</span>
          <span className="font-mono-label text-ink-faint hidden md:block">
            ◦ On the record
          </span>
        </motion.div>

        <p className="font-display text-[clamp(1.9rem,5.8vw,4.75rem)] leading-[1.12] tracking-[-0.025em] max-w-6xl">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1.4 / words.length;
            return (
              <Word
                key={i}
                word={word}
                progress={scrollYProgress}
                range={[start, Math.min(end, 1)]}
              />
            );
          })}
        </p>
      </div>
    </section>
  );
};
