// Use puppeteer-core + @sparticuz/chromium on Vercel; fall back to puppeteer locally
const isVercel = !!process.env.VERCEL;
const chromium = isVercel ? require('@sparticuz/chromium') : null;
const puppeteer = isVercel ? require('puppeteer-core') : require('puppeteer');
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

  // Generate a temporary JWT token (expires in 15 min)
  const pdfToken = generatePdfToken({ reportId, purpose: 'puppeteer-pdf' });

  // Build secure URL with id and pdfToken
  const puppeteerUrl = `${FRONTEND_BASE_URL}/pdf-preview/public?id=${reportId}&pdfToken=${pdfToken}`;

  // Launch Puppeteer (Vercel-friendly when in serverless environment)
  const browser = isVercel
    ? await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: true,
        ignoreHTTPSErrors: true,
      })
    : await puppeteer.launch({
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
      // Wait for either the container or the ready attribute
      await page.waitForFunction(
        () => {
          const hasContainer = !!document.querySelector('.pdf-preview-container');
          const isPageReady = !!document.querySelector('[data-pdf-ready="true"]');
          return hasContainer || isPageReady;
        },
        { timeout: 90000, polling: 1000 },
      );
      console.log('PDF preview base container/ready marker found');

      // Wait for content to be ready
      await page.waitForFunction(
        () => {
          // Prefer explicit ready flag
          const readyContainer = document.querySelector('[data-pdf-ready="true"]');
          if (readyContainer) return true;

          // Fallback: check container existence and content
          const pdfContainer = document.querySelector(
            '.pdf-preview-container',
          ) as HTMLElement | null;
          if (!pdfContainer) return false;

          const bodyText = document.body.textContent || '';
          const hasError =
            bodyText.includes('Token is invalid') ||
            bodyText.includes('Failed to load') ||
            (bodyText.includes('Error') && bodyText.includes('h2'));
          if (hasError) return false;

          // loading states
          if (bodyText.includes('Loading PDF preview') || bodyText.includes('Carregando PDF')) {
            return false;
          }

          // substantial content
          const containerText = pdfContainer.textContent || '';
          return containerText.length > 100;
        },
        { timeout: 90000, polling: 2000 },
      );
      console.log('PDF preview content loaded and ready');
    } catch (error) {
      console.log('Waiting for content timeout - checking page state', error);
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
      console.log('Proceeding with PDF generation despite timeout');
    }

    await page.emulateMediaType('print');

    // Wait for chart image to be generated (SVG to PNG conversion)
    try {
      await page.waitForFunction(
        () => {
          const chartSection = document.querySelector('.chart-section');

          if (chartSection) {
            const sectionText = chartSection.textContent || '';
            if (
              sectionText.includes('Generating chart image') ||
              sectionText.includes('Generating chart image…')
            ) {
              return false;
            }

            const chartImg = chartSection.querySelector(
              'img[alt="Astro Chart"]',
            ) as HTMLImageElement | null;
            if (chartImg) {
              return chartImg.complete && chartImg.naturalWidth > 0;
            }
            return false;
          }
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
    } catch {
      console.log('Images timeout - proceeding anyway');
    }

    // Additional wait for any remaining async operations
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Print CSS: pagination fixes (allow text/content to continue on next page)
    await page.addStyleTag({
      content: `
        @page { size: A4; margin: 10mm; }
    
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
          background: white !important;
          min-height: auto !important; /* avoid trailing blank page */
        }
    
        @media print {
          .pdf-preview-container {
            min-height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
          }
    
          /* 1) Normalize all breaks by default */
          .pdf-preview-container,
          .pdf-preview-container * {
            break-before: auto !important;
            break-after: auto !important;
            break-inside: auto !important;
            page-break-before: auto !important;
            page-break-after: auto !important;
            page-break-inside: auto !important;
          }
    
          /* 2) Avoid phantom breaks at start/end */
          .pdf-preview-container > :first-child {
            break-before: avoid-page !important;
          }
          .pdf-preview-container > :last-child {
            break-after: avoid-page !important;
          }
          .pdf-preview-container > .page-break:last-child,
          .pdf-preview-container > .pagebreak:last-child {
            break-after: auto !important;
            page-break-after: auto !important;
            display: none !important;
          }
          .pdf-preview-container .page-break:empty,
          .pdf-preview-container .pagebreak:empty {
            display: none !important;
          }
          .pdf-preview-container *[style*="page-break-after"]:last-child,
          .pdf-preview-container *[style*="break-after"]:last-child {
            break-after: auto !important;
            page-break-after: auto !important;
          }
    
          /* 3) Anti-clipping + anti-layerization */
          .pdf-preview-container, .pdf-preview-container * {
            overflow: visible !important;
            height: auto !important;
            max-height: none !important;
            transform: none !important;
            filter: none !important;
            backdrop-filter: none !important;
            contain: none !important;
          }
    
          /* 4) Neutralize flex/grid */
          .pdf-preview-container,
          .pdf-preview-container .MuiGrid-root,
          .pdf-preview-container [class*="MuiGrid"],
          .pdf-preview-container [class*="Grid"],
          .pdf-preview-container .MuiBox-root,
          .pdf-preview-container [class*="MuiBox"],
          .pdf-preview-container [class*="flex"],
          .pdf-preview-container [class*="grid"] {
            display: block !important;
          }
    
          /* 5) Flow content can split */
          .pdf-preview-container section,
          .pdf-preview-container article,
          .pdf-preview-container main,
          .pdf-preview-container .section,
          .pdf-preview-container .report-section,
          .pdf-preview-container .content,
          .pdf-preview-container .prose,
          .pdf-preview-container .MuiCard-root,
          .pdf-preview-container .MuiPaper-root,
          .pdf-preview-container .MuiCardContent-root,
          .pdf-preview-container div,
          .pdf-preview-container p,
          .pdf-preview-container ul,
          .pdf-preview-container ol {
            display: block !important;
          }
    
          /* 6) Headings */
          .pdf-preview-container h1,
          .pdf-preview-container h2,
          .pdf-preview-container h3 {
            break-after: avoid-page !important;
            break-inside: avoid !important;
          }
    
          /* 7) Atomic blocks */
          .pdf-preview-container table,
          .pdf-preview-container img,
          .pdf-preview-container svg,
          .pdf-preview-container figure,
          .pdf-preview-container pre,
          .pdf-preview-container code,
          .pdf-preview-container blockquote {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
    
          /* 8) Only .page-break should force a break */
          .pdf-preview-container .page-break,
          .pdf-preview-container .pagebreak {
            break-after: page !important;
            page-break-after: always !important;
          }
    
          /* 9) Collapse trailing spacing */
          .pdf-preview-container > :last-child,
          .pdf-preview-container > :last-child *:last-child {
            margin-bottom: 0 !important;
            padding-bottom: 0 !important;
          }
    
          /* Chart remains circular */
          .pdf-preview-container .chart-section img[alt="Astro Chart"],
          .pdf-preview-container .astro-chart,
          .pdf-preview-container .astro-wheel,
          .pdf-preview-container .chart-wheel {
            border-radius: 50% !important;
            clip-path: circle(50% at 50% 50%);
            overflow: hidden !important;
            aspect-ratio: 1 / 1;
          }
    
          /* Preserve colors */
          .pdf-preview-container svg,
          .pdf-preview-container img {
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
          }
        }
      `,
    });

    // Use options from frontend, prefer CSS page size for stability
    const pdfOptions = {
      format: options?.format || ('A4' as const),
      printBackground: options?.printBackground ?? true,
      margin: options?.margin || { top: '5mm', bottom: '5mm', left: '5mm', right: '5mm' },
      scale: options?.scale || 1,
      displayHeaderFooter: false,
      headerTemplate: '',
      footerTemplate: '',
      preferCSSPageSize: true, // let @page control size/margins
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
