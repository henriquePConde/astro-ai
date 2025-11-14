// astro-ai-fullstack/src/backend/features/calculate/infra/ephemeris.service.ts
// swisseph-v2 is CommonJS; require() is appropriate for Node runtime.
const swisseph = require('swisseph-v2');

const TROPICAL_FLAGS = swisseph.SEFLG_SPEED | swisseph.SEFLG_SWIEPH;

const PLANETS = {
  SUN: 0,
  MOON: 1,
  MERCURY: 2,
  VENUS: 3,
  MARS: 4,
  JUPITER: 5,
  SATURN: 6,
  URANUS: 7,
  NEPTUNE: 8,
  PLUTO: 9,
  MEAN_NODE: 10,
  TRUE_NODE: 11,
} as const;

function isFiniteNum(n: unknown): n is number {
  return typeof n === 'number' && Number.isFinite(n);
}

export function determineHouse(longitude: number, cusps: number[]): number {
  longitude = ((longitude % 360) + 360) % 360;

  for (let i = 0; i < 12; i++) {
    const currentCusp = cusps[i];
    const nextCusp = cusps[(i + 1) % 12];

    if (!isFiniteNum(currentCusp) || !isFiniteNum(nextCusp)) continue;

    if (currentCusp > nextCusp) {
      if (longitude >= currentCusp || longitude < nextCusp) {
        return i + 1;
      }
    } else {
      if (longitude >= currentCusp && longitude < nextCusp) {
        return i + 1;
      }
    }
  }

  return 1;
}

export function calculateHouses(
  julianDay: number,
  lat: number,
  lng: number,
): {
  house: number[];
  ascendant: number;
  mc: number;
} {
  const houses = swisseph.swe_houses(julianDay, lat, lng, 'P');

  if ('error' in houses) {
    throw new Error(`Error calculating houses: ${houses.error}`);
  }

  // Return houses directly without normalization (matching old backend behavior)
  // Normalization happens in route.ts transformChartData for safety
  const safeHouse = [...Array(12)].map((_, i) => {
    const v = houses.house?.[i];
    return isFiniteNum(v) ? v : 0;
  });

  const asc = isFiniteNum(houses.ascendant) ? houses.ascendant : 0;
  const mc = isFiniteNum(houses.mc) ? houses.mc : 0;

  return {
    house: safeHouse,
    ascendant: asc,
    mc,
  };
}

export function calculatePlanets(
  julianDay: number,
  houses: { house: number[] },
): Record<
  string,
  {
    longitude: number;
    latitude: number;
    distance: number;
    longitudeSpeed: number;
    sign: number;
    house: number;
    retrograde: boolean;
  }
> {
  const planets: Record<string, any> = {};

  for (const [name, planetId] of Object.entries(PLANETS)) {
    const result = swisseph.swe_calc_ut(julianDay, planetId, TROPICAL_FLAGS);

    if ('error' in result) {
      console.error(`Error calculating ${name}:`, result.error);
      continue;
    }

    if (
      isFiniteNum(result.longitude) &&
      isFiniteNum(result.latitude) &&
      isFiniteNum(result.distance) &&
      isFiniteNum(result.longitudeSpeed)
    ) {
      // Use longitude directly without normalization (matching old backend behavior)
      // Normalization happens in determineHouse and route.ts transformChartData
      const longitude = result.longitude;
      planets[name.toLowerCase()] = {
        longitude,
        latitude: result.latitude,
        distance: result.distance,
        longitudeSpeed: result.longitudeSpeed,
        sign: Math.floor(longitude / 30),
        house: determineHouse(longitude, houses.house || []),
        retrograde: result.longitudeSpeed < 0,
      };
    } else {
      console.warn(`Dropping planet ${name} due to non-finite ephemeris values`);
    }
  }

  return planets;
}

export function julianDay(year: number, month: number, day: number, decimalHours: number): number {
  return swisseph.swe_julday(year, month, day, decimalHours, swisseph.SE_GREG_CAL);
}

export function calculateSunPosition(julianDay: number): { longitude: number } {
  const result = swisseph.swe_calc_ut(julianDay, PLANETS.SUN, TROPICAL_FLAGS);
  if ('error' in result) throw new Error(`Error calculating Sun: ${result.error}`);
  if (!isFiniteNum(result.longitude)) throw new Error('Invalid Sun calculation result');
  // Return longitude directly without normalization (matching old backend behavior)
  return { longitude: result.longitude };
}
