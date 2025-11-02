import { useState, useEffect } from 'react';

export function useIntroSectionState() {
  const [currentSection, setCurrentSection] = useState(0);
  const [introFinished, setIntroFinished] = useState(false);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    // Load hasSeenIntro from localStorage on mount
    const stored = localStorage.getItem('hasSeenIntro');
    if (stored === 'true') {
      setHasSeenIntro(true);
    }
  }, []);

  const handleSetIntroFinished = (value: boolean) => {
    setIntroFinished(value);
  };

  const handleSkipIntro = () => {
    setHasSeenIntro(true);
    setCurrentSection(2);
    setIntroFinished(true);
    localStorage.setItem('hasSeenIntro', 'true');
  };

  const resetSection = () => {
    setCurrentSection(0);
    setIntroFinished(false);
  };

  return {
    currentSection,
    setCurrentSection,
    introFinished,
    setIntroFinished: handleSetIntroFinished,
    hasSeenIntro,
    setHasSeenIntro,
    scrolling,
    setScrolling,
    handleSkipIntro,
    resetSection,
  };
}
