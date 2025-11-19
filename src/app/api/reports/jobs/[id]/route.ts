import { NextRequest, NextResponse } from 'next/server';
import { getReportJob } from '@/backend/features/reports';
import { handleError } from '@/backend/core/errors/error-handler';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { unauthorized, forbidden } from '@/backend/core/errors/http-errors';

export const maxDuration = 10;

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw unauthorized();
    }

    const url = new URL(req.url);
    const segments = url.pathname.split('/');
    const jobId = segments[segments.length - 1];

    const job = await getReportJob(jobId);
    if (job.userId !== user.id) {
      throw forbidden('You do not have access to this job');
    }

    return NextResponse.json({
      id: job.id,
      status: job.status,
      progress: job.progress,
      reportId: job.reportId ?? null,
      errorMessage: job.errorMessage ?? null,
    });
  } catch (error) {
    return handleError(error);
  }
}
