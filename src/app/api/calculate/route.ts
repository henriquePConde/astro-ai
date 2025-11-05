// astro-ai-fullstack/src/app/api/calculate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  birthDataSchema,
  calculateChartDto,
  aspectDto,
  planetDto,
  houseDto,
} from '@/backend/features/calculate/http/calculate.schemas';
import { calculateChart } from '@/backend/features/calculate';
import { handleError } from '@/backend/core/errors/error-handler';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { unauthorized } from '@/backend/core/errors/http-errors';

// Force Node.js runtime (swisseph requires Node)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isFiniteNumber(n: unknown): n is number {
  return typeof n === 'number' && Number.isFinite(n);
}
function normDeg(n: number) {
  const v = ((n % 360) + 360) % 360;
  return Number.isFinite(v) ? v : 0;
}

// Transform + sanitize helper for HTTP response
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
  const PLANET_COLORS: Record<string, string> = {
    sun: '#FFB266',
    moon: '#CCCCCC',
    mercury: '#A5A5A5',
    venus: '#90EE90',
    mars: '#FF4500',
    jupiter: '#DEB887',
    saturn: '#4682B4',
    uranus: '#40E0D0',
    neptune: '#9370DB',
    pluto: '#8B4513',
  };

  // planets: keep only known ones with finite longitude
  const planets = Object.entries(rawData.planets || {})
    .filter(([name, data]: [string, any]) => {
      return name in PLANET_SYMBOLS && data && isFiniteNumber(data.longitude);
    })
    .map(([name, data]: [string, any]) => {
      const deg = normDeg(data.longitude);
      return {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        symbol: PLANET_SYMBOLS[name],
        degree: deg,
        sign: Math.floor(deg / 30),
        color: PLANET_COLORS[name],
      };
    })
    // validate via Zod to ensure no NaNs/Infinities sneak through
    .filter((p) => {
      const res = planetDto.safeParse(p);
      if (!res.success) {
        console.warn('[transformChartData] Dropping planet due to validation:', res.error?.issues);
      }
      return res.success;
    });

  // houses: guard & normalize to 12 finite cusps
  const cusps: number[] = Array.isArray(rawData?.houses?.cusps)
    ? rawData.houses.cusps.slice(0, 12)
    : [];
  const safeCusps = [...Array(12)].map((_, i) => {
    const v = cusps[i];
    return isFiniteNumber(v) ? normDeg(v) : 0;
  });

  const houses = {
    firstHouse: safeCusps[0],
    secondHouse: safeCusps[1],
    thirdHouse: safeCusps[2],
    fourthHouse: safeCusps[3],
    fifthHouse: safeCusps[4],
    sixthHouse: safeCusps[5],
    seventhHouse: safeCusps[6],
    eighthHouse: safeCusps[7],
    ninthHouse: safeCusps[8],
    tenthHouse: safeCusps[9],
    eleventhHouse: safeCusps[10],
    twelfthHouse: safeCusps[11],
  };
  if (!houseDto.safeParse(houses).success) {
    console.warn('[transformChartData] House validation failed; zeroing to safe defaults.');
    // already safe defaults applied above
  }

  // aspects: drop any with non-finite numbers
  const aspects =
    (rawData.aspects || []).filter((a: any) => {
      return (
        typeof a?.p1_name === 'string' &&
        typeof a?.p2_name === 'string' &&
        isFiniteNumber(a?.p1_abs_pos) &&
        isFiniteNumber(a?.p2_abs_pos) &&
        isFiniteNumber(a?.exactAngle) &&
        isFiniteNumber(a?.actualAngle)
      );
    }) ?? [];

  const safeAspects = aspects.filter((a: any) => aspectDto.safeParse(a).success);

  return { planets, houses, aspects: safeAspects };
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw unauthorized();
    }

    const body = await req.json();
    const input = birthDataSchema.parse(body);

    const chartData = await calculateChart(input);
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
