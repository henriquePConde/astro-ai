import { NextRequest, NextResponse } from 'next/server';
import {
  searchCountriesQuery,
  locationSearchResultsDto,
} from '@/backend/features/location/http/location.schemas';
import { searchCountries } from '@/backend/features/location';
import { handleError } from '@/backend/core/errors/error-handler';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams);
    const input = searchCountriesQuery.parse(query);

    const result = await searchCountries(input.q, input.limit);
    const validated = locationSearchResultsDto.parse(result);
    return NextResponse.json({ success: true, data: validated });
  } catch (error) {
    return handleError(error);
  }
}
