export interface IntroSectionProps {
  currentSection: number;
  introFinished: boolean;
  onSkip: () => void;
}

export interface IntroSectionViewProps extends IntroSectionProps {
  currentSlide: number;
  setCurrentSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
}
