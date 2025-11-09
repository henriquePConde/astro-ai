// src/features/home/components/chart-experience/components/astro-interpreter/utils/context-builder.ts

import type {
  ChartData as WheelChartData,
  PlanetInfo,
} from '@/shared/components/astro-chart/types';

export const buildInterpretationContext = (
  chartData: WheelChartData,
  planetPositions: PlanetInfo[],
  aspects: {
    planet1: string;
    planet2: string;
    type: string;
    angle: number;
  }[],
) => {
  return {
    planets: planetPositions.map((planet) => ({
      name: planet.name,
      sign: planet.sign,
      house: planet.house,
      position: planet.position,
      signDegree: planet.signDegree,
      isRetrograde: false,
    })),
    aspects,
    houses: {
      ascendant: chartData.houses.firstHouse,
      midheaven: chartData.houses.tenthHouse,
      cusps: chartData.houses,
    },
  };
};
