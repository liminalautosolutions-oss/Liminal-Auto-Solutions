import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const nav = [
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Industry", href: "/#industry" },
  { label: "Contact", href: "/#contact" },
];

export const Navigation = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 40));
  }, [scrollY]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || isOpen ? "glass-strong" : ""
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group z-50 relative">
          <span className="w-1.5 h-1.5 rounded-full bg-ember animate-ember-pulse" />
          <span className="font-display text-xl tracking-tight text-ink">AutoVanza</span>
        </Link>

          <nav className="hidden md:flex items-center gap-10">
            {nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-xs font-mono-label text-ink-dim hover:text-ink transition-colors link-underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            to="/#contact"
            className="hidden md:inline-flex text-xs font-mono-label text-ink neu-sm px-4 py-2.5 hover:shadow-none transition-all duration-300"
          >
            Engage
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 z-50 relative focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <span
                className={`h-px bg-ink transition-transform duration-300 ${
                  isOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`h-px bg-ink transition-opacity duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-px bg-ink transition-transform duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center pt-20"
          >
            <nav className="flex flex-col items-center gap-8 w-full px-6">
              {nav.map((item, i) => (
                <motion.div key={item.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 + 0.1, duration: 0.4 }}>
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-display text-ink hover:text-ember transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: nav.length * 0.05 + 0.1, duration: 0.4 }}>
                <Link
                  to="/#contact"
                  onClick={() => setIsOpen(false)}
                  className="mt-8 inline-block text-sm font-mono-label text-ink neu px-8 py-4 hover:shadow-none transition-all duration-300"
                >
                  Engage →
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
