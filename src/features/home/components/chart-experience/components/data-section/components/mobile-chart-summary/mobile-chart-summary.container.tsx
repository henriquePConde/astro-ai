'use client';

import { useCallback } from 'react';
import { MobileChartSummaryView } from './mobile-chart-summary.view';
import { MOBILE_CHART_SUMMARY_CONFIG } from './mobile-chart-summary.config';
import { BIRTH_INFO_BADGE_CONFIG } from '../../../birth-info-badge/birth-info-badge.config';
import { BIG_THREE_BADGE_CONFIG } from '../../../big-three-badge/big-three-badge.config';
import type { MobileChartSummaryContainerProps } from './mobile-chart-summary.types';
import { useAIInput } from '../../../astro-interpreter/hooks/use-ai-input.state';
import { useDataSectionTabsContext } from '../../context/data-section-tabs.context';
import { DATA_SECTION_TABS } from '../../data-section.constants';
import { useMobileChartSummaryState } from './hooks/use-mobile-chart-summary.state';
import { ZODIAC_SIGNS } from '@/shared/components/astro-chart/utils/constants';

export function MobileChartSummaryContainer({
  chartData,
  birthData,
  onExpandChart,
}: MobileChartSummaryContainerProps) {
  const { setAIInput } = useAIInput();
  const tabsContext = useDataSectionTabsContext();
  const { openSections, toggleSection, birthMetaColors, bigThreeColors, hintLineColor } =
    useMobileChartSummaryState();

  const handleAskAI = useCallback(() => {
    if (tabsContext) {
      tabsContext.setActiveTab(DATA_SECTION_TABS.AI);
    }
    setAIInput('How does my sun, moon and ascendant playout together in my birth chart', true);
  }, [tabsContext, setAIInput]);

  if (!chartData || !birthData) return null;

  const { name, city, nation, year, month, day, hour, minute } = birthData;

  const displayName = name?.trim() || BIRTH_INFO_BADGE_CONFIG.copy.nameFallback;
  const location = [city, nation].filter(Boolean).join(', ') || null;

  const date = new Date(year, month - 1, day, hour, minute);
  const dateStr = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
  const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

  // Big three computation
  const sunPlanet = chartData.planets.find((p) => p.name.toLowerCase() === 'sun');
  const sunSign = sunPlanet ? ZODIAC_SIGNS[sunPlanet.sign] : null;

  const moonPlanet = chartData.planets.find((p) => p.name.toLowerCase() === 'moon');
  const moonSign = moonPlanet ? ZODIAC_SIGNS[moonPlanet.sign] : null;

  const ascendantLongitude = chartData.houses.firstHouse;
  const ascendantSignIndex = Math.floor(ascendantLongitude / 30) % 12;
  const ascendantSign = ZODIAC_SIGNS[ascendantSignIndex];

  return (
    <MobileChartSummaryView
      displayName={displayName}
      location={location}
      dateStr={dateStr}
      timeStr={timeStr}
      sunSign={sunSign}
      moonSign={moonSign}
      ascendantSign={ascendantSign}
      onExpandChart={onExpandChart}
      onAskAI={handleAskAI}
      config={MOBILE_CHART_SUMMARY_CONFIG}
      birthInfoConfig={BIRTH_INFO_BADGE_CONFIG}
      bigThreeConfig={BIG_THREE_BADGE_CONFIG}
      openSections={openSections}
      onToggleSection={toggleSection}
      birthMetaColors={birthMetaColors}
      bigThreeColors={bigThreeColors}
      hintLineColor={hintLineColor}
    />
  );
}
