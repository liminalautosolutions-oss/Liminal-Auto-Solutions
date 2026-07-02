import { motion } from "framer-motion";
import { useEffect } from "react";
import { Navigation } from "@/components/liminal/Navigation";
import imgDetail from "@/assets/bento-dash.jpg";
import imgWorkshop from "@/assets/work-dealership.jpg";
import imgShowroom from "@/assets/work-workshop.jpg";
import imgPaint from "@/assets/bento-paint.jpg";
import imgWheel from "@/assets/bento-wheel.jpg";

const videos = [
  { img: imgDetail, title: "Detailing Studio — Feature Film", tag: "Film / Studio", size: "md:col-span-8 md:row-span-2" },
  { img: imgWorkshop, title: "Workshop Identity — Cut", tag: "Documentary", size: "md:col-span-4 md:row-span-1" },
  { img: imgShowroom, title: "Dealership — Dusk Showroom", tag: "Brand / Showroom", size: "md:col-span-4 md:row-span-1" },
  { img: imgPaint, title: "Paint Correction Precision", tag: "Macro Detail", size: "md:col-span-4 md:row-span-1" },
  { img: imgWheel, title: "Performance Wheels", tag: "Product Feature", size: "md:col-span-8 md:row-span-1" },
];

const WorkPage = () => {
  useEffect(() => {
    document.title = "Liminal — Work | Digital systems for automotive businesses";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-ember selection:text-ink">
      <Navigation />

      {/* Content */}
      <section className="pt-32 pb-24 md:pt-48 md:pb-32 container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="font-mono-label text-ink-dim">Portfolio</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight max-w-5xl mb-6 text-ink"
        >
          The <span className="text-ember">Standard</span> of Automotive Content.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-ink-dim text-lg md:text-xl max-w-2xl leading-relaxed mb-24"
        >
          A selection of our finest cinematic work. We don't shoot cars; we capture the craft, the facility, and the business in motion.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[24rem]">
          {videos.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative neu overflow-hidden ${v.size} cursor-pointer`}
            >
              <img
                src={v.img}
                alt={v.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.6s] group-hover:scale-105 rounded-[var(--radius)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent rounded-[var(--radius)]" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-16 h-16 rounded-full glass flex items-center justify-center border border-white/10 pl-1 group-hover:scale-110 transition-transform duration-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5v14l11-7L8 5z" fill="currentColor" className="text-ink" />
                  </svg>
                </div>
              </div>

              <div className="absolute top-6 left-6 font-mono-label text-ink-dim glass px-3 py-1.5 rounded-lg z-10">
                {v.tag}
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 z-10">
                <h3 className="font-display text-2xl md:text-4xl text-ink leading-tight">{v.title}</h3>
                <span className="font-mono-label text-ink-faint shrink-0 mb-1 hidden md:block">0{i + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default WorkPage;
