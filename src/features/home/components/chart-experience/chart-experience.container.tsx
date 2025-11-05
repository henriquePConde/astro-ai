'use client';

import { useChartData } from '../../hooks/use-chart-data.state';
import { useLayoutControls } from '../../hooks/use-layout-controls.state';
import { ChartExperienceView } from './chart-experience.view';
import type { ChartExperienceProps } from './chart-experience.types';

export interface ChartExperienceContainerProps {
  currentSection: number;
  introFinished: boolean;
  hasSeenIntro: boolean;
  onNewChart?: () => void;
}

export function ChartExperienceContainer({
  currentSection,
  introFinished,
  hasSeenIntro,
  onNewChart,
}: ChartExperienceContainerProps) {
  const chart = useChartData();
  const layout = useLayoutControls();

  const handleNewChart = () => {
    chart.handleNewChart();
    onNewChart?.();
  };

  const props: ChartExperienceProps = {
    chart: {
      chartData: chart.chartData,
      transformedChartData: chart.transformedChartData,
      birthData: chart.birthData,
      error: chart.error,
      loading: chart.loading,
      handleFormSubmit: chart.handleFormSubmit,
      handleNewChart: chart.handleNewChart,
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
    hasSeenIntro,
    onNewChart: handleNewChart,
  };

  return <ChartExperienceView {...props} />;
}

