'use client';

import { useEffect } from 'react';
import { MobileChartExpandView } from './mobile-chart-expand.view';
import { MOBILE_CHART_EXPAND_CONFIG } from './mobile-chart-expand.config';
import type { MobileChartExpandViewProps } from './mobile-chart-expand.types';
import { useOptionalChartInteractions } from '../../../../context/chart-interactions.context';

export function MobileChartExpandContainer({
  isExpanded,
  onClose,
  chartData,
  birthData,
}: Omit<MobileChartExpandViewProps, 'config'>) {
  const interactions = useOptionalChartInteractions();

  useEffect(() => {
    if (isExpanded && interactions) {
      // Enable chart interactions when expanded
      interactions.setEnabled(true);
    }

    return () => {
      if (interactions) {
        // Disable chart interactions when component unmounts or isExpanded becomes false
        interactions.setEnabled(false);
      }
    };
  }, [isExpanded, interactions]);

  return (
    <MobileChartExpandView
      isExpanded={isExpanded}
      onClose={onClose}
      chartData={chartData}
      birthData={birthData}
      config={MOBILE_CHART_EXPAND_CONFIG}
    />
  );
}
