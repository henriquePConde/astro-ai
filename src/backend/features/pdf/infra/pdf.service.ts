// src/backend/features/pdf/infra/pdf.service.ts

// Decide which runtime to use
const forceLocalPuppeteer = process.env.PDF_FORCE_LOCAL === 'true';
const isVercel = !!process.env.VERCEL;
const useServerlessChromium = isVercel && !forceLocalPuppeteer;

// Timeouts: be stricter on Vercel (to respect maxDuration) but more generous in local dev
const NAVIGATION_TIMEOUT = isVercel ? 15000 : 45000; // page.goto / navigation
const CONTENT_WAIT_TIMEOUT = isVercel ? 15000 : 45000; // waiting for React app to hydrate / data

let chromium: any = null;
let puppeteer: any;

// On Vercel (serverless), use @sparticuz/chromium + puppeteer-core
if (useServerlessChromium) {
  chromium = require('@sparticuz/chromium');
  puppeteer = require('puppeteer-core');
} else {
  // Local dev / forced local: full Puppeteer, which brings its own Chrome
  puppeteer = require('puppeteer');
}

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
  // 1. Verify report exists
  const report = await getReportById(reportId);
  if (!report) {
    throw new Error('Report not found');
  }

  // 2. Short-lived JWT to access /pdf-preview/public
  const pdfToken = generatePdfToken({ reportId, purpose: 'puppeteer-pdf' });

  const puppeteerUrl = `${FRONTEND_BASE_URL}/pdf-preview/public?id=${reportId}&pdfToken=${pdfToken}`;

  let browser: any;

  // Timeout wrapper to ensure we don't exceed 55 seconds (leaving 5s buffer for Vercel)
  const PDF_GENERATION_TIMEOUT = 55000; // 55 seconds
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error('PDF generation timed out after 55 seconds'));
    }, PDF_GENERATION_TIMEOUT);
  });

  // Wrap the entire PDF generation in a race with timeout
  const pdfGenerationPromise = (async () => {
    try {
      // 3. Launch browser
      if (useServerlessChromium) {
        // 🟢 Vercel + @sparticuz/chromium
        browser = await puppeteer.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath(),
          headless: (chromium as any).headless ?? true,
          ignoreHTTPSErrors: true,
        });
      } else {
        // 🟢 Local dev or forced local
        browser = await puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
      }
    } catch (launchError: any) {
      const message = launchError?.message || '';
      const stderr = (launchError && (launchError.stderr || launchError.toString?.())) || '';
      const combined = `${message}\n${stderr}`;
      const isMissingLib =
        /libnss3\.so|libnspr4\.so|error while loading shared libraries|code:\s*127/i.test(combined);

      // On Vercel we don't want to silently fall back; we want a clear error
      if (useServerlessChromium) {
        const help =
          'This function is running on Vercel with Node 22.x. Make sure you have:\n' +
          '- Installed @sparticuz/chromium as a dependency\n' +
          '- Set AWS_LAMBDA_JS_RUNTIME=nodejs22.x in your Vercel env\n' +
          '- Disabled Fluid Compute for this project';

        const advice = isMissingLib
          ? `Missing native libraries for Chromium. ${help}`
          : 'Failed to launch Chromium for PDF generation.';

        throw new Error(`${advice}\nOriginal error: ${message || stderr}`);
      }

      // Local dev: rethrow with useful info
      throw new Error(
        `Failed to launch local Chromium for PDF generation.\nOriginal error: ${message || stderr}`,
      );
    }

    try {
      const page = await browser.newPage();

      // Timeouts tuned for serverless vs local:
      // - On Vercel: stricter to fit within maxDuration
      // - Local dev: more generous, as dev builds can be slower
      page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT);
      page.setDefaultTimeout(20000); // keep a reasonable default for selectors, etc.

      console.log(`Navigating to: ${puppeteerUrl}`);

      await page.goto(puppeteerUrl, {
        waitUntil: 'domcontentloaded',
        timeout: NAVIGATION_TIMEOUT,
      });

      console.log('Page loaded (domcontentloaded), waiting for content...');

      // Reduced pause
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Wait for container / ready flag
      try {
        await page.waitForFunction(
          () => {
            const hasContainer = !!document.querySelector('.pdf-preview-container');
            const isPageReady = !!document.querySelector('[data-pdf-ready="true"]');
            return hasContainer || isPageReady;
          },
          { timeout: CONTENT_WAIT_TIMEOUT, polling: 500 },
        );
        console.log('PDF preview base container/ready marker found');

        // Wait for content to be really loaded
        await page.waitForFunction(
          () => {
            const readyContainer = document.querySelector('[data-pdf-ready="true"]');
            if (readyContainer) return true;

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

            if (bodyText.includes('Loading PDF preview') || bodyText.includes('Carregando PDF')) {
              return false;
            }

            const containerText = pdfContainer.textContent || '';
            return containerText.length > 100;
          },
          { timeout: CONTENT_WAIT_TIMEOUT, polling: 1000 },
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

      // Enhanced chart image readiness check
      console.log('Waiting for chart images to be ready...');

      // First, wait for fonts to load
      try {
        await page.evaluate(() => {
          return document.fonts.ready;
        });
        console.log('Fonts loaded');
      } catch (error) {
        console.warn('Font loading check failed:', error);
      }

      // Wait for PDF ready state
      try {
        await page.waitForFunction(
          () => {
            const container = document.querySelector('.pdf-preview-container');
            return container && container.getAttribute('data-pdf-ready') === 'true';
          },
          { timeout: 25000 },
        );
        console.log('PDF container marked as ready');
      } catch (error) {
        console.warn('PDF ready state timeout:', error);
      }

      // Wait for chart PNG image to be ready with enhanced checks
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
                const isLoaded =
                  chartImg.complete && chartImg.naturalWidth > 0 && chartImg.naturalHeight > 0;
                if (isLoaded) {
                  // Verify the image has actual content (not just a placeholder)
                  const canvas = document.createElement('canvas');
                  const ctx = canvas.getContext('2d');
                  if (ctx) {
                    canvas.width = chartImg.naturalWidth;
                    canvas.height = chartImg.naturalHeight;
                    ctx.drawImage(chartImg, 0, 0);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const hasContent = Array.from(imageData.data).some(
                      (pixel, index) => index % 4 !== 3 && pixel !== 0, // Check for non-transparent, non-black pixels
                    );
                    return hasContent;
                  }
                }
                return isLoaded;
              }
              return false;
            }
            return true;
          },
          { timeout: 20000 },
        );
        console.log('Chart image ready and verified');
      } catch (error) {
        console.log('Chart image generation timeout - proceeding anyway', error);
      }

      // Additional stabilization delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Wait for all images with reduced timeout
      try {
        await page.waitForFunction(
          () => {
            const images = document.querySelectorAll('img');
            return Array.from(images).every((img) => (img as HTMLImageElement).complete);
          },
          { timeout: 5000 }, // Reduced from 10s to 5s
        );
      } catch {
        console.log('Images timeout - proceeding anyway');
      }

      // Reduced delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 🔤 Very important for your missing-symbols issue:
      // wait until all fonts are loaded in headless Chromium (with timeout)
      try {
        await Promise.race([
          page.evaluate(async () => {
            const anyDoc = document as any;
            if (anyDoc.fonts && anyDoc.fonts.ready) {
              await anyDoc.fonts.ready;
            }
          }),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Fonts timeout')), 5000)),
        ]);
        console.log('document.fonts.ready resolved before PDF generation');
      } catch (e) {
        console.log('document.fonts.ready check failed or timed out (continuing anyway):', e);
      }

      // Inject print styles
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
          min-height: auto !important;
        }
    
        @media print {
          .pdf-preview-container {
            min-height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
          }
    
          .pdf-preview-container,
          .pdf-preview-container * {
            break-before: auto !important;
            break-after: auto !important;
            break-inside: auto !important;
            page-break-before: auto !important;
            page-break-after: auto !important;
            page-break-inside: auto !important;
          }
    
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
    
          .pdf-preview-container, .pdf-preview-container * {
            overflow: visible !important;
            height: auto !important;
            max-height: none !important;
            transform: none !important;
            filter: none !important;
            backdrop-filter: none !important;
            contain: none !important;
          }
    
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
    
          .pdf-preview-container h1,
          .pdf-preview-container h2,
          .pdf-preview-container h3 {
            break-after: avoid-page !important;
            break-inside: avoid !important;
          }
    
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
    
          .pdf-preview-container .page-break,
          .pdf-preview-container .pagebreak {
            break-after: page !important;
            page-break-after: always !important;
          }
    
          .pdf-preview-container > :last-child,
          .pdf-preview-container > :last-child *:last-child {
            margin-bottom: 0 !important;
            padding-bottom: 0 !important;
          }
    
          .pdf-preview-container .chart-section img[alt="Astro Chart"],
          .pdf-preview-container .astro-chart,
          .pdf-preview-container .astro-wheel,
          .pdf-preview-container .chart-wheel {
            border-radius: 50% !important;
            clip-path: circle(50% at 50% 50%);
            overflow: hidden !important;
            aspect-ratio: 1 / 1;
          }
    
          .pdf-preview-container svg,
          .pdf-preview-container img {
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
          }
        }
      `,
      });

      // Generate PDF
      const pdfOptions = {
        format: options?.format || ('A4' as const),
        printBackground: options?.printBackground ?? true,
        margin: options?.margin || { top: '5mm', bottom: '5mm', left: '5mm', right: '5mm' },
        scale: options?.scale || 1,
        displayHeaderFooter: false,
        headerTemplate: '',
        footerTemplate: '',
        preferCSSPageSize: true,
        omitBackground: false,
        ...(options?.width && { width: options.width }),
        ...(options?.height && { height: options.height }),
        ...(options?.landscape !== undefined && { landscape: options.landscape }),
      };

      const buffer = await page.pdf(pdfOptions);
      await browser.close();

      const stream = new PassThrough();
      stream.end(buffer);
      return stream;
    } catch (error) {
      try {
        await browser?.close?.();
      } catch {}
      throw error;
    }
  })();

  // Race between PDF generation and timeout
  try {
    return await Promise.race([pdfGenerationPromise, timeoutPromise]);
  } catch (error) {
    // Ensure browser is closed on timeout
    try {
      await browser?.close?.();
    } catch {}
    throw error;
  }
}

export async function issuePdfTokenForCurrentUser() {
  const user = await getSessionUser();
  if (!user) return null;

  const payload = { sub: user.id, email: user.email };
  return generatePdfToken(payload);
}
