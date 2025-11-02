'use client';

import { IconButton } from '@mui/material';
import { styles } from './intro-nav-controls.styles';
import type { IntroNavControlsProps } from './intro-nav-controls.types';

export function IntroNavControlsView({
  onPrev,
  onNext,
  currentSlide,
  lastSlide,
}: IntroNavControlsProps) {
  return (
    <>
      {currentSlide > 0 && (
        <IconButton
          onClick={onPrev}
          sx={(theme) => ({
            ...styles.button()(theme),
            ...styles.prevButton()(theme),
          })}
          aria-label="Previous slide"
        >
          ←
        </IconButton>
      )}
      <IconButton
        onClick={onNext}
        sx={(theme) => ({
          ...styles.button()(theme),
          ...styles.nextButton()(theme),
        })}
        aria-label={currentSlide === lastSlide ? 'Complete intro' : 'Next slide'}
      >
        {currentSlide === lastSlide ? '✓' : '→'}
      </IconButton>
    </>
  );
}
