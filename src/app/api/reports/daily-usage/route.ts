import { NextRequest, NextResponse } from 'next/server';
import { getDailyUsage } from '@/backend/features/limits';
import { dailyUsageDto } from '@/backend/features/limits/http/limits.schemas';
import { handleError } from '@/backend/core/errors/error-handler';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { unauthorized } from '@/backend/core/errors/http-errors';

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw unauthorized();
    }

    const usage = await getDailyUsage(user.id);
    const validated = dailyUsageDto.parse(usage);
    return NextResponse.json(validated);
  } catch (error) {
    return handleError(error);
  }
}
