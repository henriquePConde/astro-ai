import { NextRequest, NextResponse } from 'next/server';
import { getReportWithChart } from '@/backend/features/reports';
import { handleError } from '@/backend/core/errors/error-handler';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const segments = url.pathname.split('/');
    const id = segments[segments.length - 1];
    const report = await getReportWithChart(id);
    // Include id so frontend DTO parsing succeeds; keep chartData as extra field.
    return NextResponse.json({
      id,
      ...report,
    });
  } catch (error) {
    return handleError(error);
  }
}
