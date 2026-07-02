import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 240;

const currentFrame = (index: number) =>
  `/images/herosection/ezgif-frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

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
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

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
    if (images.length > 0) {
      const firstImg = images[0];
      if (firstImg.complete) {
        handleResize();
      } else {
        firstImg.onload = () => handleResize();
      }
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [images, scrollYProgress]);

  // Text 1: LIMINAL
  const t1Opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const t1Y = useTransform(scrollYProgress, [0, 0.3], ["0%", "-100%"]);

  return (
    <section ref={containerRef} id="top" className="relative w-full bg-background" style={{ height: "200vh" }}>
      {/* Sticky Container for Animation */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">

        {/* Canvas for Image Sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 w-full h-full object-cover"
        />

        {/* Top fade to bg */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-background to-transparent z-10" />
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />

        {/* Text Overlays */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">

          {/* Feature 1 */}
          <motion.div
            style={{ opacity: t1Opacity, y: t1Y }}
            className="absolute inset-0 flex flex-col items-center justify-start pt-[12vh] md:pt-[10vh]"
          >
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2rem,11vw,13rem)] leading-none tracking-normal text-[#1e1e1e] select-none"
            >
              LIMINAL
            </motion.h1>
          </motion.div>

        </div>


      </div>
    </section>
  );
};
