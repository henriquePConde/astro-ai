import jwt from 'jsonwebtoken';

const secret = process.env.PDF_JWT_SECRET || 'secretoo-super-seguro';

export function generatePdfToken(reportId: string, expiresInSeconds = 180): string {
  const payload = {
    reportId,
    purpose: 'puppeteer-pdf' as const,
  };
  return jwt.sign(payload, secret, { expiresIn: expiresInSeconds });
}

export function verifyPdfToken(
  token: string,
): { reportId: string; purpose: 'puppeteer-pdf' } | null {
  try {
    const decoded = jwt.verify(token, secret) as any;
    if (decoded.purpose !== 'puppeteer-pdf') return null;
    return decoded as { reportId: string; purpose: 'puppeteer-pdf' };
  } catch {
    return null;
  }
}
