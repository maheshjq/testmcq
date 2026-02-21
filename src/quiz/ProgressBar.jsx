import { motion } from 'framer-motion';

export default function ProgressBar({ current, total, progress }) {
  // Hue shifts from 120 (green) toward 60 (yellow) as progress increases
  const hue = 120 - progress * 60;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-mono text-charcoal/50">
          {current} of {total} answered
        </span>
        <span className="text-xs font-mono text-charcoal/50">
          {Math.round(progress * 100)}%
        </span>
      </div>
      <div className="w-full h-2 bg-moss/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: `hsl(${hue}, 70%, 45%)` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
