import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import useCountdown from '../hooks/useCountdown';

export default function CountdownTimer({ waitTime, onComplete }) {
  const { timeLeft, progress, start } = useCountdown(onComplete);

  useEffect(() => {
    if (waitTime > 0) {
      start(waitTime);
    }
  }, [waitTime, start]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card max-w-md mx-auto text-center"
    >
      <div className="w-16 h-16 rounded-full bg-moss/10 flex items-center justify-center mx-auto mb-6">
        <Clock className="text-moss" size={28} />
      </div>

      <h3 className="text-lg font-bold text-moss mb-2">Take a moment</h3>
      <p className="text-charcoal/50 text-sm mb-8">
        Review the feedback before trying again
      </p>

      {/* Circular countdown */}
      <div className="relative w-24 h-24 mx-auto mb-6">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
          <circle
            cx="48"
            cy="48"
            r="42"
            fill="none"
            stroke="#2E403620"
            strokeWidth="4"
          />
          <circle
            cx="48"
            cy="48"
            r="42"
            fill="none"
            stroke="#CC5833"
            strokeWidth="4"
            strokeDasharray={264}
            strokeDashoffset={264 * (1 - progress)}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-2xl font-bold text-moss">{timeLeft}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-moss/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-clay rounded-full"
          style={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <p className="text-xs font-mono text-charcoal/30 mt-4">
        {timeLeft > 0 ? `${timeLeft}s remaining` : 'Ready to retry!'}
      </p>
    </motion.div>
  );
}
