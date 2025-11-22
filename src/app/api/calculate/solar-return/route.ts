import { NextRequest, NextResponse } from 'next/server';
import {
  solarReturnBody,
  calculateChartDto,
} from '@/backend/features/calculate/http/calculate.schemas';
import { calculateSolarReturn } from '@/backend/features/calculate';
import { handleError } from '@/backend/core/errors/error-handler';
import { getPlanetColor } from '@/shared/config/planet-colors';

// Transform helper for HTTP response (HTTP boundary concern)
function transformChartData(rawData: any) {
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

  const planets = Object.entries(rawData.planets)
    .filter(([name]) => name in PLANET_SYMBOLS)
    .map(([name, data]: [string, any]) => ({
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

  return { planets, houses, aspects: rawData.aspects };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = solarReturnBody.parse(body);

    const chartData = await calculateSolarReturn(
      input.birthData,
      input.targetYear,
      input.locationCity,
      input.locationNation,
    );
    const transformed = transformChartData(chartData);

    const response = calculateChartDto.parse({
      success: true as const,
      data: transformed,
    });

    return NextResponse.json(response);
  } catch (error) {
    return handleError(error);
  }
}
