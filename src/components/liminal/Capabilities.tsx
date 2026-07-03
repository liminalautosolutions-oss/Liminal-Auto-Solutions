import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import img1 from "@/assets/work-detail.jpg";
import img2 from "@/assets/bento-paint.jpg";
import img3 from "@/assets/bento-wheel.jpg";
import img5 from "@/assets/work-workshop.jpg";
import img7 from "@/assets/hero-car.jpg";
import imgSystem from "@/assets/bento-system.png";
import imgCreative from "@/assets/bento-creative.png";
import imgAi from "@/assets/bento-ai.png";
import imgWeb from "@/assets/bento-web.png";

const pillars = [
  { n: "01", title: "Content ecosystems", body: "Sustained content frameworks that reflect craft, process and identity — not one-off posts.", span: "md:col-span-2", img: img1 },
  { n: "02", title: "Video production", body: "Cinematic, workshop-grade visuals shot on location — the way automotive deserves to be seen.", span: "md:col-span-1", img: imgCreative },
  { n: "03", title: "Digital visibility", body: "Search, Google presence and location visibility built around how buyers actually find automotive businesses.", span: "md:col-span-1", img: img7 },
  { n: "04", title: "Performance systems", body: "Structured lead acquisition infrastructure — engineered, measured, owned.", span: "md:col-span-2", img: imgSystem },
  { n: "05", title: "CRM & workflow", body: "Operational systems that turn attention into organised pipelines and repeat clients.", span: "md:col-span-1", img: img5 },
  { n: "06", title: "Brand positioning", body: "Clarifying who you are in a crowded, commoditised market — with intent and structure.", span: "md:col-span-1", img: img2 },
  { n: "07", title: "Web development", body: "High-performance digital storefronts and web applications engineered for speed and conversion.", span: "md:col-span-1", img: imgWeb },
  { n: "08", title: "AI Integration", body: "Intelligent systems and AI agents designed to automate interactions and accelerate growth.", span: "md:col-span-2", img: imgAi },
  { n: "09", title: "Automation as a Service", body: "Custom workflows and tooling to eliminate manual tasks and scale your daily operations.", span: "md:col-span-1", img: img3 },
];

export const Capabilities = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  useEffect(() => {
    const updateTranslateX = () => {
      if (scrollRef.current) {
        const scrollWidth = scrollRef.current.scrollWidth;
        const visibleWidth = window.innerWidth;
        setTranslateX(Math.max(0, scrollWidth - visibleWidth));
      }
    };

    updateTranslateX();
    window.addEventListener("resize", updateTranslateX);
    window.addEventListener("load", updateTranslateX);

    // Initial delay checks to ensure layout is ready
    const timer = setTimeout(updateTranslateX, 100);

    return () => {
      window.removeEventListener("resize", updateTranslateX);
      window.removeEventListener("load", updateTranslateX);
      clearTimeout(timer);
    };
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -translateX]);
  const xBg = useTransform(scrollYProgress, [0, 1], [0, -translateX * 0.85]);

  return (
    <section id="capabilities" ref={targetRef} className="relative h-[450vh] bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-12 md:py-16">
        {/* Section Header */}
        <div className="container w-full relative z-20 shrink-0 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-baseline justify-between mb-4"
          >
            <span className="font-mono-label text-ink-dim">02 / Capabilities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.95] tracking-tight max-w-4xl text-ink"
          >
            Nine disciplines, one <span className="text-ember">operating system</span>.
          </motion.h2>
        </div>

        {/* Carousel Viewport Container */}
        <div className="relative flex-1 w-full flex items-center overflow-hidden">
          {/* Parallax Background Labels Container */}
          <motion.div 
            style={{ x: xBg }} 
            className="absolute left-0 top-1/2 -translate-y-1/2 flex gap-[35vw] md:gap-[45vw] pl-[20vw] md:pl-[25vw] select-none pointer-events-none z-0 whitespace-nowrap"
          >
            {pillars.map((p) => (
              <div 
                key={`bg-${p.n}`} 
                className="font-display text-[14vh] md:text-[22vh] text-ink/[0.03] dark:text-white/[0.02] uppercase tracking-widest leading-none shrink-0"
              >
                {p.title.split(" ")[0]}
              </div>
            ))}
          </motion.div>

          {/* Cards Flex Container */}
          <motion.div
            ref={scrollRef}
            style={{ x }}
            className="flex gap-8 md:gap-16 px-[10vw] md:px-[20vw] relative z-10"
          >
            {pillars.map((p, i) => (
              <div
                key={p.n}
                className="relative w-[75vw] sm:w-[55vw] md:w-[42vw] lg:w-[32vw] xl:w-[28vw] h-[48vh] md:h-[52vh] shrink-0 rounded-2xl overflow-hidden group flex flex-col justify-end p-6 md:p-10 transition-shadow duration-500 bg-zinc-950/80 border border-white/5 shadow-2xl backdrop-blur-sm"
              >
                {/* Background Image with Zoom */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-[var(--radius)]">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent pointer-events-none" />
                </div>

                {/* Number & Line Indicator */}
                <div className="relative z-10 flex items-center justify-between mb-8 pointer-events-none">
                  <span className="font-mono-label text-ember text-sm">{p.n}</span>
                  <span className="w-8 h-px bg-white/10 group-hover:w-16 group-hover:bg-ember transition-all duration-700" />
                </div>

                {/* Card Content */}
                <div className="relative z-10 flex flex-col pointer-events-none">
                  <h3 className="font-display text-2xl md:text-3xl text-white mb-3 group-hover:text-ember transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-sm mb-6">
                    {p.body}
                  </p>
                  
                  {/* Explore pill button */}
                  <div className="inline-flex self-start items-center gap-2 text-xs font-mono-label text-zinc-300 group-hover:text-ember transition-colors duration-300">
                    <span>Explore module</span>
                    <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
