export const runtime = 'nodejs';

import { NextRequest } from 'next/server';
import { generatePdfBody } from '@/backend/features/pdf/http/pdf.schemas';
import { generatePdf } from '@/backend/features/pdf';
import { handleError } from '@/backend/core/errors/error-handler';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { unauthorized } from '@/backend/core/errors/http-errors';
import { Readable } from 'node:stream';

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

    // Convert Node stream to Web ReadableStream for App Router Response
    const webStream = Readable.toWeb(pdfStream as any) as unknown as ReadableStream;

    return new Response(webStream, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
