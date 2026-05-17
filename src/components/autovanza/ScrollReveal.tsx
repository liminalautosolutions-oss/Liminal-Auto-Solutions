import { motion, useScroll, useTransform, MotionValue, useSpring } from "framer-motion";
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
  const rawOpacity = useTransform(progress, range, [0.08, 1]);
  const opacity = useSpring(rawOpacity, { stiffness: 80, damping: 20 });
  const rawY = useTransform(progress, range, [20, 0]);
  const y = useSpring(rawY, { stiffness: 80, damping: 20 });
  const rawScale = useTransform(progress, range, [0.95, 1]);
  const scale = useSpring(rawScale, { stiffness: 80, damping: 20 });
  const isAccent = word === "agency.";

  return (
    <motion.span
      style={{ opacity, y, scale }}
      className="inline-block mr-[0.25em] will-change-transform origin-bottom-left"
    >
      {isAccent ? <span className="text-ember font-display">{word}</span> : word}
    </motion.span>
  );
};

export const ScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.4"],
  });

  const labelY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.04, 0]);

  const words = paragraph.split(" ");

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-20 bg-background overflow-hidden"
    >
      {/* Subtle animated glow */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-gradient-radial-ember pointer-events-none"
      />

      <div className="absolute top-0 left-0 right-0 h-px hair-divider" />

      <div className="container relative">
        <motion.div
          style={{ y: labelY }}
          className="flex items-baseline justify-between mb-16 md:mb-24"
        >
          <span className="font-mono-label text-ember">Manifesto</span>
          <span className="font-mono-label text-ink-faint hidden md:block">
            On the record
          </span>
        </motion.div>

        <p className="font-display text-[clamp(1.8rem,5.5vw,4.5rem)] leading-[1.15] tracking-[-0.025em] max-w-6xl text-ink">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1.6 / words.length;
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
