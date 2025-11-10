// src/shared/services/pdf/pdf.service.ts
import { client } from '@/shared/services/http/client';

export const PDFPresets = {
  highQuality: {
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20mm',
      right: '15mm',
      bottom: '20mm',
      left: '15mm',
    },
  },
  compact: {
    format: 'A4',
    printBackground: true,
    margin: {
      top: '10mm',
      right: '10mm',
      bottom: '10mm',
      left: '10mm',
    },
    scale: 0.9,
  },
  presentation: {
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: {
      top: '10mm',
      right: '10mm',
      bottom: '10mm',
      left: '10mm',
    },
  },
} as const;

export type PDFPresetKey = keyof typeof PDFPresets;

export interface GeneratePdfOptions {
  reportId: string;
  filename?: string;
  preset?: PDFPresetKey;
}

/**
 * Generic helper to call backend PDF generation endpoint and trigger client download.
 * The backend endpoint `/api/pdf` accepts:
 *  - reportId: string (UUID of the report)
 *  - filename?: string (optional filename for the PDF)
 *  - options?: object (PDF generation options)
 *  - returns: PDF binary
 */
export async function generateAndDownloadPdfFromUrl({
  reportId,
  filename,
  preset = 'highQuality',
}: GeneratePdfOptions) {
  try {
    const response = await client.post(
      '/api/pdf',
      {
        reportId,
        filename,
        options: PDFPresets[preset],
      },
      {
        responseType: 'blob' as any,
        validateStatus: (status) => status < 500, // Don't throw on 4xx
      },
    );

    // Check if the response is an error (status >= 400)
    if (response.status >= 400) {
      // Error response - try to parse as JSON
      try {
        const text = await (response.data as Blob).text();
        const error = JSON.parse(text);
        throw new Error(error.message || `Failed to generate PDF: ${response.status}`);
      } catch (parseError) {
        throw new Error(`Failed to generate PDF: ${response.status} ${response.statusText}`);
      }
    }

    // Check content type to ensure it's a PDF
    const contentType = response.headers['content-type'] || '';
    if (!contentType.includes('application/pdf')) {
      // Might be an error response
      try {
        const text = await (response.data as Blob).text();
        const error = JSON.parse(text);
        throw new Error(error.message || 'Failed to generate PDF');
      } catch (parseError) {
        throw new Error('Unexpected response format from PDF service');
      }
    }

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename || `report-${reportId}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  } catch (error: any) {
    console.error('[generateAndDownloadPdfFromUrl] Error:', error);
    // Re-throw if it's already a proper Error
    if (error instanceof Error) {
      throw error;
    }
    // Handle axios errors
    if (error.response?.data instanceof Blob) {
      try {
        const text = await error.response.data.text();
        const errorData = JSON.parse(text);
        throw new Error(errorData.message || 'Failed to generate PDF');
      } catch (parseError) {
        throw new Error(`Failed to generate PDF: ${error.response?.status || 'Unknown error'}`);
      }
    }
    throw new Error(error.message || 'Failed to generate PDF');
  }
}
