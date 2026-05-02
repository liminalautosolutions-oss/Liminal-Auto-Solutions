import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const nav = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Industry", href: "#industry" },
  { label: "Contact", href: "#contact" },
];

export const Navigation = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 40));
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong" : ""
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="w-1.5 h-1.5 rounded-full bg-ember animate-ember-pulse" />
          <span className="font-display text-xl tracking-tight text-ink">AutoVanza</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-mono-label text-ink-dim hover:text-ink transition-colors link-underline"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="text-xs font-mono-label text-ink neu-sm px-4 py-2.5 hover:shadow-none transition-all duration-300"
        >
          Engage
        </a>
      </div>
    </motion.header>
  );
};
