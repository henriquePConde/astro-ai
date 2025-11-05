import type { ChartData as ApiChartData } from '@/features/chart/services/chart.service';
import type { ChartData, Planet, Houses } from '../types/chart.types';


/**
 * Transforms API chart data format to ChartData format expected by ChartApplication
 */
export function transformApiChartDataToChartData(apiData: ApiChartData): ChartData {
  if (!apiData?.planets) {
    console.error('Invalid API data:', apiData);
    return {
      planets: [],
      houses: {
        firstHouse: 0,
        secondHouse: 30,
        thirdHouse: 60,
        fourthHouse: 90,
        fifthHouse: 120,
        sixthHouse: 150,
        seventhHouse: 180,
        eighthHouse: 210,
        ninthHouse: 240,
        tenthHouse: 270,
        eleventhHouse: 300,
        twelfthHouse: 330,
      },
      aspects: [],
    };
  }

  // Transform planets
  // API now returns: { name, symbol, degree, sign (number 0-11), color }
  const planets: Planet[] = apiData.planets.map((planet) => {
    return {
      name: planet.name,
      symbol: planet.symbol, // Backend provides symbol
      position: planet.degree, // Backend uses 'degree' instead of 'position'
      absolutePosition: planet.degree,
      sign: planet.sign, // Backend returns number (0-11) directly
      color: planet.color, // Backend provides color
    };
  });

  // Transform houses
  const housesData = apiData.houses as Record<string, number>;
  const houses: Houses = {
    firstHouse: housesData.firstHouse ?? housesData['firstHouse'] ?? 0,
    secondHouse: housesData.secondHouse ?? housesData['secondHouse'] ?? 30,
    thirdHouse: housesData.thirdHouse ?? housesData['thirdHouse'] ?? 60,
    fourthHouse: housesData.fourthHouse ?? housesData['fourthHouse'] ?? 90,
    fifthHouse: housesData.fifthHouse ?? housesData['fifthHouse'] ?? 120,
    sixthHouse: housesData.sixthHouse ?? housesData['sixthHouse'] ?? 150,
    seventhHouse: housesData.seventhHouse ?? housesData['seventhHouse'] ?? 180,
    eighthHouse: housesData.eighthHouse ?? housesData['eighthHouse'] ?? 210,
    ninthHouse: housesData.ninthHouse ?? housesData['ninthHouse'] ?? 240,
    tenthHouse: housesData.tenthHouse ?? housesData['tenthHouse'] ?? 270,
    eleventhHouse: housesData.eleventhHouse ?? housesData['eleventhHouse'] ?? 300,
    twelfthHouse: housesData.twelfthHouse ?? housesData['twelfthHouse'] ?? 330,
  };

  // Transform aspects
  // API returns: { p1_name, p1_abs_pos, p2_name, p2_abs_pos, type, exactAngle, actualAngle }
  // Transform to: { planet1, planet2, type, angle, exactAngle, actualAngle }
  const aspects = apiData.aspects.map((aspect) => ({
    planet1: aspect.p1_name,
    planet2: aspect.p2_name,
    type: aspect.type,
    angle: aspect.exactAngle,
    exactAngle: aspect.exactAngle,
    actualAngle: aspect.actualAngle,
  }));

  return {
    planets,
    houses,
    aspects,
  };
}

