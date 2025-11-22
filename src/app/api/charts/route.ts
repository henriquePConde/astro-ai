import { NextRequest, NextResponse } from 'next/server';
import { listCharts, listChartsQuery } from '@/backend/features/charts';
import { handleError } from '@/backend/core/errors/error-handler';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { unauthorized } from '@/backend/core/errors/http-errors';
import { getOrCreateCurrentUser } from '@/backend/features/users';

export async function GET(req: NextRequest) {
  try {
    const authUser = await getSessionUser();
    if (!authUser) {
      throw unauthorized();
    }

    const user = await getOrCreateCurrentUser();

    const url = new URL(req.url);
    const queryParams = Object.fromEntries(url.searchParams);
    const filters = listChartsQuery.parse(queryParams);

    const result = await listCharts(user.id, filters);
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}
