'use client';

import { Box, useTheme } from '@mui/material';
import AstroWheel from '@/shared/components/astro-chart/AstroWheel';
import { styles } from './chart-section.styles';
import type { ChartSectionViewProps } from './chart-section.types';
import { BirthInfoBadgeContainer } from '../birth-info-badge';
import { ChartInteractionsHintContainer } from '../chart-interactions-hint';
import { BigThreeBadgeContainer } from '../big-three-badge';

export function ChartSectionView({
  wheelData,
  chartData,
  birthData,
  isExpanded,
  isDragging,
  splitPosition,
}: ChartSectionViewProps) {
  const theme = useTheme();

  return (
    <Box sx={styles.container(isExpanded, isDragging, splitPosition)(theme)}>
      <Box sx={styles.chartWrapper()(theme)}>
        <BirthInfoBadgeContainer birthData={birthData} />
        <BigThreeBadgeContainer chartData={chartData} />
        <ChartInteractionsHintContainer />
        <Box sx={styles.chartInner()(theme)}>
          <AstroWheel data={wheelData} width={800} height={1000} />
        </Box>
      </Box>
    </Box>
  );
}
