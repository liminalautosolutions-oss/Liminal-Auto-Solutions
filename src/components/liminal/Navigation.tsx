import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const nav = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

export const Navigation = () => {
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
            activeTheme = "light";
          } else if (el.classList.contains("bg-black") || id === "manifesto" || el.classList.contains("bg-ink")) {
            activeTheme = "dark";
          } else {
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
      <header
        className="fixed top-0 left-0 w-full z-50 pointer-events-none pt-0"
      >
        <div
          className={`relative mx-auto flex items-center justify-between pointer-events-auto transition-all duration-[700ms] ease-in-out ${
            scrolled
              ? `max-w-[850px] w-[95%] rounded-[100px] p-2 mt-6 ${isDarkNavbar ? 'bg-surface/95 border border-white/10 text-ink' : 'bg-ink/95 border border-black/10 text-surface'} shadow-[0_16px_40px_-12px_rgba(0,0,0,0.3)] backdrop-blur-xl`
              : "max-w-7xl w-full rounded-none px-6 py-6 mt-0 bg-transparent border-transparent"
          }`}
        >
          {/* Logo */}
          <Link 
            to="/" 
            className={`relative flex items-center shrink-0 overflow-hidden transition-all duration-[700ms] ease-in-out ${
              scrolled 
                ? `w-12 h-12 rounded-full ${isDarkNavbar ? 'bg-ink' : 'bg-surface'}` 
                : `w-[120px] h-12 rounded-full bg-transparent`
            }`}
          >
            <span 
              className={`absolute transition-all duration-[700ms] ease-in-out rounded-full bg-ember animate-ember-pulse ${
                scrolled 
                  ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5" 
                  : "left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5"
              }`} 
            />
            <span 
              className={`absolute top-1/2 -translate-y-1/2 transition-all duration-[700ms] ease-in-out font-display text-xl tracking-tight whitespace-nowrap ${
                scrolled 
                  ? "left-1/2 opacity-0 scale-90 pointer-events-none" 
                  : "left-4 opacity-100 scale-100"
              } ${isDarkNavbar ? "text-white" : "text-black"}`}
            >
              Liminal
            </span>
          </Link>

          {/* Nav Links */}
          <nav className={`absolute left-1/2 -translate-x-1/2 hidden md:flex items-center transition-all duration-[700ms] ease-in-out ${
            scrolled ? "gap-6 lg:gap-8" : "gap-8 lg:gap-12"
          }`}>
            {nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`font-mono-label text-xs link-underline transition-colors duration-300 ${
                  scrolled
                    ? `${isDarkNavbar ? 'text-ink hover:text-ember' : 'text-surface hover:text-ember'}`
                    : `${isDarkNavbar ? 'text-zinc-300 hover:text-white' : 'text-zinc-900 hover:text-black'}`
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className={`flex items-center shrink-0 transition-all duration-[700ms] ease-in-out ${
            scrolled ? "gap-2" : "gap-3"
          }`}>
            <button
              onClick={toggleTheme}
              className={`relative flex items-center justify-center shrink-0 transition-all duration-[700ms] ease-in-out ${
                scrolled
                  ? `w-12 h-12 rounded-full hover:scale-105 ${isDarkNavbar ? 'text-ink' : 'text-surface'}`
                  : `w-12 h-12 rounded-full border ${isDarkNavbar ? 'text-zinc-300 hover:text-ember bg-white/5 border-white/10' : 'text-zinc-900 hover:text-ember bg-black/5 border-black/15'}`
              }`}
              aria-label="Toggle Theme"
            >
              <Sun className={`absolute transition-all duration-500 ${mounted && resolvedTheme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"} w-4 h-4`} />
              <Moon className={`absolute transition-all duration-500 ${mounted && resolvedTheme !== "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"} w-4 h-4`} />
            </button>

            <Link
              to="/#contact"
              className={`hidden md:flex items-center justify-center font-mono-label text-xs transition-all duration-[700ms] ease-in-out shrink-0 whitespace-nowrap ${
                scrolled
                  ? `w-[110px] h-12 rounded-full hover:scale-105 ${isDarkNavbar ? 'bg-ink text-surface' : 'bg-surface text-ink'}`
                  : `w-[100px] h-12 rounded-lg border ${isDarkNavbar ? 'text-zinc-300 hover:text-white bg-white/5 border-white/10' : 'text-zinc-900 hover:text-black bg-black/5 border-black/15'}`
              }`}
            >
              Engage
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className={`md:hidden relative flex flex-col justify-center items-center shrink-0 transition-all duration-[700ms] ease-in-out ${
                scrolled 
                  ? `w-12 h-12 rounded-full ${isDarkNavbar ? 'bg-ink' : 'bg-surface'}` 
                  : 'w-12 h-12 bg-transparent'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              aria-label="Toggle Menu"
            >
              <span className={`w-5 h-px transition-transform duration-300 ${
                scrolled ? (isDarkNavbar ? 'bg-surface' : 'bg-ink') : (isDarkNavbar ? 'bg-white' : 'bg-black')
              } ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`w-5 h-px transition-opacity duration-300 ${
                scrolled ? (isDarkNavbar ? 'bg-surface' : 'bg-ink') : (isDarkNavbar ? 'bg-white' : 'bg-black')
              } ${isOpen ? "opacity-0" : ""}`} />
              <span className={`w-5 h-px transition-transform duration-300 ${
                scrolled ? (isDarkNavbar ? 'bg-surface' : 'bg-ink') : (isDarkNavbar ? 'bg-white' : 'bg-black')
              } ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>
        </div>
      </header>

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
