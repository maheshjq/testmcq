import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import useQuiz from '../hooks/useQuiz';
import { QUIZ_STATES, SUBJECT_REGEX } from '../constants';
import ProgressBar from './ProgressBar';
import UsernameGate from './UsernameGate';
import QuestionCard from './QuestionCard';
import FeedbackPanel from './FeedbackPanel';
import CountdownTimer from './CountdownTimer';
import FinalScore from './FinalScore';
import InterstitialAd from './InterstitialAd';

function LoadingSpinner() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-10 h-10 border-3 border-moss/20 border-t-clay rounded-full mx-auto mb-4"
          style={{ borderWidth: '3px' }}
        />
        <p className="text-charcoal/50 text-sm font-mono">Loading questions...</p>
      </div>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="card max-w-md w-full text-center">
        <div className="w-14 h-14 rounded-2xl bg-error/10 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="text-error" size={24} />
        </div>
        <h3 className="text-lg font-bold text-moss mb-2">Unable to Load Quiz</h3>
        <p className="text-charcoal/50 text-sm mb-6">{message}</p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2 no-underline">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function SubjectPicker({ onSelect }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="card max-w-md w-full text-center">
        <h3 className="text-xl font-bold text-moss mb-2">Select a Subject</h3>
        <p className="text-charcoal/50 text-sm mb-6">
          Add <code className="font-mono bg-moss/5 px-2 py-0.5 rounded text-xs">?subject=grade_10_lesson_05</code> to the URL, or choose one below:
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['grade_6_lesson_01', 'grade_7_lesson_01', 'grade_8_lesson_01', 'grade_10_lesson_05'].map((s) => (
            <button
              key={s}
              onClick={() => onSelect(s)}
              className="px-4 py-2 rounded-full text-xs font-mono bg-moss/10 text-moss hover:bg-clay hover:text-white transition-colors cursor-pointer border-none"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function QuizPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const subjectParam = searchParams.get('subject');

  const quiz = useQuiz();

  useEffect(() => {
    if (subjectParam && SUBJECT_REGEX.test(subjectParam)) {
      quiz.initQuiz(subjectParam);
    }
  }, [subjectParam]);

  const handleSubjectSelect = (subjectId) => {
    setSearchParams({ subject: subjectId });
  };

  // No subject specified
  if (!subjectParam) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-moss/50 hover:text-moss mb-8 no-underline">
            <ArrowLeft size={14} /> Back
          </Link>
          <SubjectPicker onSelect={handleSubjectSelect} />
        </div>
      </div>
    );
  }

  // Invalid subject
  if (!SUBJECT_REGEX.test(subjectParam)) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <ErrorState message={`Invalid subject format: "${subjectParam}". Use format like grade_10_lesson_05`} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-moss/50 hover:text-moss no-underline">
            <ArrowLeft size={14} /> Home
          </Link>
          {quiz.state !== QUIZ_STATES.USERNAME_ENTRY && quiz.state !== QUIZ_STATES.IDLE && (
            <span className="font-mono text-xs text-charcoal/40">
              Score: <span className="text-clay font-bold">{quiz.score}</span>
            </span>
          )}
        </div>

        {/* Subject header + Progress */}
        {quiz.state !== QUIZ_STATES.USERNAME_ENTRY &&
          quiz.state !== QUIZ_STATES.IDLE &&
          quiz.state !== QUIZ_STATES.FINAL_SCORE && (
            <div className="mb-8">
              <h2 className="text-sm font-mono text-moss/50 mb-3">{quiz.subject}</h2>
              <ProgressBar
                current={quiz.answeredQuestions.size}
                total={quiz.questions.length}
                progress={quiz.progress}
              />
            </div>
          )}

        {/* State machine renderer */}
        {quiz.state === QUIZ_STATES.USERNAME_ENTRY && (
          <UsernameGate
            username={quiz.username}
            email={quiz.email}
            onUsernameChange={quiz.setUsername}
            onEmailChange={quiz.setEmail}
            onStart={() => quiz.startQuiz(subjectParam)}
            subject={subjectParam}
          />
        )}

        {quiz.state === QUIZ_STATES.LOADING && <LoadingSpinner />}

        {quiz.state === QUIZ_STATES.QUESTION && quiz.currentQuestion && (
          <QuestionCard
            question={quiz.currentQuestion}
            selectedAnswer={quiz.selectedAnswer}
            onSelectAnswer={quiz.setSelectedAnswer}
            onSubmit={quiz.submitAnswer}
          />
        )}

        {(quiz.state === QUIZ_STATES.FEEDBACK_CORRECT ||
          quiz.state === QUIZ_STATES.FEEDBACK_WRONG) && (
          <FeedbackPanel
            isCorrect={quiz.isCorrect}
            feedbackText={quiz.feedbackText}
            onNext={quiz.nextQuestion}
            onStartCountdown={quiz.startCountdown}
          />
        )}

        {quiz.state === QUIZ_STATES.COUNTDOWN && (
          <CountdownTimer
            waitTime={quiz.waitTime}
            onComplete={quiz.retryQuestion}
          />
        )}

        {quiz.state === QUIZ_STATES.FINAL_SCORE && (
          <FinalScore
            score={quiz.score}
            totalPossible={quiz.totalPossiblePoints}
            totalQuestions={quiz.questions.length}
            answeredCount={quiz.answeredQuestions.size}
            username={quiz.username}
            onRetry={quiz.resetQuiz}
          />
        )}

        {quiz.error && quiz.state === QUIZ_STATES.IDLE && (
          <ErrorState message={quiz.error} />
        )}

        {/* Interstitial ad overlay */}
        {quiz.showInterstitial && (
          <InterstitialAd onDismiss={quiz.dismissInterstitial} />
        )}
      </div>
    </div>
  );
}
