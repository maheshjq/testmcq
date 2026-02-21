import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'For Teachers', href: '#pricing' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? 'glass shadow-xl'
          : 'bg-transparent'
      }`}
    >
      <Link to="/" className="flex items-center gap-2 no-underline">
        <span className="text-lg font-bold text-moss">දහම්පාසල් MCQ</span>
        <span className="hidden sm:inline text-xs text-moss/60 font-mono mt-0.5">Interactive Quiz</span>
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm font-medium text-charcoal/70 hover:text-moss transition-colors no-underline"
          >
            {link.label}
          </a>
        ))}
        <Link to="/quiz" className="btn-primary text-sm py-2 px-6 no-underline">
          Start Quiz →
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden p-2 text-moss bg-transparent border-none"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 glass rounded-card p-6 flex flex-col gap-4 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-charcoal/70 hover:text-moss transition-colors no-underline"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/quiz"
            className="btn-primary text-sm py-2 px-6 text-center no-underline"
            onClick={() => setMobileOpen(false)}
          >
            Start Quiz →
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
