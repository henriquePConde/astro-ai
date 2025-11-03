import { NextRequest, NextResponse } from 'next/server';
import { generatePdfBody } from '@/backend/features/pdf/http/pdf.schemas';
import { generatePdf } from '@/backend/features/pdf';
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
    const input = generatePdfBody.parse(body);

    const pdfStream = await generatePdf(input.reportId, input.options);
    const filename = input.filename || `report-${input.reportId}.pdf`;

    // Convert PassThrough stream to Response
    return new Response(pdfStream as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
