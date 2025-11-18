// src/features/home/components/chart-experience/components/astro-interpreter/utils/context-builder.ts

import type {
  ChartData as WheelChartData,
  PlanetInfo,
} from '@/shared/components/astro-chart/types';
import { ZODIAC_SIGNS } from '@/shared/components/astro-chart/utils/constants';
import { getSignInfo } from '@/shared/components/astro-chart/utils/signUtils';

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
  const houses = chartData.houses;

  const houseCusps = [
    houses.firstHouse,
    houses.secondHouse,
    houses.thirdHouse,
    houses.fourthHouse,
    houses.fifthHouse,
    houses.sixthHouse,
    houses.seventhHouse,
    houses.eighthHouse,
    houses.ninthHouse,
    houses.tenthHouse,
    houses.eleventhHouse,
    houses.twelfthHouse,
  ];

  const details: Record<
    string,
    {
      cuspDegree: number;
      cuspSign: string;
      signsWithin: string[];
    }
  > = {};

  const signRanges = ZODIAC_SIGNS.map((name, idx) => ({
    name,
    start: idx * 30,
    end: idx * 30 + 30,
  }));

  for (let houseIndex = 0; houseIndex < 12; houseIndex++) {
    const houseNumber = houseIndex + 1;
    let start = houseCusps[houseIndex]!;
    let end = houseCusps[(houseIndex + 1) % 12]!;

    if (end <= start) {
      end += 360;
    }

    const cuspDegree = ((start % 360) + 360) % 360;
    const cuspSignIndex = Math.floor(cuspDegree / 30) % 12;
    const cuspSign = ZODIAC_SIGNS[cuspSignIndex] ?? 'Unknown';

    const signsWithin = new Set<string>();

    signRanges.forEach((sign) => {
      for (const offset of [0, 360]) {
        const sStart = sign.start + offset;
        const sEnd = sign.end + offset;
        if (sStart < end && sEnd > start) {
          signsWithin.add(sign.name);
          break;
        }
      }
    });

    details[String(houseNumber)] = {
      cuspDegree,
      cuspSign,
      signsWithin: Array.from(signsWithin),
    };
  }

  const signInfo = getSignInfo(chartData);
  const interceptedSigns = signInfo.filter((s) => s.isIntercepted).map((s) => s.name);

  const houseRulers: Record<string, string> = {};
  Object.entries(details).forEach(([houseNumber, d]) => {
    houseRulers[houseNumber] = d.cuspSign;
  });

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
      ascendant: houses.firstHouse,
      midheaven: houses.tenthHouse,
      cusps: houses,
      details,
      interceptedSigns,
      rulers: houseRulers,
    },
  };
};
