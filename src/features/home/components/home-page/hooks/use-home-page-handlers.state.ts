import { useCallback } from 'react';

interface UseHomePageHandlersProps {
  setIntroFinished: (value: boolean) => void;
  setCurrentSection: (value: number | ((prev: number) => number)) => void;
}

export function useHomePageHandlers({
  setIntroFinished,
  setCurrentSection,
}: UseHomePageHandlersProps) {
  const handleIntroEnd = useCallback(() => {
    setIntroFinished(true);
  }, [setIntroFinished]);

  const handleNewChart = useCallback(() => {
    setCurrentSection(0);
    setIntroFinished(false);
  }, [setCurrentSection, setIntroFinished]);

  return {
    handleIntroEnd,
    handleNewChart,
  };
}
