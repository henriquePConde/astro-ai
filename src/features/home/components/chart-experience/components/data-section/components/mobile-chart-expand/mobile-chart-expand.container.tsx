'use client';

import { useCallback, useMemo } from 'react';
import { MobileChartExpandView } from './mobile-chart-expand.view';
import { MOBILE_CHART_EXPAND_CONFIG } from './mobile-chart-expand.config';
import { CHART_INTERACTIONS_HINT_CONFIG } from '../../../chart-interactions-hint/chart-interactions-hint.config';
import type { MobileChartExpandViewProps } from './mobile-chart-expand.types';
import { MobileChartInteractionsProvider } from '../../../../context/mobile-chart-interactions.context';
import { useAIInput } from '../../../astro-interpreter/hooks/use-ai-input.state';
import { useDataSectionTabsContext } from '../../context/data-section-tabs.context';
import { DATA_SECTION_TABS } from '../../data-section.constants';
import { useMobileChartExpandState } from './hooks/use-mobile-chart-expand.state';
import { getRandomPlanetColor } from '@/shared/config/planet-colors';

export function MobileChartExpandContainer({
  isExpanded,
  onClose,
  chartData,
  birthData,
}: Omit<
  MobileChartExpandViewProps,
  | 'config'
  | 'hintConfig'
  | 'interactionsOpen'
  | 'onToggleInteractions'
  | 'chartKey'
  | 'hintLineColors'
>) {
  const { setAIInput } = useAIInput();
  const tabsContext = useDataSectionTabsContext();
  const { interactionsOpen, setInteractionsOpen, chartKey } = useMobileChartExpandState(isExpanded);

  // Generate random planet colors for each hint line
  const hintLineColors = useMemo(
    () =>
      CHART_INTERACTIONS_HINT_CONFIG.copy.mobileDescriptionLines.map(() => getRandomPlanetColor()),
    [],
  );

  const handleNavigateToAI = useCallback(
    (message: string) => {
      onClose();

      if (tabsContext && tabsContext.activeTab !== DATA_SECTION_TABS.AI) {
        tabsContext.setActiveTab(DATA_SECTION_TABS.AI);
      }

      setAIInput(message, true);
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
        hintConfig={CHART_INTERACTIONS_HINT_CONFIG}
        interactionsOpen={interactionsOpen}
        onToggleInteractions={() => setInteractionsOpen(!interactionsOpen)}
        chartKey={chartKey}
        hintLineColors={hintLineColors}
      />
    </MobileChartInteractionsProvider>
  );
}
