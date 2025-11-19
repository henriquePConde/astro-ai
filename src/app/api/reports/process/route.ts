import { NextRequest, NextResponse } from 'next/server';
import { continueReportJob, getReportJob } from '@/backend/features/reports';
import { handleError } from '@/backend/core/errors/error-handler';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { unauthorized, forbidden } from '@/backend/core/errors/http-errors';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw unauthorized();
    }

    const body = await req.json();
    const jobId = typeof body?.jobId === 'string' ? body.jobId : null;

    if (!jobId) {
      throw forbidden('jobId is required');
    }

    const job = await getReportJob(jobId);
    if (job.userId !== user.id) {
      throw forbidden('You do not have access to this job');
    }

    const updated = await continueReportJob(job);

    return NextResponse.json({
      id: updated.id,
      status: updated.status,
      progress: updated.progress,
      reportId: updated.reportId ?? null,
      errorMessage: updated.errorMessage ?? null,
    });
  } catch (error) {
    return handleError(error);
  }
}
