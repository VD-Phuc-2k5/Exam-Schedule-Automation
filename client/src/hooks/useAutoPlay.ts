import { useEffect, useRef } from "react";

export function useAutoPlay(
  isRunning: boolean,
  currentStepIndex: number,
  stepsLength: number,
  onNext: () => void,
  onComplete: () => void,
  delay: number = 2000,
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!isRunning) return;

    // Check if we can continue to next step
    if (currentStepIndex < stepsLength - 1) {
      timeoutRef.current = setTimeout(() => {
        onNext();
        timeoutRef.current = null;
      }, delay);
    } else if (currentStepIndex >= stepsLength - 1) {
      // Animation completed
      onComplete();
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isRunning, currentStepIndex, stepsLength, onNext, onComplete, delay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
}
