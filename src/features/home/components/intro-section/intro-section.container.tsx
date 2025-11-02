'use client';

import { useIntroSlides } from './hooks/use-intro-slides';
import { IntroSectionView } from './intro-section.view';
import type { IntroSectionProps } from './intro-section.types';

export function IntroSectionContainer({
  currentSection,
  introFinished,
  onSkip,
}: IntroSectionProps) {
  const { currentSlide, setCurrentSlide, nextSlide, prevSlide } = useIntroSlides({ onSkip });

  return (
    <IntroSectionView
      currentSection={currentSection}
      introFinished={introFinished}
      onSkip={onSkip}
      currentSlide={currentSlide}
      setCurrentSlide={setCurrentSlide}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
    />
  );
}
