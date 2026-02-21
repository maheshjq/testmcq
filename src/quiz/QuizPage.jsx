import { useEffect, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import useQuiz from '../hooks/useQuiz';
import { QUIZ_STATES } from '../constants';
import { getCategoryById } from '@/config/lessons-metadata';
import ProgressBar from './ProgressBar';
import UsernameGate from './UsernameGate';
import QuestionCard from './QuestionCard';
import FeedbackPanel from './FeedbackPanel';
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

export default function QuizPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryId = searchParams.get('category');
  const filesParam = searchParams.get('files');

  const lessonFiles = useMemo(
    () => (filesParam ? decodeURIComponent(filesParam).split(',').filter(Boolean) : []),
    [filesParam]
  );

  const category = categoryId ? getCategoryById(categoryId) : null;
  const displayName = category ? category.title : categoryId || '';

  const quiz = useQuiz();

  // Initialize quiz when we have valid params
  useEffect(() => {
    if (lessonFiles.length > 0 && categoryId) {
      quiz.initQuiz(categoryId);
    }
  }, [categoryId, lessonFiles.length]);

  // No files specified — redirect to home
  if (!filesParam || lessonFiles.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="max-w-4xl mx-auto py-12 px-4">
          <ErrorState message="No lessons selected. Please choose lessons from the home page." />
        </div>
      </div>
    );
  }

  const backPath = categoryId ? `/lessons/${categoryId}` : '/';

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to={backPath} className="inline-flex items-center gap-1 text-sm text-moss/50 hover:text-moss no-underline">
            <ArrowLeft size={14} /> Back
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
              <h2 className="text-sm font-mono text-moss/50 mb-3">{displayName}</h2>
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
            onStart={() => quiz.startQuiz(lessonFiles)}
            subject={displayName}
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
            waitTime={quiz.waitTime}
            onCountdownComplete={quiz.retryQuestion}
          />
        )}

        {quiz.state === QUIZ_STATES.FINAL_SCORE && (
          <FinalScore
            score={quiz.score}
            totalPossible={quiz.totalPossiblePoints}
            totalQuestions={quiz.questions.length}
            answeredCount={quiz.answeredQuestions.size}
            username={quiz.username}
            onRetry={() => navigate('/')}
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
