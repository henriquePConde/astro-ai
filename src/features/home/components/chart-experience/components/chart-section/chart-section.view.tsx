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
  if (!chartData) return null;

  // ✅ Transform ChartData -> WheelData expected by AstroWheel (original shape)
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
          {/* ✅ Width/height as before */}
          <AstroWheel data={wheelData} width={800} height={1000} />
        </Box>
      </Box>
    </Box>
  );
}
