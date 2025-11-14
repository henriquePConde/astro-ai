// astro-ai-fullstack/src/backend/features/calculate/application/calculate.use-cases.ts
import { normalizeTime } from '../infra/time.service';
import { calculateAspects } from '../infra/aspects.service';
import { calculateHouses, calculatePlanets, julianDay } from '../infra/ephemeris.service';
import { findSolarReturnMoment } from '../infra/solar-return.service';
import type { BirthData, ChartData } from '../domain/calculate.entities';
import { isValidBirthData } from '../domain/calculate.entities';
import { badRequest } from '@/backend/core/errors/http-errors';

export async function calculateChart(birthData: BirthData): Promise<ChartData> {
  if (!isValidBirthData(birthData)) {
    throw badRequest('Invalid birth data');
  }

  const { utcDate, timezone, coordinates } = await normalizeTime(birthData);
  const date = new Date(utcDate);

  const decimalHours =
    date.getUTCHours() + date.getUTCMinutes() / 60.0 + date.getUTCSeconds() / 3600.0;

  const jd = julianDay(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
    decimalHours,
  );

  if (!Number.isFinite(jd)) {
    throw badRequest('Failed to compute Julian Day');
  }

  const houses = calculateHouses(jd, coordinates.lat, coordinates.lng);
  const planets = calculatePlanets(jd, houses);
  const aspects = calculateAspects(planets);

  return {
    datetime: {
      iso: date.toISOString(),
      timezone,
      julian: jd,
    },
    coordinates,
    houses: {
      cusps: houses.house,
      ascendant: houses.ascendant,
      mc: houses.mc,
    },
    planets,
    aspects,
  };
}

export async function calculateSolarReturn(
  birthData: BirthData,
  targetYear: number,
  locationCity?: string,
  locationNation?: string,
): Promise<ChartData> {
  const natalChart = await calculateChart(birthData);
  const sunPlanet = natalChart.planets.sun;
  if (!sunPlanet) {
    throw badRequest('Could not calculate natal Sun position');
  }

  const solarReturnDate = findSolarReturnMoment(
    sunPlanet.longitude,
    targetYear,
    birthData.month,
    birthData.day,
  );

  const solarReturnBirthData: BirthData = {
    ...birthData,
    year: solarReturnDate.getUTCFullYear(),
    month: solarReturnDate.getUTCMonth() + 1,
    day: solarReturnDate.getUTCDate(),
    hour: solarReturnDate.getUTCHours(),
    minute: solarReturnDate.getUTCMinutes(),
    city: locationCity || birthData.city,
    nation: locationNation || birthData.nation,
  };

  return calculateChart(solarReturnBirthData);
}
