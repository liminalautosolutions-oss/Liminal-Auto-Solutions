import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

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
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [navbarTheme, setNavbarTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll("section, footer");
      let activeTheme: "light" | "dark" = resolvedTheme === "dark" ? "dark" : "light";
      
      const navbarBottom = 40;
      
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const rect = el.getBoundingClientRect();
        
        if (rect.top <= navbarBottom && rect.bottom >= navbarBottom) {
          const id = el.id;
          
          if (id === "top" || el.querySelector("canvas")) {
            // Hero section is visually light due to canvas
            activeTheme = "light";
          } else if (el.classList.contains("bg-black") || id === "manifesto" || el.querySelector("video")) {
            // Manifesto section is visually dark due to background video
            activeTheme = "dark";
          } else {
            // Other sections match the active system theme
            activeTheme = resolvedTheme === "dark" ? "dark" : "light";
          }
          break;
        }
      }
      
      setNavbarTheme(activeTheme);
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [resolvedTheme]);

  // Lock body scroll when mobile menu is open
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

  const isDarkNavbar = navbarTheme === "dark";

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-500"
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group z-50 relative">
            <span className="w-1.5 h-1.5 rounded-full bg-ember animate-ember-pulse" />
            <span className={`font-display text-xl tracking-tight transition-colors duration-500 ${isDarkNavbar ? "text-white" : "text-black"}`}>
              Liminal
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-xs font-mono-label transition-colors duration-300 link-underline ${
                  isDarkNavbar
                    ? "text-zinc-400 hover:text-white"
                    : "text-zinc-600 hover:text-black"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full transition-all duration-300 flex items-center justify-center relative z-50 cursor-pointer active:scale-95 ${
                isDarkNavbar
                  ? "text-zinc-300 hover:text-ember bg-white/5 hover:bg-white/10 border border-white/10"
                  : "text-zinc-700 hover:text-ember bg-black/5 hover:bg-black/10 border border-black/10"
              }`}
              aria-label="Toggle Theme"
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <Link
              to="/#contact"
              className={`hidden md:inline-flex text-xs font-mono-label px-4 py-2.5 transition-all duration-300 rounded-lg ${
                isDarkNavbar
                  ? "text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
                  : "text-zinc-700 hover:text-black bg-black/5 hover:bg-black/10 border border-black/10"
              }`}
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
                  className={`h-px transition-transform duration-300 ${
                    isDarkNavbar ? "bg-white" : "bg-black"
                  } ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`}
                />
                <span
                  className={`h-px transition-opacity duration-300 ${
                    isDarkNavbar ? "bg-white" : "bg-black"
                  } ${isOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`h-px transition-transform duration-300 ${
                    isDarkNavbar ? "bg-white" : "bg-black"
                  } ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
                />
              </div>
            </button>
          </div>
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
