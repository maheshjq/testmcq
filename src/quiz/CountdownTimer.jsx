import { useEffect } from 'react';
import { motion } from 'framer-motion';
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center pt-2"
    >
      {/* Circular countdown */}
      <div className="relative w-20 h-20 mx-auto mb-4">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="#2E403620"
            strokeWidth="4"
          />
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="#CC5833"
            strokeWidth="4"
            strokeDasharray={214}
            strokeDashoffset={214 * (1 - progress)}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-xl font-bold text-moss">{timeLeft}</span>
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

      <p className="text-xs font-mono text-charcoal/30 mt-3">
        {timeLeft > 0 ? `Retry available in ${timeLeft}s` : 'Reshuffling choices…'}
      </p>
    </motion.div>
  );
}
