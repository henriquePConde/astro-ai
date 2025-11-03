/**
 * Domain entities and business rules for the PDF feature.
 */

export type PdfGenerationRequest = {
  reportId: string;
  filename?: string;
  options?: {
    format?: 'A4' | 'Letter';
    printBackground?: boolean;
    margin?: {
      top?: string;
      bottom?: string;
      left?: string;
      right?: string;
    };
    scale?: number;
    width?: string;
    height?: string;
  };
};

export type PdfToken = {
  reportId: string;
  purpose: 'puppeteer-pdf';
};
