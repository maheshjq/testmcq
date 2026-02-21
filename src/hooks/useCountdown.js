import { useState, useEffect, useCallback, useRef } from 'react';

export default function useCountdown(onComplete) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          onCompleteRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const start = useCallback((seconds) => {
    setTotalTime(seconds);
    setTimeLeft(seconds);
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(0);
  }, []);

  const progress = totalTime > 0 ? (totalTime - timeLeft) / totalTime : 0;

  return { timeLeft, totalTime, progress, isRunning, start, stop };
}
