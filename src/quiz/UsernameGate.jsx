import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, ArrowRight } from 'lucide-react';

export default function UsernameGate({ username, email, onUsernameChange, onEmailChange, onStart, subject }) {
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (username.trim()) {
      onStart();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[80vh] flex items-center justify-center px-4"
    >
      <div className="card max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-moss/10 flex items-center justify-center mx-auto mb-6">
          <User className="text-moss" size={28} />
        </div>

        <h2 className="text-2xl font-bold text-moss mb-2">Welcome, Student</h2>
        <p className="text-charcoal/50 text-sm mb-1">
          Subject: <span className="font-mono text-clay">{subject}</span>
        </p>
        <p className="text-charcoal/40 text-xs mb-8">
          Enter your name to begin the quiz
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-moss/30" size={18} />
            <input
              type="text"
              placeholder="Your name *"
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-full bg-cream border text-charcoal text-sm
                focus:outline-none focus:ring-2 focus:ring-clay/30 transition-all
                ${touched && !username.trim() ? 'border-error' : 'border-moss/20'}`}
            />
            {touched && !username.trim() && (
              <p className="text-error text-xs mt-1 ml-4">Name is required</p>
            )}
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-moss/30" size={18} />
            <input
              type="email"
              placeholder="Email (optional — for score report)"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-cream border border-moss/20 text-charcoal text-sm
                focus:outline-none focus:ring-2 focus:ring-clay/30 transition-all"
            />
          </div>

          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 mt-6">
            Start Quiz
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
