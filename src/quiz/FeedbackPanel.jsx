import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Star, ArrowRight } from 'lucide-react';

export default function FeedbackPanel({ isCorrect, feedbackText, onNext, onStartCountdown }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`card max-w-2xl mx-auto border-2 ${
        isCorrect ? 'border-success/30' : 'border-error/30'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        {isCorrect ? (
          <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center">
            <CheckCircle className="text-success" size={24} />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-2xl bg-error/10 flex items-center justify-center">
            <XCircle className="text-error" size={24} />
          </div>
        )}
        <div>
          <h3 className={`text-lg font-bold ${isCorrect ? 'text-success' : 'text-error'}`}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </h3>
          <p className="text-xs text-charcoal/40">
            {isCorrect ? 'Well done!' : 'Read the feedback carefully'}
          </p>
        </div>
      </div>

      {/* Feedback text */}
      <div
        className={`p-5 rounded-2xl mb-6 ${
          isCorrect ? 'bg-success/5' : 'bg-error/5'
        }`}
      >
        <p className="text-sm text-charcoal/70 leading-relaxed">{feedbackText}</p>
      </div>

      {/* Star rating stub (Phase 2) — only for wrong answers */}
      {!isCorrect && (
        <div className="mb-6">
          <p className="text-xs text-charcoal/40 mb-2">Rate this feedback (coming soon)</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="p-1 bg-transparent border-none cursor-pointer"
              >
                <Star
                  size={20}
                  className={
                    star <= (hoverRating || rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-charcoal/20'
                  }
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      {isCorrect ? (
        <button onClick={onNext} className="btn-primary w-full flex items-center justify-center gap-2">
          Next Question
          <ArrowRight size={18} />
        </button>
      ) : (
        <button onClick={onStartCountdown} className="btn-primary w-full bg-moss hover:bg-moss-600">
          I've Read the Feedback — Continue
        </button>
      )}
    </motion.div>
  );
}
