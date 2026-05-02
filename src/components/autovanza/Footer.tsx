export const Footer = () => {
  return (
    <footer className="py-12 bg-background">
      <div className="hair-divider mb-12" />
      <div className="container flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-ember" />
          <span className="font-display text-xl text-ink">AutoVanza</span>
          <span className="font-mono-label text-ink-faint ml-2">— Built to Drive</span>
        </div>

        <div className="flex gap-8 font-mono-label text-ink-dim">
          <a href="#capabilities" className="link-underline">Capabilities</a>
          <a href="#work" className="link-underline">Work</a>
          <a href="#contact" className="link-underline">Contact</a>
        </div>

        <div className="font-mono-label text-ink-faint">
          © {new Date().getFullYear()} AutoVanza Solutions
        </div>
      </div>
    </footer>
  );
};
