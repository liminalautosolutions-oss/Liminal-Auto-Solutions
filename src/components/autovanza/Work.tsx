import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
// Note: generator shuffled outputs — we map to actual content of each file.
import imgDetail from "@/assets/bento-dash.jpg"; // hand + microfiber on blue car
import imgWorkshop from "@/assets/work-dealership.jpg"; // classic car on lift
import imgShowroom from "@/assets/work-workshop.jpg"; // silver GT in glass showroom

const items = [
  { img: imgDetail, title: "Detailing Studio — Feature Film", tag: "Film / Studio" },
  { img: imgWorkshop, title: "Workshop Identity — Documentary Cut", tag: "Documentary" },
  { img: imgShowroom, title: "Dealership — Dusk Showroom", tag: "Brand / Showroom" },
];

export const Work = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="work" ref={ref} className="relative py-32 md:py-48 bg-surface-raised overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute -top-20 right-0 w-[40rem] h-[40rem] bg-gradient-radial-ember opacity-60 pointer-events-none"
      />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-baseline justify-between mb-6"
        >
          <span className="font-mono-label text-ink-dim">◦ 04 / Work</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight max-w-4xl mb-20"
        >
          Proof in <em className="italic text-ember">execution</em>.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {items.map((w, i) => (
            <motion.figure
              key={w.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative ${i === 1 ? "md:mt-24" : ""}`}
            >
              <div className="relative overflow-hidden aspect-[3/4] bg-surface">
                <motion.img
                  src={w.img}
                  alt={w.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.6s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent opacity-80" />
                <div className="absolute top-5 left-5 font-mono-label text-ink-dim glass px-3 py-1.5">
                  {w.tag}
                </div>
              </div>
              <figcaption className="mt-6 flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl text-ink leading-tight">{w.title}</h3>
                <span className="font-mono-label text-ink-faint shrink-0 mt-1">
                  0{i + 1}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};
