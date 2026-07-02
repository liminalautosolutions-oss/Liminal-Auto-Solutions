import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import imgDetail from "@/assets/bento-dash.jpg";
import imgWorkshop from "@/assets/work-dealership.jpg";
import imgShowroom from "@/assets/work-workshop.jpg";

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
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="work" ref={ref} className="relative py-20 md:py-16 bg-surface-raised overflow-hidden">
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-baseline justify-between mb-6"
        >
          <span className="font-mono-label text-ink-dim">03 / Work</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight max-w-4xl mb-20 text-ink"
        >
          Proof in <span className="text-ember">execution</span>.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[9/16] md:aspect-video neu-lg overflow-hidden rounded-[var(--radius)] mb-16 group cursor-pointer"
        >
          {/* Replace this img with a <video> tag when you have the source */}
          <img
            src={imgDetail}
            alt="Liminal Showreel"
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-background/10 transition-colors duration-500 group-hover:bg-background/30" />
          
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full glass flex items-center justify-center border border-white/20 pl-2 shadow-2xl">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-ink ml-1">
                <path d="M8 5v14l11-7L8 5z" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <Link
            to="/work"
            className="inline-flex items-center gap-4 font-mono-label text-ink neu px-8 py-4 hover:shadow-none transition-all duration-300"
          >
            <span>View Full Portfolio</span>
            <span className="text-ember">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
