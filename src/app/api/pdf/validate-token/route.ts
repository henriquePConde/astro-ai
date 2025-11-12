export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { validateTokenQuery } from '@/backend/features/pdf/http/pdf.schemas';
import { validatePdfToken } from '@/backend/features/pdf';
import { handleError } from '@/backend/core/errors/error-handler';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = Object.fromEntries(searchParams);

    const parseResult = validateTokenQuery.safeParse(query);
    if (!parseResult.success) {
      return NextResponse.json({ valid: false, error: 'Invalid parameters' }, { status: 400 });
    }

    const input = parseResult.data;
    const isValid = validatePdfToken(input.pdfToken, input.reportId);

    return NextResponse.json({ valid: isValid });
  } catch (error) {
    // keep error handling consistent
    return handleError(error);
  }
}
