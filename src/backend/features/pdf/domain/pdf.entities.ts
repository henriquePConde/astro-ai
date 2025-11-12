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
    landscape?: boolean; // added to reflect actual usage in pdf.service.ts
  };
};

export type PdfToken = {
  reportId: string;
  purpose: 'puppeteer-pdf';
};
