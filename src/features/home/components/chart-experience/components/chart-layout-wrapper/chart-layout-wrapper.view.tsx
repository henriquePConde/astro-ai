'use client';

import { Box } from '@mui/material';
import { styles } from './chart-layout-wrapper.styles';
import type { ChartLayoutWrapperProps } from './chart-layout-wrapper.types';

export function ChartLayoutWrapperView({
  currentSection,
  introFinished,
  isDragging,
  chartData,
  children,
}: ChartLayoutWrapperProps) {
  const sectionVisible = currentSection === 2 && introFinished;

  // Debug logging
  console.log('[ChartLayoutWrapperView] Render:', {
    currentSection,
    introFinished,
    sectionVisible,
  });

  return (
    <Box component="section" sx={styles.wrapper(sectionVisible)}>
      <Box sx={styles.container(isDragging, !!chartData)}>{children}</Box>
    </Box>
  );
}
