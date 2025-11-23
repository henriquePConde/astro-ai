'use client';

import { IntroHeroPrompt } from './components/intro-hero-prompt';
import { IntroCarouselView } from './components/intro-carousel/intro-carousel.view';
import { introSlides } from '@/features/home/constants/intro-slides';
import { useIsDesktop } from '@/shared/hooks/use-is-desktop';
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
  const isDesktop = useIsDesktop();

  const heroVisible = isDesktop && currentSection === 0 && introFinished;
  const carouselVisible =
    introFinished && ((isDesktop && currentSection === 1) || (!isDesktop && currentSection === 0));

  return (
    <>
      {isDesktop && <IntroHeroPrompt visible={heroVisible} />}
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
