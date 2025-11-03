import { generatePdfFromReportId } from '../infra/pdf.service';
import { verifyPdfToken } from '../infra/pdf-token.util';

export async function generatePdf(reportId: string, options?: any) {
  return generatePdfFromReportId(reportId, options);
}

export function validatePdfToken(token: string, reportId: string): boolean {
  const data = verifyPdfToken(token);
  return data !== null && data.reportId === reportId;
}
