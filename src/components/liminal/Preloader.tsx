import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 100

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const startTime = Date.now();

    // We only need to preload the critical first-paint image to ensure a smooth reveal.
    // The rest of the 142 frames are asynchronously loaded by Hero.tsx so we don't block the site.
    const isMobile = window.innerWidth < 768;
    const criticalImages = isMobile 
      ? ["/images/PPFREFERENCE.jpg"] 
      : ["https://res.cloudinary.com/qjyavfor/image/upload/f_auto,q_auto/v1784569481/ezgif-frame-001.png"];

    let loadedCount = 0;
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
      const onLoad = () => { loadedCount++; };
      img.onload = onLoad;
      img.onerror = onLoad;
    });

    const interval = setInterval(() => {
      setProgress((prev) => {
        const timeElapsed = Date.now() - startTime;

        // Progress based on a quick 1.2s timer instead of 142 network requests
        const timeProgress = Math.min((timeElapsed / 1200) * 100, 100);
        const criticalLoaded = loadedCount === criticalImages.length;
        const timeOut = timeElapsed > 4000; // Hard max 4 seconds wait

        // Finish loader if timer is up and critical image loaded, OR if max timeout hit
        if ((timeProgress >= 100 && criticalLoaded) || timeOut) {
          clearInterval(interval);
          setTimeout(() => {
            document.body.style.overflow = "unset";
            setIsLoading(false);
          }, 800); // Wait at 220km/h for a moment before sliding up
          return 100;
        }

        // Rapid acceleration simulating the needle moving
        const simulatedStep = prev + Math.floor(Math.random() * 8) + 4;
        return Math.min(simulatedStep, timeProgress, 99);
      });
    }, 40);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // SVG Calculations
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  // 270 degree arc (from bottom left to bottom right)
  const arcLength = (270 / 360) * circumference;

  // As progress goes 0->100, offset goes from arcLength -> 0
  const strokeDashoffset = arcLength - (progress / 100) * arcLength;

  // Convert 0-100 progress into 0-220 km/h
  const speed = Math.round((progress / 100) * 220);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden"
        >
          {/* Radial subtle glow in background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,87,34,0.05)_0%,transparent_50%)]" />

          {/* Speedometer Container */}
          <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] flex items-center justify-center">

            {/* SVG Speedometer */}
            <svg
              className="absolute inset-0 w-full h-full drop-shadow-[0_0_15px_rgba(255,87,34,0.2)]"
              viewBox="0 0 340 340"
            >
              <defs>
                <linearGradient id="speedGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff9800" />
                  <stop offset="100%" stopColor="#ff3d00" />
                </linearGradient>
              </defs>

              {/* Background Track Arc */}
              <circle
                cx="170"
                cy="170"
                r={radius}
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.03"
                strokeWidth="6"
                strokeDasharray={`${arcLength} ${circumference}`}
                strokeLinecap="round"
                transform="rotate(135 170 170)"
              />

              {/* Ticks (45 ticks = 220kmh, each tick is 5kmh) */}
              {Array.from({ length: 45 }).map((_, i) => {
                const angle = 135 + (i * (270 / 44));
                const rad = (angle * Math.PI) / 180;

                const isMajor = i % 4 === 0; // Every 20 kmh

                // Tick lines
                const innerRadius = isMajor ? radius - 16 : radius - 8;
                const outerRadius = radius - 2;
                const x1 = 170 + innerRadius * Math.cos(rad);
                const y1 = 170 + innerRadius * Math.sin(rad);
                const x2 = 170 + outerRadius * Math.cos(rad);
                const y2 = 170 + outerRadius * Math.sin(rad);

                // Tick labels (0, 20, 40... 220)
                const labelRadius = radius - 35;
                const lx = 170 + labelRadius * Math.cos(rad);
                const ly = 170 + labelRadius * Math.sin(rad);
                const label = (i / 4) * 20;

                return (
                  <g key={`tick-${i}`}>
                    <line
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="#ffffff"
                      strokeWidth={isMajor ? "2" : "1"}
                      strokeOpacity={isMajor ? "0.9" : "0.3"}
                      strokeLinecap="round"
                    />
                    {isMajor && (
                      <text
                        x={lx}
                        y={ly}
                        fill="#ffffff"
                        fillOpacity="0.8"
                        fontSize="11"
                        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                        fontWeight="600"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                      // Rotate text slightly so it's readable
                      >
                        {label}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Animated Progress Arc */}
              <motion.circle
                cx="170"
                cy="170"
                r={radius}
                fill="none"
                stroke="url(#speedGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${arcLength} ${circumference}`}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.1, ease: "linear" }}
                transform="rotate(135 170 170)"
              />

              {/* The Needle */}
              <motion.g
                initial={{ rotate: 135 }}
                animate={{ rotate: 135 + (progress / 100) * 270 }}
                transition={{ duration: 0.1, ease: "linear" }}
                style={{ transformOrigin: "center" }}
              >
                {/* Invisible bounding box to force correct SVG transform origin */}
                <rect x="0" y="0" width="340" height="340" fill="none" />

                {/* Needle Drop Shadow */}
                <polygon points="170,166 260,169 260,171 170,174 155,170" fill="rgba(0,0,0,0.5)" transform="translate(2, 4)" />
                {/* Needle Body (Orange) */}
                <polygon points="170,167 265,169 265,171 170,173 158,170" fill="#ff5722" />
                {/* Center Cap Base */}
                <circle cx="170" cy="170" r="14" fill="#1a1a1a" stroke="#333" strokeWidth="2" />
                {/* Center Cap Core */}
                <circle cx="170" cy="170" r="5" fill="#ff5722" />
              </motion.g>
            </svg>

            {/* Branding Text Below Speedometer */}
            <div className="absolute -bottom-8 flex flex-col items-center gap-3 w-max max-w-[95vw]">
              <h2 className="font-display text-lg sm:text-2xl md:text-3xl text-white tracking-widest uppercase shadow-black drop-shadow-md whitespace-nowrap">
                Liminal Auto Solutions
              </h2>
              <div className="font-mono-label text-[10px] md:text-xs tracking-[0.4em] text-[#ff5722] uppercase">
                System Boot Sequence
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
