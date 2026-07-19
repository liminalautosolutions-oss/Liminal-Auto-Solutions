import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Navigation } from "@/components/liminal/Navigation";
import { Contact } from "@/components/liminal/Contact";
import { Footer } from "@/components/liminal/Footer";
import { ShortsFeed } from "@/components/liminal/ShortsFeed";

const rawVideos = [
  "https://res.cloudinary.com/qjyavfor/video/upload/v1784471178/IMG_8568_k5lihl.mp4",
  "https://res.cloudinary.com/qjyavfor/video/upload/v1784471177/IMG_7936_f0brnl.mp4",
  "https://res.cloudinary.com/qjyavfor/video/upload/v1784471186/IMG_8567_vmvar7.mp4",
  "https://res.cloudinary.com/qjyavfor/video/upload/v1784471193/IMG_8593_mhqw23.mp4",
  "https://res.cloudinary.com/qjyavfor/video/upload/v1784471193/IMG_8588_t00iws.mp4",
  "https://res.cloudinary.com/qjyavfor/video/upload/v1784471202/IMG_8566_qcyizj.mp4",
  "https://res.cloudinary.com/qjyavfor/video/upload/v1784471208/IMG_8569_e2plkx.mp4"
];

// Map over the URLs and inject Cloudinary optimization tags (q_auto,f_auto)
const videos = rawVideos.map((url, i) => ({
  id: i + 1,
  src: url.replace("/upload/", "/upload/q_auto,f_auto/")
}));

const WorkPage = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);

  const isVideosLoaded = loadedCount >= videos.length;

  useEffect(() => {
    document.title = "Liminal — Work | Digital systems for automotive businesses";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-ember selection:text-ink relative">
      <Navigation />

      {/* Background Grid Pattern */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          color: 'hsl(var(--ink))'
        }}
      />

      {/* Content */}
      <section className="pt-32 pb-24 md:pt-48 md:pb-32 container relative z-10">

        {/* Header Section */}
        <div className="flex flex-col items-center justify-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-2 md:gap-4 lg:gap-8 mb-4 relative w-full"
          >
            {/* Left curved arrow */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ember w-12 h-12 md:w-20 md:h-20 lg:w-28 lg:h-28 -scale-x-100 hidden sm:block">
              <path d="M21 2v6h-6"></path>
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
            </svg>

            <h1 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.8] tracking-tight text-ink text-center">
              MOTION
            </h1>

            {/* Right curved arrow */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ember w-12 h-12 md:w-20 md:h-20 lg:w-28 lg:h-28 hidden sm:block">
              <path d="M3 22v-6h6"></path>
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
            </svg>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-mono-label text-ember text-center text-sm md:text-base tracking-[0.2em] uppercase"
          >
            Short-form automotive film
          </motion.p>
        </div>

        {/* Video Grid */}
        <div className="relative">
          {/* Skeleton Grid (visible while loading) */}
          {!isVideosLoaded && (
            <div className="absolute inset-0 grid grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 z-20">
              {Array.from({ length: videos.length }).map((_, i) => (
                <div key={`skeleton-${i}`} className="aspect-[9/16] bg-white/5 animate-pulse border border-white/10" />
              ))}
            </div>
          )}

          {/* Actual Videos */}
          <div className={`grid grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 ${!isVideosLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
            {videos.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isVideosLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: (i % 5) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative neu overflow-hidden aspect-[9/16] cursor-pointer bg-surface/50 border border-white/10"
                onClick={() => setActiveVideoIndex(i)}
              >
                {/* Video Element */}
                <video
                  src={v.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onLoadedData={() => setLoadedCount(prev => prev + 1)}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.6s] group-hover:scale-105"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Play icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="w-12 h-12 rounded-full glass flex items-center justify-center border border-white/20 pl-1 scale-90 group-hover:scale-100 transition-transform duration-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 5v14l11-7L8 5z" fill="currentColor" className="text-ink" />
                    </svg>
                  </div>
                </div>

                {/* Tag/Label */}
                <div className="absolute top-4 right-4 font-mono-label text-[10px] text-ink-dim glass px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                  0{i + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Contact />
      <Footer />

      {activeVideoIndex !== null && (
        <ShortsFeed
          videos={videos}
          startIndex={activeVideoIndex}
          onClose={() => setActiveVideoIndex(null)}
        />
      )}
    </main>
  );
};

export default WorkPage;
