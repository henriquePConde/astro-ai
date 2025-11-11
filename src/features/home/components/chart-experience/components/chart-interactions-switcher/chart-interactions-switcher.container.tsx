'use client';

import { ChartInteractionsSwitcherView } from './chart-interactions-switcher.view';
import { CHART_INTERACTIONS_SWITCHER_CONFIG } from './chart-interactions-switcher.config';
import { useOptionalChartInteractions } from '../../context/chart-interactions.context';

export function ChartInteractionsSwitcherContainer() {
  const ctx = useOptionalChartInteractions();

  // If not inside provider (wrong place in tree), fail silently instead of crashing.
  if (!ctx) {
    return null;
  }

  const { enabled, setEnabled } = ctx;

  return (
    <ChartInteractionsSwitcherView
      enabled={enabled}
      onToggle={setEnabled}
      config={CHART_INTERACTIONS_SWITCHER_CONFIG}
    />
  );
}
