import { useState, useEffect } from 'react';

export function useIntroSectionState() {
  const [currentSection, setCurrentSection] = useState(0);
  const [introFinished, setIntroFinished] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  // Ensure introFinished is true when in section 2 (form section)
  // This ensures the form is always visible and interactive when currentSection === 2
  useEffect(() => {
    if (currentSection === 2 && !introFinished) {
      setIntroFinished(true);
    }
  }, [currentSection, introFinished]);

  const handleSetIntroFinished = (value: boolean) => {
    setIntroFinished(value);
  };

  const handleSkipIntro = () => {
    setCurrentSection(2);
    setIntroFinished(true);
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
    scrolling,
    setScrolling,
    handleSkipIntro,
    resetSection,
  };
}
