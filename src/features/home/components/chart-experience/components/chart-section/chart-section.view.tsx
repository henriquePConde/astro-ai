'use client';

import { Box } from '@mui/material';
import AstroWheel from '@/shared/components/astro-chart/AstroWheel';
import { styles } from './chart-section.styles';
import type { ChartSectionProps } from './chart-section.types';

export function ChartSectionView({
  chartData,
  isExpanded,
  isDragging,
  splitPosition,
}: ChartSectionProps) {
  // Transform our ChartData format to WheelChartData format expected by AstroWheel
  const wheelData = {
    planets: chartData.planets.map((p) => ({
      name: p.name,
      symbol: p.symbol,
      position: p.position,
      absolutePosition: p.absolutePosition,
      sign: p.sign,
    })),
    houses: chartData.houses,
    aspects: chartData.aspects,
  };

  return (
    <Box sx={styles.container(isExpanded, isDragging, splitPosition)}>
      <Box sx={styles.chartWrapper()}>
        <Box sx={styles.chartInner()}>
          <AstroWheel data={wheelData} width={800} height={1000} />
        </Box>
      </Box>
    </Box>
  );
}

