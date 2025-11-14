'use client';

import { IconButton, Box } from '@mui/material';
import { styles } from './intro-dots.styles';
import type { IntroDotsProps } from './intro-dots.types';

export function IntroDotsView({ count, current, goTo }: IntroDotsProps) {
  return (
    <Box sx={styles.root()}>
      {Array.from({ length: count }).map((_, index) => (
        <IconButton
          key={index}
          onClick={() => goTo(index)}
          sx={(theme) => styles.dot(index === current)(theme)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </Box>
  );
}
