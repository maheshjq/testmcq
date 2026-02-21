import { motion } from 'framer-motion';

export default function Philosophy() {
  return (
    <section className="relative py-32 px-6 gradient-moss overflow-hidden">
      {/* Parallax texture dots */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, #F2F0E9 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-cream/40 font-mono text-xs tracking-[0.3em] uppercase mb-8">
            Our Philosophy
          </p>

          <p className="text-cream/60 text-xl md:text-2xl font-light mb-6 leading-relaxed">
            Most quiz apps give you:
          </p>
          <p className="text-cream text-2xl md:text-3xl font-semibold mb-12">
            right or wrong.
          </p>

          <p className="text-cream/60 text-xl md:text-2xl font-light mb-6 leading-relaxed">
            We give you:
          </p>
          <h2 className="heading-dramatic text-cream">
            the <span className="text-clay">reason</span>.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
