import { motion } from "framer-motion";

export const Contact = () => {
  return (
    <section id="contact" className="relative py-32 md:py-56 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial-ember opacity-50 pointer-events-none" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-mono-label text-ink-dim mb-8"
        >
          ◦ 08 / Engage
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(3rem,10vw,10rem)] leading-[0.9] tracking-tighter max-w-5xl mb-16 md:mb-24"
        >
          Let's <em className="text-ember-gradient">build</em> something that lasts.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-px bg-border max-w-4xl">
          {[
            { label: "Email", value: "hello@autovanza.in", href: "mailto:hello@autovanza.in" },
            { label: "WhatsApp", value: "+91 · Direct line", href: "https://wa.me/" },
            { label: "Location", value: "Bengaluru, IN", href: "#" },
          ].map((c) => (
            <motion.a
              key={c.label}
              href={c.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group bg-surface p-8 hover:bg-surface-raised transition-colors duration-500"
            >
              <div className="font-mono-label text-ink-faint mb-6">{c.label}</div>
              <div className="font-display text-2xl text-ink group-hover:text-ember transition-colors duration-500">
                {c.value}
              </div>
              <div className="mt-6 w-8 h-px bg-ink-faint group-hover:w-16 group-hover:bg-ember transition-all duration-500" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
