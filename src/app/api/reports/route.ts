export const maxDuration = 60;

import { NextRequest, NextResponse } from 'next/server';
import {
  createReportJob,
  listReports,
  generateReportBody,
  getReportJob,
  continueReportJob,
} from '@/backend/features/reports';
import { handleError } from '@/backend/core/errors/error-handler';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { unauthorized } from '@/backend/core/errors/http-errors';

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw unauthorized();
    }

    const body = await req.json();
    const input = generateReportBody.parse(body);

    const { name, ...birthData } = input;
    // BirthData type requires name, so we include it
    const job = await createReportJob(user.id, { ...birthData, name }, name);

    // Best-effort: kick off the first step, but don't rely on it to finish
    let updatedJob = job;
    try {
      updatedJob = await continueReportJob(job);
    } catch {
      // If the first step fails here, the client can still drive the job via /process
    }

    return NextResponse.json(
      {
        id: updatedJob.id,
        status: updatedJob.status,
        progress: updatedJob.progress,
        reportId: updatedJob.reportId ?? null,
        errorMessage: updatedJob.errorMessage ?? null,
      },
      { status: 202 },
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw unauthorized();
    }

    const reports = await listReports(user.id);
    return NextResponse.json(reports);
  } catch (error) {
    return handleError(error);
  }
}
