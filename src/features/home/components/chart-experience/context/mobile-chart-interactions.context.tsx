'use client';

import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import type {
  MobileChartInteractionsContextType,
  MobileChartInteractionsProviderProps,
} from './mobile-chart-interactions.types';
import type { ChartElementData } from '../components/chart-element-modal/chart-element-modal.types';
import { ChartElementModalContainer } from '../components/chart-element-modal/chart-element-modal.container';
import { ZODIAC_SIGNS } from '@/shared/components/astro-chart/utils/constants';
import { getSignInfo } from '@/shared/components/astro-chart/utils/signUtils';
import { calculatePlanetPositions } from '@/shared/components/astro-chart/utils/planetUtils';
import { calculateChartAspects } from '../components/astro-interpreter/utils/aspectUtils';
import { getRulerPlanetName } from '@/shared/components/astro-chart/utils/rulership';
import type { ChartData as WheelChartData } from '@/shared/components/astro-chart/types';
import type { ChartData as HomeChartData } from '@/features/home/types/chart.types';

const MobileChartInteractionsContext = createContext<
  MobileChartInteractionsContextType | undefined
>(undefined);

export const MobileChartInteractionsProvider: React.FC<MobileChartInteractionsProviderProps> = ({
  children,
  chartData,
  onNavigateToAI,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentElement, setCurrentElement] = useState<ChartElementData | null>(null);

  const wheelData: WheelChartData | null = useMemo(() => {
    if (!chartData) return null;

    return {
      planets: chartData.planets.map((p: any) => ({
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

      if (rulerName && signContext.planetPositions.length > 0) {
        const rulerPlanet = signContext.planetPositions.find((p) => p.name === rulerName);

        if (rulerPlanet) {
          const { sign, signDegree, house } = rulerPlanet;
          rulerSentence = `Its ruler ${rulerName} is in ${sign} at ${signDegree} in house ${house}.`;
        }
      }

      return {
        signName,
        houseSentence,
        rulerSentence,
      };
    },
    [signContext],
  );

  const showElementModal = useCallback((elementData: ChartElementData) => {
    setCurrentElement(elementData);
    setIsModalOpen(true);
  }, []);

  const hideElementModal = useCallback(() => {
    setIsModalOpen(false);
    setCurrentElement(null);
  }, []);

  const handleNavigateToAI = useCallback(
    (message: string) => {
      hideElementModal();
      onNavigateToAI(message);
    },
    [hideElementModal, onNavigateToAI],
  );

  const value = useMemo<MobileChartInteractionsContextType>(
    () => ({
      showElementModal,
      hideElementModal,
      isModalOpen,
      currentElement,

      // Hover handlers (no-ops for mobile)
      onPlanetHover: () => {},
      onPlanetLeave: () => {},
      onHouseHover: () => {},
      onHouseLeave: () => {},
      onSignHover: () => {},
      onSignLeave: () => {},
      onAspectHover: () => {},
      onAspectLeave: () => {},

      // Click handlers that show modal
      onPlanetClick: (planet, evt) => {
        const elementData: ChartElementData = {
          type: 'planet',
          planetName: planet.name,
          planetSymbol: planet.symbol,
          planetSign: planet.signLabel,
          planetHouse: planet.house,
          planetDegree: planet.degree,
          planetColor: planet.color,
        };
        showElementModal(elementData);
      },

      onHouseClick: (house, evt) => {
        const elementData: ChartElementData = {
          type: 'house',
          houseNumber: house.number,
          houseDegree: house.degree,
        };
        showElementModal(elementData);
      },

      onSignClick: (index, evt) => {
        const { signName, houseSentence, rulerSentence } = buildSignContextSummary(index);
        const elementData: ChartElementData = {
          type: 'sign',
          signIndex: index,
          signName,
          signHouseSummary: houseSentence || undefined,
          signRulerSummary: rulerSentence || undefined,
        };
        showElementModal(elementData);
      },

      onAspectClick: (aspect, evt) => {
        const elementData: ChartElementData = {
          type: 'aspect',
          aspectType: aspect.type,
          aspectPlanet1: aspect.p1,
          aspectPlanet2: aspect.p2,
          aspectAngle: aspect.angle,
        };
        showElementModal(elementData);
      },
    }),
    [showElementModal, hideElementModal, isModalOpen, currentElement, buildSignContextSummary],
  );

  return (
    <MobileChartInteractionsContext.Provider value={value}>
      {children}
      <ChartElementModalContainer
        isOpen={isModalOpen}
        elementData={currentElement}
        onClose={hideElementModal}
        onNavigateToAI={handleNavigateToAI}
      />
    </MobileChartInteractionsContext.Provider>
  );
};

export const useMobileChartInteractions = () => {
  const ctx = useContext(MobileChartInteractionsContext);
  if (!ctx) {
    throw new Error(
      'useMobileChartInteractions must be used within MobileChartInteractionsProvider',
    );
  }
  return ctx;
};

export const useOptionalMobileChartInteractions = () =>
  useContext(MobileChartInteractionsContext) ?? null;
