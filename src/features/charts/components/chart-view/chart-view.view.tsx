'use client';

import { ChartDetailPageContainer } from '../chart-detail-page/chart-detail-page.container';
import type { ChartDetailResponse } from '@/features/charts/services/charts.service';

export interface ChartViewViewProps {
  chart: ChartDetailResponse | undefined;
  isLoading: boolean;
  error: Error | null;
}

export function ChartViewView({ chart, isLoading, error }: ChartViewViewProps) {
  return <ChartDetailPageContainer chart={chart} isLoading={isLoading} error={error} />;
}
