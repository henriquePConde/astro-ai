'use client';

import { Box, useTheme } from '@mui/material';
import AstroWheel from '@/shared/components/astro-chart/AstroWheel';
import { styles } from './chart-section.styles';
import type { ChartSectionViewProps } from './chart-section.types';

export function ChartSectionView({
  wheelData,
  isExpanded,
  isDragging,
  splitPosition,
}: ChartSectionViewProps) {
  const theme = useTheme();

  return (
    <Box sx={styles.container(isExpanded, isDragging, splitPosition)(theme)}>
      <Box sx={styles.chartWrapper()(theme)}>
        <Box sx={styles.chartInner()(theme)}>
          <AstroWheel data={wheelData} width={800} height={1000} />
        </Box>
      </Box>
    </Box>
  );
}
