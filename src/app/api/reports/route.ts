import { NextRequest, NextResponse } from 'next/server';
import { generateReport, listReports, generateReportBody } from '@/backend/features/reports';
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
    const report = await generateReport(user.id, { ...birthData, name }, name);

    return NextResponse.json(report, { status: 201 });
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
