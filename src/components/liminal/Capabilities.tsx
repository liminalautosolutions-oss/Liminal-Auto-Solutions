import { motion } from "framer-motion";
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
  return (
    <section id="capabilities" className="relative py-20 md:py-16 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-baseline justify-between mb-6"
        >
          <span className="font-mono-label text-ink-dim">02 / Capabilities</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight max-w-4xl mb-20 md:mb-28 text-ink"
        >
          Nine disciplines, one <span className="text-ember">operating system</span>.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[22rem] gap-4 md:gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden neu p-8 md:p-10 flex flex-col justify-between hover:shadow-none transition-shadow duration-500 ${p.span}`}
            >
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 rounded-[var(--radius)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent rounded-[var(--radius)] pointer-events-none" />
              
              <div className="relative z-10 flex items-start justify-between mb-10 pointer-events-none">
                <span className="font-mono-label text-ember">{p.n}</span>
                <span className="w-8 h-px bg-ink-faint group-hover:w-16 group-hover:bg-ember transition-all duration-700" />
              </div>
              <div className="relative z-10 mt-auto pointer-events-none">
                <h3 className="font-display text-3xl md:text-4xl text-ink mb-4">{p.title}</h3>
                <p className="text-ink-dim leading-relaxed max-w-md">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
