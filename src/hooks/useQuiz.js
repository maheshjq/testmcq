import { useState, useCallback, useMemo } from 'react';
import { QUIZ_STATES, READING_SPEED, MIN_WAIT_TIME, MAX_WAIT_TIME } from '../constants';
import { logEvent } from '../firebase';

function getFibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function useQuiz() {
  const [state, setState] = useState(QUIZ_STATES.IDLE);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [wrongAttempts, setWrongAttempts] = useState({}); // { questionIndex: count }
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [error, setError] = useState(null);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [waitTime, setWaitTime] = useState(0);

  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex] || null,
    [questions, currentQuestionIndex]
  );

  const totalPossiblePoints = useMemo(
    () => questions.reduce((sum, q) => sum + (q.points || 1), 0),
    [questions]
  );

  const progress = useMemo(
    () => (questions.length > 0 ? answeredQuestions.size / questions.length : 0),
    [answeredQuestions.size, questions.length]
  );

  const loadQuestions = useCallback(async (subjectId) => {
    setState(QUIZ_STATES.LOADING);
    setSubject(subjectId);
    setError(null);

    try {
      // Try to load from local sample data first (for dev), then Firebase
      let data;
      try {
        const response = await fetch(`/question-sets/${subjectId}.json`);
        if (response.ok) {
          data = await response.json();
        }
      } catch {
        // Ignore fetch errors for file-based loading
      }

      if (!data) {
        // Fallback to sample data
        const response = await fetch('/sample-questions.json');
        if (!response.ok) throw new Error('Could not load questions');
        data = await response.json();
      }

      const questionList = Array.isArray(data) ? data : data.questions || [];
      if (questionList.length === 0) {
        throw new Error('No questions found for this subject');
      }

      // Shuffle questions, and shuffle choices within each question
      const shuffledQuestions = shuffleArray(questionList).map((q) => ({
        ...q,
        choices: shuffleArray(q.choices),
      }));

      setQuestions(shuffledQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setAnsweredQuestions(new Set());
      setWrongAttempts({});
      setSelectedAnswer(null);
      setState(QUIZ_STATES.QUESTION);

      logEvent('quiz_start', { subject: subjectId, username });
    } catch (err) {
      setError(err.message);
      setState(QUIZ_STATES.IDLE);
    }
  }, [username]);

  const calculateWaitTime = useCallback((currentAttemptCount) => {
    if (!currentQuestion || selectedAnswer === null) return MIN_WAIT_TIME;

    const chosen = currentQuestion.choices[selectedAnswer];
    const feedback = currentQuestion.feedbackIncorrect || '';
    const totalLength =
      currentQuestion.title.length + (chosen?.text?.length || 0) + feedback.length;
    const baseReadingTime = Math.ceil(totalLength / READING_SPEED);
    const bufferTime = Math.ceil(baseReadingTime * 0.3);
    let computed = baseReadingTime + bufferTime;

    if (currentAttemptCount > 0) {
      const fibMultiplier = getFibonacci(currentAttemptCount);
      computed += fibMultiplier * 2;
    }

    return Math.max(MIN_WAIT_TIME, Math.min(computed, MAX_WAIT_TIME));
  }, [currentQuestion, selectedAnswer]);

  const submitAnswer = useCallback(() => {
    if (selectedAnswer === null || !currentQuestion) return;

    const chosen = currentQuestion.choices[selectedAnswer];
    const correct = chosen.isCorrect;
    const qIndex = currentQuestion.index;

    setIsCorrect(correct);

    if (correct) {
      setFeedbackText(currentQuestion.feedbackCorrect || 'Correct!');

      // Award points ONLY on first attempt
      if (!answeredQuestions.has(qIndex)) {
        setScore((prev) => prev + (currentQuestion.points || 1));
      }
      // Always mark as done (gates progress bar and next button)
      setAnsweredQuestions((prev) => new Set([...prev, qIndex]));

      setState(QUIZ_STATES.FEEDBACK_CORRECT);

      logEvent('answer_question', {
        question_index: qIndex,
        is_correct: true,
      });
    } else {
      setFeedbackText(
        currentQuestion.feedbackIncorrect || 'Incorrect. Please try again.'
      );

      // Track wrong attempts for this question — compute fresh count for wait time
      const newAttemptCount = (wrongAttempts[qIndex] || 0) + 1;
      setWrongAttempts((prev) => ({
        ...prev,
        [qIndex]: newAttemptCount,
      }));

      // Compute wait time with the fresh count (avoids stale-state read)
      const waitSeconds = calculateWaitTime(newAttemptCount);
      setWaitTime(waitSeconds);

      setState(QUIZ_STATES.FEEDBACK_WRONG);

      logEvent('answer_question', {
        question_index: qIndex,
        is_correct: false,
      });
    }
  }, [selectedAnswer, currentQuestion, answeredQuestions, wrongAttempts, calculateWaitTime]);

  const startCountdown = useCallback(() => {
    setState(QUIZ_STATES.COUNTDOWN);
  }, []);

  const retryQuestion = useCallback(() => {
    setSelectedAnswer(null);
    setFeedbackText('');
    // Re-shuffle choices for retry
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === currentQuestionIndex ? { ...q, choices: shuffleArray(q.choices) } : q
      )
    );
    setState(QUIZ_STATES.QUESTION);
  }, [currentQuestionIndex]);

  const nextQuestion = useCallback(() => {
    const nextIdx = currentQuestionIndex + 1;

    // Check if we should show interstitial ad (between Q3 and Q4)
    if (nextIdx === 3 && !showInterstitial) {
      setShowInterstitial(true);
      return;
    }

    setShowInterstitial(false);

    if (nextIdx >= questions.length) {
      setState(QUIZ_STATES.FINAL_SCORE);
      logEvent('quiz_complete', {
        score,
        total_possible: totalPossiblePoints,
        percentage: Math.round((score / totalPossiblePoints) * 100),
      });
    } else {
      setCurrentQuestionIndex(nextIdx);
      setSelectedAnswer(null);
      setFeedbackText('');
      setState(QUIZ_STATES.QUESTION);
    }
  }, [currentQuestionIndex, questions.length, score, totalPossiblePoints, showInterstitial]);

  const dismissInterstitial = useCallback(() => {
    setShowInterstitial(false);
    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setFeedbackText('');
    setState(QUIZ_STATES.QUESTION);
  }, []);

  const startQuiz = useCallback(
    (subjectId) => {
      if (!username.trim()) return;
      loadQuestions(subjectId);
    },
    [username, loadQuestions]
  );

  const resetQuiz = useCallback(() => {
    setState(QUIZ_STATES.USERNAME_ENTRY);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnsweredQuestions(new Set());
    setWrongAttempts({});
    setSelectedAnswer(null);
    setFeedbackText('');
    setError(null);
    setShowInterstitial(false);
    setWaitTime(0);
  }, []);

  const initQuiz = useCallback((subjectId) => {
    setSubject(subjectId);
    setState(QUIZ_STATES.USERNAME_ENTRY);
  }, []);

  return {
    // State
    state,
    questions,
    currentQuestion,
    currentQuestionIndex,
    username,
    email,
    subject,
    score,
    totalPossiblePoints,
    progress,
    answeredQuestions,
    wrongAttempts,
    selectedAnswer,
    feedbackText,
    isCorrect,
    error,
    showInterstitial,
    waitTime,

    // Actions
    setUsername,
    setEmail,
    setSelectedAnswer,
    initQuiz,
    startQuiz,
    submitAnswer,
    calculateWaitTime,
    startCountdown,
    retryQuestion,
    nextQuestion,
    dismissInterstitial,
    resetQuiz,
  };
}
