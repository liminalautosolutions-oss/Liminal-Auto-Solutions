import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const FRAME_COUNT = 142;

const currentFrame = (index: number) =>
  `/images/herosection/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.png`;

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isDesktop, setIsDesktop] = useState(true);

  // Check if desktop to decide if we need to render the heavy canvas
  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Preload images (only strictly needed if on desktop, but fine to load)
  useEffect(() => {
    if (!isDesktop) return; // Save bandwidth on mobile by not preloading sequence
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
  }, [isDesktop]);

  const renderFrame = (index: number) => {
    if (images.length === 0 || !isDesktop) return;
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
      const centerShift_y = canvas.height - img.height * ratio; // Align to bottom so tires aren't cropped

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

  // Update canvas on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isDesktop) return;
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.floor(latest * FRAME_COUNT)
    );
    // Request animation frame for smooth rendering
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  // Handle Resize and initial draw
  useEffect(() => {
    const handleResize = () => {
      if (!isDesktop) return;
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const currentProgress = scrollYProgress.get();
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(currentProgress * FRAME_COUNT)
        );
        renderFrame(frameIndex);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Attempt initial draw if first image loads
    if (images.length > 0 && isDesktop) {
      const firstImg = images[0];
      if (firstImg.complete) {
        handleResize();
      } else {
        firstImg.onload = () => handleResize();
      }
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [images, scrollYProgress, isDesktop]);

  return (
    <section 
      ref={containerRef} 
      id="top" 
      className="relative w-full bg-background h-[100dvh] md:h-[200vh]"
    >
      {/* Sticky Container for Animation */}
      <div className="sticky top-0 left-0 w-full h-[100dvh] md:h-screen overflow-hidden">
        
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

        {/* Text Overlays (Shared) */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-start pt-[12vh] md:pt-[10vh] pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.5rem,11vw,13rem)] leading-none tracking-normal text-white mix-blend-difference select-none drop-shadow-lg md:text-[#1e1e1e] md:drop-shadow-none md:mix-blend-difference"
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

      </div>
    </section>
  );
};
