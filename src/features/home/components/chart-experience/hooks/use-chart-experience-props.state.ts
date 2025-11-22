'use client';

import { useCallback, useMemo } from 'react';
import type { ChartExperienceProps } from '../chart-experience.types';
import type { UseChartDataReturn } from './use-chart-data.state';
import type { UseLayoutControlsReturn } from './use-layout-controls.state';

export interface UseChartExperiencePropsParams {
  chart: UseChartDataReturn;
  layout: UseLayoutControlsReturn;
  currentSection: number;
  introFinished: boolean;
  onNewChart?: () => void;
  initialReport?: {
    id: string;
    content: Record<string, string>;
    createdAt: Date;
  };
  initialMessages?: Array<{ role: 'user' | 'assistant'; content: string }>;
  chartId?: string;
}

export interface UseChartExperiencePropsReturn {
  props: ChartExperienceProps;
}

/**
 * Hook that constructs ChartExperienceProps from chart data, layout controls, and section state.
 * Single responsibility: transform hook returns and container props into view props.
 */
export function useChartExperienceProps({
  chart,
  layout,
  currentSection,
  introFinished,
  onNewChart,
  initialReport,
  initialMessages,
  chartId,
}: UseChartExperiencePropsParams): UseChartExperiencePropsReturn {
  const handleNewChart = useCallback(() => {
    chart.handleNewChart();
    if (onNewChart) {
      onNewChart();
    }
  }, [chart, onNewChart]);

  const props: ChartExperienceProps = useMemo(
    () => ({
      chart: {
        chartData: chart.chartData,
        transformedChartData: chart.transformedChartData,
        birthData: chart.birthData,
        error: chart.error,
        loading: chart.loading,
        handleFormSubmit: chart.handleFormSubmit,
        handleNewChart: handleNewChart,
      },
      layout: {
        isDragging: layout.isDragging,
        splitPosition: layout.splitPosition,
        handleDragStart: layout.handleDragStart,
        handleDrag: layout.handleDrag,
        handleDragEnd: layout.handleDragEnd,
      },
      section: {
        currentSection,
        introFinished,
      },
      onNewChart: handleNewChart,
      initialReport,
      initialMessages,
      chartId,
    }),
    [
      chart,
      layout,
      currentSection,
      introFinished,
      handleNewChart,
      initialReport,
      initialMessages,
      chartId,
    ],
  );

  return { props };
}
