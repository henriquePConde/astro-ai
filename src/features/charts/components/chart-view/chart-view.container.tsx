'use client';

import { useChart } from '@/features/charts/services/charts.queries';
import { ChartViewView } from './chart-view.view';

export interface ChartViewContainerProps {
  chartId: string;
}

export function ChartViewContainer({ chartId }: ChartViewContainerProps) {
  const { data: chart, isLoading, error } = useChart(chartId);

  return <ChartViewView chart={chart} isLoading={isLoading} error={error as Error | null} />;
}
