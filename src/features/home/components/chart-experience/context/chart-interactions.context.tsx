'use client';

import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { TooltipProvider, useTooltip } from './tooltip.context';
import type { TooltipState } from './tooltip.types';
import type { ChartInteractionsContextType } from './chart-interactions.types';
import { useAIInput } from '../components/astro-interpreter/hooks/use-ai-input.state';
import { ZODIAC_SIGNS } from '@/shared/components/astro-chart/utils/constants';
import { useDataSectionTabsContext } from '../components/data-section/context/data-section-tabs.context';
import { DATA_SECTION_TABS } from '../components/data-section/data-section.constants';
import type { ChartData as WheelChartData } from '@/shared/components/astro-chart/types';
import type { ChartData as HomeChartData } from '@/features/home/types/chart.types';
import { getSignInfo } from '@/shared/components/astro-chart/utils/signUtils';
import { calculatePlanetPositions } from '@/shared/components/astro-chart/utils/planetUtils';
import { calculateChartAspects } from '../components/astro-interpreter/utils/aspectUtils';
import { getRulerPlanetName } from '@/shared/components/astro-chart/utils/rulership';

const ChartInteractionsContext = createContext<ChartInteractionsContextType | undefined>(undefined);

type ChartInteractionsProviderProps = {
  children: React.ReactNode;
  chartData: HomeChartData | null;
};

const InnerInteractionsProvider: React.FC<ChartInteractionsProviderProps> = ({
  children,
  chartData,
}) => {
  const { showTooltip, hideTooltip } = useTooltip();
  const { setAIInput } = useAIInput();
  const tabsContext = useDataSectionTabsContext();
  const [enabled, setEnabled] = useState(true);

  const wheelData: WheelChartData | null = useMemo(() => {
    if (!chartData) return null;

    return {
      planets: chartData.planets.map((p) => ({
        name: p.name,
        symbol: p.symbol,
        position: p.position,
        absolutePosition: p.absolutePosition,
        sign: p.sign,
      })),
      houses: chartData.houses,
      aspects: chartData.aspects ?? [],
    };
  }, [chartData]);

  const signContext = useMemo(() => {
    if (!wheelData) {
      return null;
    }

    const signInfo = getSignInfo(wheelData);
    const planetPositions = calculatePlanetPositions(wheelData);
    const aspects = calculateChartAspects(planetPositions);

    return {
      signInfo,
      planetPositions,
      aspects,
    };
  }, [wheelData]);

  const buildSignContextSummary = useCallback(
    (index: number) => {
      const signName = ZODIAC_SIGNS[index] || 'unknown sign';

      if (!signContext) {
        return {
          signName,
          houseSentence: '',
          rulerSentence: '',
          aspectsSentence: '',
          contextSentence: '',
        };
      }

      const info = signContext.signInfo[index];
      let houseSentence = '';

      if (info) {
        if (info.rulingHouses.length > 0) {
          const houses = info.rulingHouses;
          const houseList =
            houses.length === 1
              ? `${houses[0]}`
              : houses.length === 2
                ? `${houses[0]} and ${houses[1]}`
                : `${houses.slice(0, -1).join(', ')}, and ${houses[houses.length - 1]}`;

          houseSentence = `${signName} rules house${houses.length > 1 ? 's' : ''} ${houseList}.`;
        } else {
          houseSentence = `${signName} does not rule any house cusp in this chart (it may be intercepted).`;
        }
      }

      const rulerName = getRulerPlanetName(index);
      let rulerSentence = '';
      let aspectsSentence = '';

      if (rulerName && signContext.planetPositions.length > 0) {
        const rulerPlanet = signContext.planetPositions.find((p) => p.name === rulerName);

        if (rulerPlanet) {
          const { sign, signDegree, house } = rulerPlanet;
          rulerSentence = `Its ruler ${rulerName} is in ${sign} at ${signDegree} in house ${house}.`;
        }

        if (signContext.aspects.length > 0) {
          const relevantAspects = signContext.aspects.filter(
            (a) => a.planet1 === rulerName || a.planet2 === rulerName,
          );

          if (relevantAspects.length > 0) {
            const formatted = relevantAspects.slice(0, 3).map((a) => {
              const other = a.planet1 === rulerName ? a.planet2 : a.planet1;
              return `${rulerName} ${a.type.toLowerCase()} ${other} (${a.angle.toFixed(0)}°)`;
            });

            aspectsSentence = `Key aspects involving its ruler include ${formatted.join('; ')}.`;
          }
        }
      }

      const pieces = [houseSentence, rulerSentence, aspectsSentence].filter(Boolean);
      const contextSentence = pieces.join(' ');

      return {
        signName,
        houseSentence,
        rulerSentence,
        aspectsSentence,
        contextSentence,
      };
    },
    [signContext],
  );

  // Helper function to switch to AI tab if needed
  const switchToAITabIfNeeded = useCallback(() => {
    if (tabsContext && tabsContext.activeTab !== DATA_SECTION_TABS.AI) {
      tabsContext.setActiveTab(DATA_SECTION_TABS.AI);
    }
  }, [tabsContext]);

  const value = useMemo<ChartInteractionsContextType>(
    () => ({
      enabled,
      toggleEnabled: () => setEnabled((v) => !v),
      setEnabled,

      onPlanetHover: (planet, evt) => {
        if (!enabled) return;
        const e = evt as MouseEvent;
        // Validate that we have valid coordinates
        if (
          typeof e.clientX !== 'number' ||
          typeof e.clientY !== 'number' ||
          isNaN(e.clientX) ||
          isNaN(e.clientY)
        ) {
          console.warn('Invalid mouse coordinates for planet hover:', e);
          return;
        }
        const state: TooltipState = {
          kind: 'planet',
          x: e.clientX,
          y: e.clientY,
          name: planet.name,
          symbol: planet.symbol,
          degree: planet.degree,
          signLabel: planet.signLabel,
          house: planet.house,
          color: planet.color,
        };
        showTooltip(state);
      },
      onPlanetLeave: () => {
        hideTooltip();
      },

      onHouseHover: (house, evt) => {
        if (!enabled) return;
        const e = evt as MouseEvent;
        // Validate that we have valid coordinates
        if (
          typeof e.clientX !== 'number' ||
          typeof e.clientY !== 'number' ||
          isNaN(e.clientX) ||
          isNaN(e.clientY)
        ) {
          console.warn('Invalid mouse coordinates for house hover:', e);
          return;
        }
        showTooltip({
          kind: 'house',
          x: e.clientX,
          y: e.clientY,
          number: house.number,
          degree: house.degree,
        });
      },
      onHouseLeave: () => {
        hideTooltip();
      },

      onSignHover: (index, evt) => {
        if (!enabled) return;
        const e = evt as MouseEvent;
        // Validate that we have valid coordinates
        if (
          typeof e.clientX !== 'number' ||
          typeof e.clientY !== 'number' ||
          isNaN(e.clientX) ||
          isNaN(e.clientY)
        ) {
          console.warn('Invalid mouse coordinates for sign hover:', e);
          return;
        }
        const { houseSentence, rulerSentence } = buildSignContextSummary(index);

        showTooltip({
          kind: 'sign',
          x: e.clientX,
          y: e.clientY,
          index,
          houseSummary: houseSentence || undefined,
          rulerSummary: rulerSentence || undefined,
        });
      },
      onSignLeave: () => {
        hideTooltip();
      },

      onAspectHover: (aspect, evt) => {
        if (!enabled) return;
        const e = evt as MouseEvent;
        // Validate that we have valid coordinates
        if (
          typeof e.clientX !== 'number' ||
          typeof e.clientY !== 'number' ||
          isNaN(e.clientX) ||
          isNaN(e.clientY)
        ) {
          console.warn('Invalid mouse coordinates for aspect hover:', e);
          return;
        }
        showTooltip({
          kind: 'aspect',
          x: e.clientX,
          y: e.clientY,
          type: aspect.type,
          p1: aspect.p1,
          p2: aspect.p2,
          angle: aspect.angle,
        });
      },
      onAspectLeave: () => {
        hideTooltip();
      },

      onPlanetClick: (planet, evt) => {
        if (!enabled) return;
        // Switch to AI Interpreter tab if not already on it
        switchToAITabIfNeeded();
        const signText = planet.signLabel || 'unknown sign';
        const houseText = planet.house ? ` in the ${planet.house} house` : '';
        const message = `Tell me about the meaning of ${planet.name} in ${signText}${houseText} in my chart`;
        setAIInput(message);
      },

      onHouseClick: (house, evt) => {
        if (!enabled) return;
        // Switch to AI Interpreter tab if not already on it
        switchToAITabIfNeeded();
        const message = `Tell me about the meaning of the ${house.number} house in my chart`;
        setAIInput(message);
      },

      onSignClick: (index, evt) => {
        if (!enabled) return;
        // Switch to AI Interpreter tab if not already on it
        switchToAITabIfNeeded();
        const { signName, houseSentence } = buildSignContextSummary(index);

        // Build prompt that specifically mentions only the house the sign rules (unless intercepted)
        let baseQuestion = `Tell me about the meaning of ${signName} in my chart`;

        if (signContext?.signInfo[index]) {
          const info = signContext.signInfo[index];
          if (info.isIntercepted) {
            // For intercepted signs, mention that it's intercepted
            baseQuestion = `Tell me about the meaning of ${signName} in my chart. Note that ${signName} is intercepted in this chart.`;
          } else if (info.rulingHouses.length > 0) {
            // For non-intercepted signs, specify to only mention the house(s) it rules
            const houseList =
              info.rulingHouses.length === 1
                ? `house ${info.rulingHouses[0]}`
                : `houses ${info.rulingHouses.join(' and ')}`;
            baseQuestion = `Tell me about the meaning of ${signName} in my chart. Please focus specifically on ${houseList} that ${signName} rules. Do not mention other houses even if parts of ${signName} may extend into them - only discuss the house(s) that ${signName} actually rules.`;
          }
        }

        setAIInput(baseQuestion);
      },

      onAspectClick: (aspect, evt) => {
        if (!enabled) return;
        // Switch to AI Interpreter tab if not already on it
        switchToAITabIfNeeded();
        const planet1 = aspect.p1 || 'planet 1';
        const planet2 = aspect.p2 || 'planet 2';
        const message = `Tell me about the meaning of the ${aspect.type} between ${planet1} and ${planet2} in my chart`;
        setAIInput(message);
      },
    }),
    [enabled, showTooltip, hideTooltip, setAIInput, switchToAITabIfNeeded, buildSignContextSummary],
  );

  return (
    <ChartInteractionsContext.Provider value={value}>{children}</ChartInteractionsContext.Provider>
  );
};

export const ChartInteractionsProvider: React.FC<ChartInteractionsProviderProps> = ({
  children,
  chartData,
}) => (
  <TooltipProvider>
    <InnerInteractionsProvider chartData={chartData}>{children}</InnerInteractionsProvider>
  </TooltipProvider>
);

export const useChartInteractions = () => {
  const ctx = useContext(ChartInteractionsContext);
  if (!ctx) {
    throw new Error('useChartInteractions must be used within ChartInteractionsProvider');
  }
  return ctx;
};

export const useOptionalChartInteractions = () => useContext(ChartInteractionsContext) ?? null;
