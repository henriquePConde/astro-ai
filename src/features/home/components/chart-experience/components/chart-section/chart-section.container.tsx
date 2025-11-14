'use client';

import { ChartSectionView } from './chart-section.view';
import type { ChartSectionContainerProps } from './chart-section.types';
import type { ChartData as WheelChartData } from '@/shared/components/astro-chart/types';
import type { ChartData as HomeChartData } from '@/features/home/types/chart.types';

export function ChartSectionContainer(props: ChartSectionContainerProps) {
  if (!props.chartData) return null;

  // Transform ChartData -> WheelData expected by AstroWheel
  const wheelData: WheelChartData = {
    planets: props.chartData.planets.map((p) => ({
      name: p.name,
      symbol: p.symbol,
      position: p.position,
      absolutePosition: p.absolutePosition,
      sign: p.sign,
    })),
    houses: props.chartData.houses,
    aspects: props.chartData.aspects,
  };

  return (
    <ChartSectionView
      wheelData={wheelData}
      isExpanded={props.isExpanded}
      isDragging={props.isDragging}
      splitPosition={props.splitPosition}
    />
  );
}
