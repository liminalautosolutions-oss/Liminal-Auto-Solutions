import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 142;

const currentFrame = (index: number) =>
  `/images/herosection/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.png`;

export const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    const preloadImages = async () => {
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        loadedImages.push(img);
      }
      setImages(loadedImages);
    };
    preloadImages();
  }, []);

  const renderFrame = (index: number) => {
    if (images.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const img = images[index];
    if (img && img.complete) {
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = canvas.height - img.height * ratio;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    }
  };

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Draw last frame if done, else first frame
        renderFrame(isAnimationComplete ? FRAME_COUNT - 1 : 0);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images, isAnimationComplete]);

  // Auto-play animation once images start loading
  useEffect(() => {
    if (images.length === 0) return;
    
    let startTime: number | null = null;
    let animationFrameId: number;
    const DURATION = 3500; // 3.5 seconds to play

    const playAnimation = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / DURATION, 1);
      
      // Easing function for smooth stop
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(easeOutQuart * FRAME_COUNT));
      
      renderFrame(frameIndex);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(playAnimation);
      } else {
        setIsAnimationComplete(true);
      }
    };

    // Wait a brief moment to ensure at least first few frames are loaded
    const timeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(playAnimation);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [images]);

  return (
    <section id="top" className="relative w-full h-[100dvh] bg-background overflow-hidden">
      
      {/* DESKTOP EXPERIENCE: Canvas for Image Sequence */}
      <div className="hidden md:block absolute inset-0 z-0 w-full h-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />
      </div>

      {/* MOBILE EXPERIENCE: Static Image with Breathing Zoom */}
      <div className="block md:hidden absolute inset-0 z-0 w-full h-full overflow-hidden bg-black">
        <div 
          className="w-full h-full object-cover animate-breathing-zoom"
          style={{
            backgroundImage: `url('/images/herosection/ezgif-frame-142.png')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        />
      </div>

      {/* Text Overlays */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-start pt-[12vh] md:pt-[10vh] pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2.5rem,11vw,13rem)] leading-none tracking-normal text-[#1e1e1e] select-none mix-blend-difference"
        >
          LIMINAL
        </motion.h1>
      </div>

      {/* Mobile Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 md:hidden flex flex-col items-center text-white animate-bounce pointer-events-none"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
};
