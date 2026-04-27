import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const paragraph =
  "AutoVanza is not an agency. We are a systems-driven partner built entirely around the automotive industry — shaping how detailing studios, workshops and dealerships appear, operate and grow in a digital landscape.";

export const ScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.15"],
  });

  const words = paragraph.split(" ");

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-56 bg-surface overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial-ember opacity-40 pointer-events-none" />

      <div className="container relative">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-mono-label text-ember mb-10 md:mb-16"
        >
          ⌁ Manifesto
        </motion.p>

        <p className="font-display text-[clamp(1.75rem,5.5vw,4.5rem)] leading-[1.15] tracking-tight max-w-6xl">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);
            return (
              <motion.span
                key={i}
                style={{ opacity }}
                className="inline-block mr-[0.2em]"
              >
                {word === "agency." ? (
                  <span className="italic text-ember">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            );
          })}
        </p>
      </div>
    </section>
  );
};
