import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Share2 } from 'lucide-react';

export default function FinalScore({ score, totalPossible, totalQuestions, answeredCount, username, onRetry }) {
  const percentage = totalPossible > 0 ? Math.round((score / totalPossible) * 100) : 0;

  const getMessage = () => {
    if (percentage === 100) return { text: 'Perfect Score!', color: 'text-success' };
    if (percentage >= 80) return { text: 'Excellent Work!', color: 'text-success' };
    if (percentage >= 60) return { text: 'Good Effort!', color: 'text-clay' };
    if (percentage >= 40) return { text: 'Keep Practicing', color: 'text-clay' };
    return { text: 'Review & Try Again', color: 'text-error' };
  };

  const message = getMessage();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="card max-w-lg mx-auto text-center"
    >
      {/* Trophy */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        className="w-20 h-20 rounded-2xl bg-clay/10 flex items-center justify-center mx-auto mb-6"
      >
        <Trophy className="text-clay" size={36} />
      </motion.div>

      <h2 className="text-2xl font-bold text-moss mb-1">Quiz Complete</h2>
      <p className="text-charcoal/50 text-sm mb-8">
        Well done, <span className="font-semibold text-moss">{username}</span>
      </p>

      {/* Score circle */}
      <div className="relative w-32 h-32 mx-auto mb-8">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r="56"
            fill="none"
            stroke="#2E403615"
            strokeWidth="6"
          />
          <motion.circle
            cx="64"
            cy="64"
            r="56"
            fill="none"
            stroke={percentage >= 60 ? '#4CAF50' : '#CC5833'}
            strokeWidth="6"
            strokeDasharray={352}
            strokeDashoffset={352}
            animate={{ strokeDashoffset: 352 * (1 - percentage / 100) }}
            transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-mono text-3xl font-bold text-moss"
          >
            {percentage}%
          </motion.span>
        </div>
      </div>

      <h3 className={`text-xl font-bold mb-6 ${message.color}`}>
        {message.text}
      </h3>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-moss/5">
          <p className="font-mono text-2xl font-bold text-moss">{score}</p>
          <p className="text-xs text-charcoal/40">Score</p>
        </div>
        <div className="p-4 rounded-2xl bg-moss/5">
          <p className="font-mono text-2xl font-bold text-moss">{totalPossible}</p>
          <p className="text-xs text-charcoal/40">Possible</p>
        </div>
        <div className="p-4 rounded-2xl bg-moss/5">
          <p className="font-mono text-2xl font-bold text-moss">{answeredCount}</p>
          <p className="text-xs text-charcoal/40">Answered</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={onRetry} className="btn-primary flex-1 flex items-center justify-center gap-2">
          <RotateCcw size={16} />
          Try Again
        </button>
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'MCQ Quiz Score',
                text: `I scored ${score}/${totalPossible} (${percentage}%) on the quiz!`,
              });
            }
          }}
          className="btn-secondary flex-1 flex items-center justify-center gap-2"
        >
          <Share2 size={16} />
          Share Score
        </button>
      </div>
    </motion.div>
  );
}
