'use client';

import { useCallback } from 'react';
import { BigThreeBadgeView } from './big-three-badge.view';
import { BIG_THREE_BADGE_CONFIG } from './big-three-badge.config';
import { useAIInput } from '../astro-interpreter/hooks/use-ai-input.state';
import { useDataSectionTabsContext } from '../data-section/context/data-section-tabs.context';
import { DATA_SECTION_TABS } from '../data-section/data-section.constants';
import type { BigThreeBadgeContainerProps } from './big-three-badge.types';

const SIGNS = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
] as const;

export function BigThreeBadgeContainer({ chartData }: BigThreeBadgeContainerProps) {
  const { setAIInput } = useAIInput();
  const tabsContext = useDataSectionTabsContext();

  const handleAskAI = useCallback(() => {
    // Switch to AI Interpreter tab
    if (tabsContext) {
      tabsContext.setActiveTab(DATA_SECTION_TABS.AI);
    }
    // Set the input message
    setAIInput('How does my sun, moon and ascendant playout together in my birth chart');
  }, [setAIInput, tabsContext]);

  if (!chartData) return null;

  // Extract Sun sign
  const sunPlanet = chartData.planets.find((p) => p.name.toLowerCase() === 'sun');
  const sunSign = sunPlanet ? SIGNS[sunPlanet.sign] : null;

  // Extract Moon sign
  const moonPlanet = chartData.planets.find((p) => p.name.toLowerCase() === 'moon');
  const moonSign = moonPlanet ? SIGNS[moonPlanet.sign] : null;

  // Extract Ascendant sign from first house
  const ascendantLongitude = chartData.houses.firstHouse;
  const ascendantSignIndex = Math.floor(ascendantLongitude / 30) % 12;
  const ascendantSign = SIGNS[ascendantSignIndex];

  return (
    <BigThreeBadgeView
      sunSign={sunSign}
      moonSign={moonSign}
      ascendantSign={ascendantSign}
      onAskAI={handleAskAI}
      config={BIG_THREE_BADGE_CONFIG}
    />
  );
}
