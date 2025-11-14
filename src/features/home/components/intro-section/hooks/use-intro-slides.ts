import { useState } from 'react';
import { introSlides } from '@/features/home/constants/intro-slides';

interface UseIntroSlidesProps {
  onSkip: () => void;
}

export function useIntroSlides({ onSkip }: UseIntroSlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const isLastSlide = currentSlide === introSlides.length - 1;

  const nextSlide = () => {
    if (isLastSlide) {
      onSkip();
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + introSlides.length) % introSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, introSlides.length - 1)));
  };

  return {
    introSlides,
    currentSlide,
    setCurrentSlide: goToSlide,
    nextSlide,
    prevSlide,
    isLastSlide,
  };
}
