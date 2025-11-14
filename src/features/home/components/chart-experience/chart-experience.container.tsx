'use client';

import { useChartData } from './hooks/use-chart-data.state';
import { useLayoutControls } from './hooks/use-layout-controls.state';
import { useChartExperienceProps } from './hooks/use-chart-experience-props.state';
import { ChartExperienceView } from './chart-experience.view';

export interface ChartExperienceContainerProps {
  currentSection: number;
  introFinished: boolean;
  onNewChart?: () => void;
}

export function ChartExperienceContainer({
  currentSection,
  introFinished,
  onNewChart,
}: ChartExperienceContainerProps) {
  const chart = useChartData();
  const layout = useLayoutControls();
  const { props } = useChartExperienceProps({
    chart,
    layout,
    currentSection,
    introFinished,
    onNewChart,
  });

  return <ChartExperienceView {...props} />;
}
