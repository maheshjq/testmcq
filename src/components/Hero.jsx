import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80)',
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 gradient-hero" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-cream/60 font-mono text-sm tracking-[0.3em] uppercase mb-6">
            Interactive Learning Platform
          </p>

          <h1 className="text-white mb-4">
            <span className="block text-4xl md:text-6xl font-sans font-bold mb-2">
              ඉගෙනීම is the
            </span>
            <span className="heading-dramatic text-cream">
              Journey.
            </span>
          </h1>

          <p className="text-cream/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            MCQ quizzes for Dhamma school students. Instant feedback.
            Track your progress. Every wrong answer is a teaching moment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz" className="btn-primary text-lg py-4 px-10 no-underline inline-flex items-center justify-center gap-2">
              Begin Your Quiz
              <ArrowRight size={20} />
            </Link>
            <a href="#features" className="btn-secondary text-lg py-4 px-10 no-underline border-cream/30 text-cream hover:bg-cream hover:text-moss inline-flex items-center justify-center">
              Explore Features
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-cream/30 flex items-start justify-center p-1.5"
          >
            <div className="w-1.5 h-3 bg-cream/50 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
