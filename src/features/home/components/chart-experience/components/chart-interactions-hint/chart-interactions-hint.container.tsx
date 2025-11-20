'use client';

import { useOptionalChartInteractions } from '@/features/home/components/chart-experience/context/chart-interactions.context';
import { CHART_INTERACTIONS_HINT_CONFIG } from './chart-interactions-hint.config';
import { useChartInteractionsHintState } from './hooks/use-chart-interactions-hint.state';
import { ChartInteractionsHintView } from './chart-interactions-hint.view';
import type { ChartInteractionsHintContainerProps } from './chart-interactions-hint.types';

export function ChartInteractionsHintContainer(_props: ChartInteractionsHintContainerProps) {
  const interactions = useOptionalChartInteractions();
  const { isOpen, toggle } = useChartInteractionsHintState();

  const interactionsEnabled = interactions?.enabled ?? false;

  // If there is no interactions context at all, render nothing.
  if (!interactions) {
    return null;
  }

  return (
    <ChartInteractionsHintView
      isOpen={isOpen}
      interactionsEnabled={interactionsEnabled}
      onToggle={toggle}
      config={CHART_INTERACTIONS_HINT_CONFIG}
    />
  );
}
