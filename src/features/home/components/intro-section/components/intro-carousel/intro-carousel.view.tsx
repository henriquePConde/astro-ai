'use client';

import { Box, Button } from '@mui/material';
import { IntroNavControls } from '../intro-nav-controls';
import { IntroSlide } from '../intro-slide';
import { IntroDots } from '../intro-dots';
import { styles } from './intro-carousel.styles';
import { useIsDesktop } from '@/shared/hooks/use-is-desktop';
import type { IntroCarouselViewProps } from './intro-carousel.types';

export function IntroCarouselView({
  currentSlide,
  onNext,
  onPrev,
  onSkip,
  goToSlide,
  visible,
  slides,
}: IntroCarouselViewProps) {
  const isDesktop = useIsDesktop();
  return (
    <Box sx={styles.root(visible)}>
      <Box sx={styles.container()}>
        <IntroNavControls
          currentSlide={currentSlide}
          lastSlide={slides.length - 1}
          onNext={onNext}
          onPrev={onPrev}
        />
        <Box sx={styles.carousel()}>
          <Button onClick={onSkip} sx={styles.skipButton()}>
            Skip Intro →
          </Button>
          <Box sx={styles.overlay()} />
          <Box sx={styles.content()}>
            <Box sx={styles.slidesContainer()}>
              {slides.map((slide, index) => (
                <IntroSlide key={index} {...slide} isActive={index === currentSlide} />
              ))}
            </Box>
            {isDesktop && (
              <IntroDots count={slides.length} current={currentSlide} goTo={goToSlide} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
