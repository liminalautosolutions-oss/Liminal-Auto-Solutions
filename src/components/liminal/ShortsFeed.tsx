import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX } from "lucide-react";

interface Video {
  id: number;
  src: string;
}

interface ShortsFeedProps {
  videos: Video[];
  startIndex: number;
  onClose: () => void;
}

export const ShortsFeed = ({ videos, startIndex, onClose }: ShortsFeedProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  
  // Lock body scroll when feed is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  
  // Set up intersection observer to play/pause videos based on visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoElement = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            // Video is in view, play it
            videoElement.currentTime = 0; // Restart video when scrolling to it
            const playPromise = videoElement.play();
            if (playPromise !== undefined) {
              playPromise.catch((error) => {
                console.log("Auto-play was prevented:", error);
                // If auto-play with sound is blocked, we could force mute here
                // setIsMuted(true); 
              });
            }
          } else {
            // Video is out of view, pause it
            videoElement.pause();
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.6, // Trigger when 60% of the video is visible
      }
    );

    // Observe all video elements
    const videoElements = document.querySelectorAll('.shorts-video');
    videoElements.forEach((el) => observer.observe(el));

    return () => {
      videoElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  // Initial scroll to the selected video
  useEffect(() => {
    if (containerRef.current) {
      // Small timeout to allow DOM rendering before scroll
      setTimeout(() => {
        if (!containerRef.current) return;
        const height = window.innerHeight;
        // Turn off smooth scrolling for the initial jump
        containerRef.current.style.scrollBehavior = 'auto';
        containerRef.current.scrollTop = startIndex * height;
        // Turn smooth scrolling back on
        setTimeout(() => {
          if (containerRef.current) {
             containerRef.current.style.scrollBehavior = 'smooth';
          }
        }, 50);
      }, 50);
    }
  }, [startIndex]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[100] bg-black text-white"
      >
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            color: 'white'
          }}
        />

        {/* Controls Overlay */}
        <div className="absolute top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-50 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
          <div className="font-display text-2xl tracking-tight pointer-events-auto">Liminal</div>
          <div className="flex items-center gap-4 pointer-events-auto">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button 
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scroll Container */}
        <div 
          ref={containerRef}
          className="h-full w-full overflow-y-scroll snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {videos.map((v, i) => (
            <div 
              key={v.id} 
              className="h-screen w-full snap-start snap-always relative flex justify-center items-center bg-transparent"
            >
              {/* Phone-like Container for Desktop */}
              <div className="relative w-full h-full md:w-auto md:aspect-[9/16] md:h-[95vh] md:rounded-2xl overflow-hidden bg-zinc-900 border-white/10 md:border">
                <video
                  src={v.src}
                  loop
                  playsInline
                  muted={isMuted}
                  className="shorts-video h-full w-full object-cover"
                />
                
                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                  <div className="font-mono-label text-sm text-white/70 mb-3">0{i + 1} / {videos.length}</div>
                  <div className="font-display text-2xl md:text-3xl text-white">Liminal Studios</div>
                  <div className="font-mono-label mt-2 text-white/50 text-xs tracking-widest uppercase">Video Production</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
