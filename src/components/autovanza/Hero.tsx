import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/work-detail.jpg";

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section ref={ref} id="top" className="relative h-screen w-full overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Automotive detailing studio"
          className="w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-surface/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-transparent to-surface" />
        <div className="absolute inset-0 bg-gradient-radial-ember" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 h-full container flex flex-col justify-end pb-20 md:pb-28"
      >
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-28 md:top-32 left-6 right-6 md:left-[calc((100vw-1400px)/2+1.5rem)] md:right-[calc((100vw-1400px)/2+1.5rem)] flex justify-between items-start text-xs font-mono-label text-ink-dim"
        >
          <span className="max-w-[12rem]">
            <span className="text-ember">●</span> Est. 2019 — Bengaluru
          </span>
          <span className="max-w-[14rem] text-right hidden sm:block">
            A digital systems company <br />
            built only for automotive
          </span>
        </motion.div>

        {/* Headline */}
        <div className="max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono-label text-ember mb-6"
          >
            AutoVanza Solutions
          </motion.p>

          <h1 className="font-display text-[clamp(3.5rem,11vw,11rem)] leading-[0.92] tracking-tighter text-ink">
            {["Built", "to", "Drive."].map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.3 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-[0.3em] last:mr-0"
              >
                {i === 2 ? <em className="italic text-ember-gradient">{word}</em> : word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-8 max-w-xl text-base md:text-lg text-ink-dim leading-relaxed"
          >
            The digital arm of automotive businesses — engineering presence,
            content and systems for detailing studios, workshops and dealerships.
          </motion.p>
        </div>

        {/* Bottom scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-ink-faint"
        >
          <span className="font-mono-label text-[0.6rem]">Scroll</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-ember to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
