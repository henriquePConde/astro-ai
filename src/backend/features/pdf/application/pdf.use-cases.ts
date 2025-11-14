import { generatePdfFromReportId } from '../infra/pdf.service';
import { verifyPdfToken } from '../infra/pdf-token.util';

export async function generatePdf(reportId: string, options?: any) {
  return generatePdfFromReportId(reportId, options);
}

export function validatePdfToken(token: string, reportId: string): boolean {
  try {
    const data = verifyPdfToken<{ reportId: string; purpose?: string }>(token);
    // Check if token is valid and matches reportId and purpose
    return (
      data !== null &&
      typeof data === 'object' &&
      'reportId' in data &&
      data.reportId === reportId &&
      data.purpose === 'puppeteer-pdf'
    );
  } catch (error) {
    // Token is invalid or expired
    return false;
  }
}
