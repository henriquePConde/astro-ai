export interface IntroCarouselViewProps {
  currentSlide: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  goToSlide: (index: number) => void;
  visible: boolean;
  slides: Array<{
    title: string;
    content: string[];
    image: string;
    alt: string;
  }>;
}
