const puppeteer = require('puppeteer');
import { PassThrough } from 'stream';
import { getReportById } from '@/backend/features/reports';
import { generatePdfToken } from './pdf-token.util';
import { getSessionUser } from '@/backend/core/auth/get-session';

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
  const pdfToken = generatePdfToken({ reportId, purpose: 'puppeteer-pdf' });

  // Build secure URL with id and pdfToken
  const puppeteerUrl = `${FRONTEND_BASE_URL}/pdf-preview/public?id=${reportId}&pdfToken=${pdfToken}`;

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    // Set a longer timeout for navigation and all operations (90 seconds)
    page.setDefaultNavigationTimeout(90000);
    page.setDefaultTimeout(90000);

    console.log(`Navigating to: ${puppeteerUrl}`);

    // Navigate with a longer timeout and less strict wait condition
    await page.goto(puppeteerUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 90000,
    });

    console.log('Page loaded (domcontentloaded), waiting for content...');

    // Give the page a moment to start rendering
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Wait for the PDF preview content to be loaded (not in loading state)
    try {
      // Wait for PDF preview container to appear - with a long timeout
      await page.waitForSelector('.pdf-preview-container', {
        timeout: 90000,
        visible: true,
      });
      console.log('PDF preview container found');

      // Wait for content to be ready - check for data-pdf-ready attribute or content presence
      await page.waitForFunction(
        () => {
          // Check for ready attribute first
          const readyContainer = document.querySelector('[data-pdf-ready="true"]');
          if (readyContainer) return true;

          // Fallback: check if PDF preview container exists and has substantial content
          const pdfContainer = document.querySelector('.pdf-preview-container');
          if (!pdfContainer) return false;

          // Check if we're in an error state (look for error messages)
          const bodyText = document.body.textContent || '';
          const hasError =
            bodyText.includes('Token is invalid') ||
            bodyText.includes('Failed to load') ||
            (bodyText.includes('Error') && bodyText.includes('h2'));
          if (hasError) return false;

          // Check if loading state is gone
          if (bodyText.includes('Loading PDF preview') || bodyText.includes('Carregando PDF')) {
            return false;
          }

          // Check if there's actual content in the container (at least some text)
          const containerText = pdfContainer.textContent || '';
          if (containerText.length > 100) {
            return true;
          }

          return false;
        },
        {
          timeout: 90000,
          polling: 2000, // Poll every 2 seconds
        },
      );
      console.log('PDF preview content loaded and ready');
    } catch (error) {
      console.log('Waiting for content timeout - checking page state', error);
      // Check what's actually on the page for debugging
      try {
        const bodyText = await page.evaluate(() => document.body.textContent);
        console.log('Page body text (first 1000 chars):', bodyText?.substring(0, 1000));
        const hasContainer = await page.evaluate(
          () => !!document.querySelector('.pdf-preview-container'),
        );
        console.log('Has PDF container:', hasContainer);
        const hasReady = await page.evaluate(
          () => !!document.querySelector('[data-pdf-ready="true"]'),
        );
        console.log('Has data-pdf-ready=true:', hasReady);
        const isLoading = await page.evaluate(() => {
          const text = document.body.textContent || '';
          return text.includes('Loading PDF preview') || text.includes('Carregando PDF');
        });
        console.log('Is still loading:', isLoading);
      } catch (e) {
        console.log('Could not evaluate page state:', e);
      }
      // Try to continue anyway - maybe the page is partially loaded
      console.log('Proceeding with PDF generation despite timeout');
    }

    await page.emulateMediaType('print');

    // Wait for chart image to be generated (SVG to PNG conversion)
    try {
      await page.waitForFunction(
        () => {
          const chartSection = document.querySelector('.chart-section');

          // If chart section exists, wait for image to be ready
          if (chartSection) {
            // Check if "Generating chart image" text is still present
            const sectionText = chartSection.textContent || '';
            if (
              sectionText.includes('Generating chart image') ||
              sectionText.includes('Generating chart image…')
            ) {
              return false;
            }

            // Check if chart image exists and is loaded
            const chartImg = chartSection.querySelector(
              'img[alt="Astro Chart"]',
            ) as HTMLImageElement;
            if (chartImg) {
              return chartImg.complete && chartImg.naturalWidth > 0;
            }

            // If no image yet, keep waiting
            return false;
          }

          // If no chart section, that's okay - proceed (maybe no chart data)
          return true;
        },
        { timeout: 30000 },
      );
      console.log('Chart image ready');
    } catch (error) {
      console.log('Chart image generation timeout - proceeding anyway', error);
    }

    // Wait for all images to be loaded
    try {
      await page.waitForFunction(
        () => {
          const images = document.querySelectorAll('img');
          return Array.from(images).every((img) => (img as HTMLImageElement).complete);
        },
        { timeout: 10000 },
      );
    } catch (error) {
      console.log('Images timeout - proceeding anyway');
    }

    // Additional wait for any remaining async operations
    await new Promise((resolve) => setTimeout(resolve, 2000));

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
      ...(options?.landscape !== undefined && { landscape: options.landscape }),
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

/**
 * No top-level signing — everything runs lazily inside functions.
 */
export async function issuePdfTokenForCurrentUser() {
  const user = await getSessionUser();
  if (!user) return null;

  const payload = { sub: user.id, email: user.email };
  return generatePdfToken(payload);
}
