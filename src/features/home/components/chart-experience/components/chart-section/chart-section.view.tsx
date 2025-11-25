'use client';

import { Box, useMediaQuery, useTheme } from '@mui/material';
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
  enableMobileInteractions = false,
}: ChartSectionViewProps) {
  const theme = useTheme();
  const isDesktopLayout = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Box sx={styles.container(isExpanded, isDragging, splitPosition)(theme)}>
      <Box sx={styles.chartWrapper()(theme)}>
        {/* On desktop layout, render overlay badges on top of the chart.
            On tablet/mobile (< 1200px), these are hidden here (they will
            be surfaced in a different layout). */}
        {isDesktopLayout && (
          <>
            <BirthInfoBadgeContainer birthData={birthData} />
            <BigThreeBadgeContainer chartData={chartData} />
            <ChartInteractionsHintContainer />
          </>
        )}
        <Box sx={styles.chartInner()(theme)}>
          <AstroWheel
            data={wheelData}
            width={800}
            height={1000}
            enableMobileInteractions={enableMobileInteractions}
          />
        </Box>
      </Box>
    </Box>
  );
}
