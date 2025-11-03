// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require('puppeteer');
import { PassThrough } from 'stream';
import { getReportById } from '@/backend/features/reports';
import { generatePdfToken } from './pdf-token.util';

const FRONTEND_BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || process.env.FRONTEND_BASE_URL || 'http://localhost:3000';

export async function generatePdfFromReportId(
  reportId: string,
  options?: any,
): Promise<PassThrough> {
  // Verify report exists
  const report = await getReportById(reportId);
  if (!report) {
    throw new Error('Report not found');
  }

  // Generate a temporary JWT token (expires in 3 min)
  const pdfToken = generatePdfToken(reportId, 180);

  // Build secure URL with id and pdfToken
  const puppeteerUrl = `${FRONTEND_BASE_URL}/pdf-preview/public?id=${reportId}&pdfToken=${pdfToken}`;

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.goto(puppeteerUrl, {
      waitUntil: 'networkidle0',
    });
    await page.emulateMediaType('print');

    // Wait a bit more for complex charts or images
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      await page.waitForFunction(
        () => {
          const images = document.querySelectorAll('img');
          return Array.from(images).every((img) => (img as HTMLImageElement).complete);
        },
        { timeout: 5000 },
      );
    } catch (error) {
      console.log('Images timeout - proceeding anyway');
    }

    await page.addStyleTag({
      content: `
                * {
                    border-left: none !important;
                    border-right: none !important;
                    box-shadow: none !important;
                    outline: none !important;
                }
                html, body {
                    margin: 0 !important;
                    padding: 0 !important;
                    border: none !important;
                }
                svg {
                    max-width: none !important;
                    max-height: none !important;
                    min-width: inherit !important;
                    min-height: inherit !important;
                    transform: none !important;
                    zoom: 1 !important;
                }
                img {
                    max-width: none !important;
                    max-height: none !important;
                }
                @media print {
                    * {
                        border-left: none !important;
                        border-right: none !important;
                        box-shadow: none !important;
                        outline: none !important;
                    }
                    html, body {
                        margin: 0 !important;
                        padding: 0 !important;
                        border: none !important;
                    }
                    svg {
                        max-width: none !important;
                        max-height: none !important;
                        min-width: inherit !important;
                        min-height: inherit !important;
                        transform: none !important;
                        zoom: 1 !important;
                        print-color-adjust: exact !important;
                        -webkit-print-color-adjust: exact !important;
                    }
                    img {
                        max-width: none !important;
                        max-height: none !important;
                        print-color-adjust: exact !important;
                    }
                }
            `,
    });

    // Use options from frontend
    const pdfOptions = {
      format: options?.format || ('A4' as const),
      printBackground: options?.printBackground ?? true,
      margin: options?.margin || { top: '5mm', bottom: '5mm', left: '5mm', right: '5mm' },
      scale: options?.scale || 1,
      displayHeaderFooter: false,
      headerTemplate: '',
      footerTemplate: '',
      preferCSSPageSize: false,
      omitBackground: false,
      ...(options?.width && { width: options.width }),
      ...(options?.height && { height: options.height }),
    };

    const buffer = await page.pdf(pdfOptions);
    await browser.close();

    // Stream the buffer
    const stream = new PassThrough();
    stream.end(buffer);
    return stream;
  } catch (error) {
    await browser.close();
    throw error;
  }
}
