import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import useCountdown from '../hooks/useCountdown';

export default function InterstitialAd({ onDismiss }) {
  const { timeLeft, start } = useCountdown(onDismiss);

  useEffect(() => {
    start(5);
  }, [start]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/80 backdrop-blur-sm px-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card max-w-sm w-full text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-clay/10 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="text-clay" size={24} />
        </div>

        <h3 className="text-lg font-bold text-moss mb-2">Go Ad-Free</h3>
        <p className="text-charcoal/50 text-sm mb-6">
          Upgrade to Premium for an uninterrupted learning experience with enhanced feedback and AI tools.
        </p>

        <div className="p-4 rounded-2xl bg-moss/5 mb-6">
          <p className="font-mono text-sm text-charcoal/40">
            Resuming in <span className="text-clay font-bold text-lg">{timeLeft}</span> seconds
          </p>
        </div>

        <button
          disabled={timeLeft > 0}
          onClick={onDismiss}
          className={`btn-primary w-full ${timeLeft > 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          {timeLeft > 0 ? `Wait ${timeLeft}s...` : 'Continue Quiz'}
        </button>

        <p className="text-xs text-charcoal/30 mt-3">
          Premium members skip this screen
        </p>
      </motion.div>
    </motion.div>
  );
}
