export const Footer = () => {
  return (
    <footer className="pt-24 pb-8 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
      <div className="container relative z-10">
        
        {/* Top Section: Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-ember" />
              <span className="font-display text-3xl text-white">Liminal</span>
            </div>
            <p className="text-zinc-400 font-mono-label uppercase tracking-widest text-xs max-w-sm leading-relaxed">
              Performance systems, content ecosystems, and digital storefronts engineered for premium automotive brands.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono-label text-white uppercase tracking-widest text-[10px] mb-2 opacity-50">Explore</h4>
            <a href="/" className="font-display text-2xl text-zinc-400 hover:text-ember transition-colors">Home</a>
            <a href="/work" className="font-display text-2xl text-zinc-400 hover:text-ember transition-colors">Work</a>
            <a href="/about" className="font-display text-2xl text-zinc-400 hover:text-ember transition-colors">About</a>
          </div>

          {/* Legal / Social Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono-label text-white uppercase tracking-widest text-[10px] mb-2 opacity-50">Connect</h4>
            <a href="/#contact" className="font-display text-2xl text-zinc-400 hover:text-ember transition-colors">Contact</a>
            <a href="#" className="font-display text-2xl text-zinc-400 hover:text-ember transition-colors">Instagram</a>
            <a href="/privacy" className="font-display text-2xl text-zinc-400 hover:text-ember transition-colors">Privacy Policy</a>
          </div>

        </div>

        {/* Bottom Section: Massive Typographic Logo & Copyright */}
        <div className="flex flex-col items-center border-t border-white/10 pt-12">
           <div className="w-full overflow-hidden flex justify-center mb-12">
             <h1 className="font-display text-[18vw] md:text-[15vw] leading-[0.75] text-white/[0.03] tracking-tighter select-none pointer-events-none">
               LIMINAL
             </h1>
           </div>
           
           <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 font-mono-label uppercase tracking-widest text-[10px] text-zinc-600">
             <span>© {new Date().getFullYear()} Liminal Solutions. All rights reserved.</span>
             <span>Based in the United Kingdom</span>
           </div>
        </div>
      </div>
    </footer>
  );
};
