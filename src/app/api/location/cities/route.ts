export const maxDuration = 20;

import { NextRequest, NextResponse } from 'next/server';
import {
  searchCitiesQuery,
  locationSearchResultsDto,
} from '@/backend/features/location/http/location.schemas';
import { searchCities } from '@/backend/features/location';
import { handleError } from '@/backend/core/errors/error-handler';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams);
    const input = searchCitiesQuery.parse(query);

    const result = await searchCities(input.q, input.country, input.limit);
    const validated = locationSearchResultsDto.parse(result);
    return NextResponse.json({ success: true, data: validated });
  } catch (error) {
    return handleError(error);
  }
}
