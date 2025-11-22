import type { ChartData } from '@/backend/features/calculate/domain/calculate.entities';
import { getPlanetColor } from '@/shared/config/planet-colors';

const SIGN_ELEMENTS: Record<number, string> = {
  0: 'fire', // Aries
  1: 'earth', // Taurus
  2: 'air', // Gemini
  3: 'water', // Cancer
  4: 'fire', // Leo
  5: 'earth', // Virgo
  6: 'air', // Libra
  7: 'water', // Scorpio
  8: 'fire', // Sagittarius
  9: 'earth', // Capricorn
  10: 'air', // Aquarius
  11: 'water', // Pisces
};

const SIGN_MODALITIES: Record<number, string> = {
  0: 'cardinal', // Aries
  1: 'fixed', // Taurus
  2: 'mutable', // Gemini
  3: 'cardinal', // Cancer
  4: 'fixed', // Leo
  5: 'mutable', // Virgo
  6: 'cardinal', // Libra
  7: 'fixed', // Scorpio
  8: 'mutable', // Sagittarius
  9: 'cardinal', // Capricorn
  10: 'fixed', // Aquarius
  11: 'mutable', // Pisces
};

function determineHouse(longitude: number, cusps: number[]): number {
  longitude = ((longitude % 360) + 360) % 360;
  for (let i = 0; i < 12; i++) {
    const nextHouse = (i + 1) % 12;
    if (
      (cusps[i] <= cusps[nextHouse] && longitude >= cusps[i] && longitude < cusps[nextHouse]) ||
      (cusps[i] > cusps[nextHouse] && (longitude >= cusps[i] || longitude < cusps[nextHouse]))
    ) {
      return i + 1;
    }
  }
  return 1;
}

function calculateElementalBalance(planets: any[]) {
  const counts = { fire: 0, earth: 0, air: 0, water: 0 };
  planets.forEach((planet) => {
    counts[planet.element as keyof typeof counts]++;
  });
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const percentages = Object.entries(counts).reduce(
    (acc, [element, count]) => {
      acc[element] = (count / total) * 100;
      return acc;
    },
    {} as Record<string, number>,
  );
  return {
    counts,
    percentages,
    dominant: Object.entries(counts).reduce((a, b) => (a[1] > b[1] ? a : b))[0],
  };
}

function calculateModalityBalance(planets: any[]) {
  const counts = { cardinal: 0, fixed: 0, mutable: 0 };
  planets.forEach((planet) => {
    counts[planet.modality as keyof typeof counts]++;
  });
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const percentages = Object.entries(counts).reduce(
    (acc, [modality, count]) => {
      acc[modality] = (count / total) * 100;
      return acc;
    },
    {} as Record<string, number>,
  );
  return {
    counts,
    percentages,
    dominant: Object.entries(counts).reduce((a, b) => (a[1] > b[1] ? a : b))[0],
  };
}

function determineAspectNature(aspectType: string): 'harmonious' | 'challenging' | 'neutral' {
  const harmonious = ['trine', 'sextile'];
  const challenging = ['square', 'opposition'];
  if (harmonious.includes(aspectType.toLowerCase())) return 'harmonious';
  if (challenging.includes(aspectType.toLowerCase())) return 'challenging';
  return 'neutral';
}

export function transformChartData(chartData: ChartData) {
  const { planets, houses, aspects } = chartData;

  const transformedPlanets = Object.entries(planets).map(([name, data]) => ({
    name,
    sign: Math.floor(data.longitude / 30),
    degree: data.longitude % 30,
    house: determineHouse(data.longitude, houses.cusps),
    isRetrograde: data.retrograde,
    element: SIGN_ELEMENTS[Math.floor(data.longitude / 30)],
    modality: SIGN_MODALITIES[Math.floor(data.longitude / 30)],
    position: {
      longitude: data.longitude,
      latitude: data.latitude,
      speed: data.longitudeSpeed,
    },
  }));

  const elementalBalance = calculateElementalBalance(transformedPlanets);
  const modalityBalance = calculateModalityBalance(transformedPlanets);

  const transformedAspects = aspects.map((aspect) => ({
    planet1: aspect.p1_name,
    planet2: aspect.p2_name,
    type: aspect.type,
    angle: aspect.actualAngle,
    orb: Math.abs(aspect.actualAngle - aspect.exactAngle),
    nature: determineAspectNature(aspect.type),
  }));

  return {
    planets: transformedPlanets,
    aspects: transformedAspects,
    elementalBalance,
    modalityBalance,
    houses: {
      ascendant: houses.ascendant,
      midheaven: houses.mc,
      cusps: houses.cusps,
    },
  };
}

const PLANET_SYMBOLS: Record<string, string> = {
  sun: '☉',
  moon: '☽',
  mercury: '☿',
  venus: '♀',
  mars: '♂',
  jupiter: '♃',
  saturn: '♄',
  uranus: '♅',
  neptune: '♆',
  pluto: '♇',
};

export function toSimpleChartData(rawData: ChartData) {
  const planets = Object.entries(rawData.planets)
    .filter(([name]) => name in PLANET_SYMBOLS)
    .map(([name, data]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      symbol: PLANET_SYMBOLS[name],
      degree: data.longitude,
      sign: Math.floor(data.longitude / 30),
      color: getPlanetColor(name),
    }));

  const houses = {
    firstHouse: rawData.houses.cusps[0],
    secondHouse: rawData.houses.cusps[1],
    thirdHouse: rawData.houses.cusps[2],
    fourthHouse: rawData.houses.cusps[3],
    fifthHouse: rawData.houses.cusps[4],
    sixthHouse: rawData.houses.cusps[5],
    seventhHouse: rawData.houses.cusps[6],
    eighthHouse: rawData.houses.cusps[7],
    ninthHouse: rawData.houses.cusps[8],
    tenthHouse: rawData.houses.cusps[9],
    eleventhHouse: rawData.houses.cusps[10],
    twelfthHouse: rawData.houses.cusps[11],
  };

  const aspectMap: Record<string, number> = {
    conjunction: 0,
    opposition: 180,
    trine: 120,
    square: 90,
    sextile: 60,
  };

  const aspects = rawData.aspects.map((asp) => ({
    p1_name: asp.p1_name,
    p1_abs_pos: asp.p1_abs_pos,
    p2_name: asp.p2_name,
    p2_abs_pos: asp.p2_abs_pos,
    type: asp.type,
    exactAngle: asp.exactAngle ?? aspectMap[asp.type] ?? 0,
    actualAngle: asp.actualAngle,
  }));

  return { planets, houses, aspects };
}
