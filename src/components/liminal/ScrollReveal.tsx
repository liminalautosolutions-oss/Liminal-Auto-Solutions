export const ScrollReveal = () => {
  return (
    <section className="relative w-full h-screen flex items-center py-20 md:py-32 overflow-hidden bg-black text-white">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src="/videos/liminalreferencevideo1.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        {/* Dark overlay to match the theme and improve contrast */}
        <div className="absolute inset-0 bg-black/55 z-10" />
      </div>

      <div className="container relative z-20">
        <div className="flex items-baseline justify-between mb-12 md:mb-20">
          <span className="font-mono-label text-ember">Manifesto</span>
          <span className="font-mono-label text-white/50 hidden md:block">
            On the record
          </span>
        </div>

        <p className="font-mono text-[clamp(1.8rem,5.5vw,4.5rem)] leading-[1.15] tracking-normal max-w-6xl text-white">
          Liminal is not an{" "}
          <span className="text-ember font-mono">agency.</span> We are a
          systems-driven partner built entirely around the automotive industry
        </p>
      </div>
    </section>
  );
};
