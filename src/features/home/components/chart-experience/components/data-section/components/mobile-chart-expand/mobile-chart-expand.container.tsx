'use client';

import { useEffect, useCallback } from 'react';
import { MobileChartExpandView } from './mobile-chart-expand.view';
import { MOBILE_CHART_EXPAND_CONFIG } from './mobile-chart-expand.config';
import type { MobileChartExpandViewProps } from './mobile-chart-expand.types';
import { useOptionalChartInteractions } from '../../../../context/chart-interactions.context';
import { MobileChartInteractionsProvider } from '../../../../context/mobile-chart-interactions.context';
import { useAIInput } from '../../../astro-interpreter/hooks/use-ai-input.state';
import { useDataSectionTabsContext } from '../../context/data-section-tabs.context';
import { DATA_SECTION_TABS } from '../../data-section.constants';

export function MobileChartExpandContainer({
  isExpanded,
  onClose,
  chartData,
  birthData,
}: Omit<MobileChartExpandViewProps, 'config'>) {
  const interactions = useOptionalChartInteractions();
  const { setAIInput } = useAIInput();
  const tabsContext = useDataSectionTabsContext();

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

  const handleNavigateToAI = useCallback(
    (message: string) => {
      // Close the mobile expand view
      onClose();

      // Switch to AI Interpreter tab
      if (tabsContext && tabsContext.activeTab !== DATA_SECTION_TABS.AI) {
        tabsContext.setActiveTab(DATA_SECTION_TABS.AI);
      }

      // Set the AI input message
      setAIInput(message);
    },
    [onClose, tabsContext, setAIInput],
  );

  return (
    <MobileChartInteractionsProvider chartData={chartData} onNavigateToAI={handleNavigateToAI}>
      <MobileChartExpandView
        isExpanded={isExpanded}
        onClose={onClose}
        chartData={chartData}
        birthData={birthData}
        config={MOBILE_CHART_EXPAND_CONFIG}
      />
    </MobileChartInteractionsProvider>
  );
}
