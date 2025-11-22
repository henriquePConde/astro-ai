'use client';

import { useChartData } from './hooks/use-chart-data.state';
import { useLayoutControls } from './hooks/use-layout-controls.state';
import { useChartExperienceProps } from './hooks/use-chart-experience-props.state';
import { ChartExperienceView } from './chart-experience.view';

export interface ChartExperienceContainerProps {
  currentSection: number;
  introFinished: boolean;
  onNewChart?: () => void;
  initialChartData?: any;
  initialBirthData?: any;
  initialReport?: {
    id: string;
    content: Record<string, string>;
    createdAt: Date;
  };
  initialMessages?: Array<{ role: 'user' | 'assistant'; content: string }>;
  chartId?: string;
}

export function ChartExperienceContainer({
  currentSection,
  introFinished,
  onNewChart,
  initialChartData,
  initialBirthData,
  initialReport,
  initialMessages,
  chartId,
}: ChartExperienceContainerProps) {
  const chart = useChartData(initialChartData, initialBirthData);
  const layout = useLayoutControls();
  const { props } = useChartExperienceProps({
    chart,
    layout,
    currentSection,
    introFinished,
    onNewChart,
    initialReport,
    initialMessages,
    chartId,
  });

  return <ChartExperienceView {...props} />;
}
