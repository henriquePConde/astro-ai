import { NextRequest, NextResponse } from 'next/server';
import { getReportWithChart } from '@/backend/features/reports';
import { handleError } from '@/backend/core/errors/error-handler';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const report = await getReportWithChart(id);
    return NextResponse.json(report);
  } catch (error) {
    return handleError(error);
  }
}
