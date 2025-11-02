'use client';

import { IntroHeroPrompt } from './components/intro-hero-prompt';
import { IntroCarouselView } from './components/intro-carousel/intro-carousel.view';
import { introSlides } from '@/features/home/constants/intro-slides';
import type { IntroSectionViewProps } from './intro-section.types';

export function IntroSectionView({
  currentSection,
  introFinished,
  onSkip,
  currentSlide,
  setCurrentSlide,
  nextSlide,
  prevSlide,
}: IntroSectionViewProps) {
  const heroVisible = currentSection === 0 && introFinished;
  const carouselVisible = currentSection === 1 && introFinished;

  // Debug logging
  console.log('[IntroSectionView] Render:', {
    currentSection,
    introFinished,
    heroVisible,
    carouselVisible,
  });

  return (
    <>
      <IntroHeroPrompt visible={heroVisible} />
      <IntroCarouselView
        currentSlide={currentSlide}
        onNext={nextSlide}
        onPrev={prevSlide}
        onSkip={onSkip}
        goToSlide={setCurrentSlide}
        visible={carouselVisible}
        slides={introSlides}
      />
    </>
  );
}
