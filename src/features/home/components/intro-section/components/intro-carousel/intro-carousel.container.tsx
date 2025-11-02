'use client';

import { useIntroSlides } from '../../hooks/use-intro-slides';
import { IntroCarouselView } from './intro-carousel.view';

interface IntroCarouselContainerProps {
  visible: boolean;
  onSkip: () => void;
}

export function IntroCarouselContainer({ visible, onSkip }: IntroCarouselContainerProps) {
  const { introSlides, currentSlide, setCurrentSlide, nextSlide, prevSlide } = useIntroSlides({
    onSkip,
  });

  return (
    <IntroCarouselView
      currentSlide={currentSlide}
      onNext={nextSlide}
      onPrev={prevSlide}
      onSkip={onSkip}
      goToSlide={setCurrentSlide}
      visible={visible}
      slides={introSlides}
    />
  );
}
