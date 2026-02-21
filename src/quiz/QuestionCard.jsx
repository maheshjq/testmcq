import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export default function QuestionCard({ question, selectedAnswer, onSelectAnswer, onSubmit }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="card max-w-2xl mx-auto"
    >
      {/* Point badge */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-mono text-charcoal/40">
          Question #{question.index}
        </span>
        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-clay/10 text-clay text-xs font-semibold">
          <Award size={14} />
          {question.points || 1} {question.points === 1 ? 'point' : 'points'}
        </div>
      </div>

      {/* Question title */}
      <h3 className="text-lg md:text-xl font-semibold text-moss mb-8 leading-relaxed">
        {question.title}
      </h3>

      {/* Choices */}
      <div className="space-y-3 mb-8">
        {question.choices.map((choice, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelectAnswer(idx)}
            className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer bg-transparent
              ${
                selectedAnswer === idx
                  ? 'border-clay bg-clay/5 shadow-md'
                  : 'border-moss/10 hover:border-moss/30'
              }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors
                  ${
                    selectedAnswer === idx
                      ? 'bg-clay text-white'
                      : 'bg-moss/10 text-moss/50'
                  }`}
              >
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="text-sm text-charcoal/80">{choice.text}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Submit button */}
      <button
        onClick={onSubmit}
        disabled={selectedAnswer === null}
        className={`btn-primary w-full ${
          selectedAnswer === null ? 'opacity-40 cursor-not-allowed' : ''
        }`}
      >
        Submit Answer
      </button>
    </motion.div>
  );
}
