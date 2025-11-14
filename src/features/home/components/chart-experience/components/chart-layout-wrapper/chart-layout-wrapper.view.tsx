'use client';

import { Box, useTheme } from '@mui/material';
import { styles } from './chart-layout-wrapper.styles';
import type { ChartLayoutWrapperProps } from './chart-layout-wrapper.types';

export function ChartLayoutWrapperView({
  currentSection,
  introFinished,
  isDragging,
  chartData,
  children,
}: ChartLayoutWrapperProps) {
  const theme = useTheme();
  const sectionVisible = currentSection === 2 && introFinished;

  return (
    <Box component="section" sx={styles.wrapper(sectionVisible)(theme)}>
      <Box sx={styles.container(isDragging, !!chartData)(theme)}>{children}</Box>
    </Box>
  );
}
