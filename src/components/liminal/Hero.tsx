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

  // Preload images
  useEffect(() => {
    if (!isDesktop) return; // Save bandwidth on mobile
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

  // Text 1: LIMINAL
  const t1Opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const t1Y = useTransform(scrollYProgress, [0, 0.3], ["0%", "-100%"]);

  return (
    <section 
      ref={containerRef} 
      id="top" 
      className="relative w-full bg-background h-[100dvh] md:h-[200vh]"
    >
      {/* Sticky Container for Animation */}
      <div className="sticky top-0 left-0 w-full h-[100dvh] md:h-screen overflow-hidden">
        
        {/* DESKTOP EXPERIENCE: Canvas for Image Sequence */}
        <div 
          className="hidden md:block absolute inset-0 z-0 w-full h-full bg-[#050505]"
          style={{
            backgroundImage: `url('/images/herosection/ezgif-frame-001.png')`,
            backgroundPosition: 'center bottom',
            backgroundSize: 'cover'
          }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
          />
        </div>

        {/* MOBILE EXPERIENCE: Classy Image + Text */}
        <div className="block md:hidden absolute inset-0 z-0 w-full h-full overflow-hidden bg-[#050505]">
          <div 
            className="w-full h-full object-cover"
            style={{
              backgroundImage: `url('/images/PPFREFERENCE.jpg')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          />
          {/* Gradient Overlay for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          
          <div className="absolute inset-0 flex flex-col justify-end items-center px-6 pb-[20vh]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <h1 className="font-display text-4xl text-white tracking-widest uppercase leading-[1.1]">LIMINAL</h1>
              <h1 className="font-display text-2xl text-white/80 tracking-widest uppercase leading-[1.1] mt-2">AUTO SOLUTIONS</h1>
            </motion.div>

            <motion.a 
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 px-8 py-4 glass-strong text-white font-mono-label text-xs uppercase tracking-widest rounded-full"
            >
              Discover Services
            </motion.a>
          </div>
        </div>

        {/* Text Overlays (Desktop Only) */}
        <div className="hidden md:flex absolute inset-0 z-20 items-center justify-center pointer-events-none">
          <motion.div
            style={{ opacity: t1Opacity, y: t1Y }}
            className="absolute inset-0 flex flex-col items-center justify-start pt-[10vh]"
          >
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2.5rem,11vw,13rem)] leading-none tracking-normal text-[#1e1e1e] mix-blend-difference select-none drop-shadow-none"
            >
              LIMINAL
            </motion.h1>
          </motion.div>
        </div>



      </div>
    </section>
  );
};
