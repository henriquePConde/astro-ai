'use client';

import { useMutation } from '@tanstack/react-query';
import {
  generateAndDownloadPdfFromUrl,
  type GeneratePdfOptions,
} from '@/shared/services/pdf/pdf.service';
import type { BirthChartReportResponse } from '../services/birth-chart-report.service';

export interface DownloadBirthChartPdfPayload {
  reportData: BirthChartReportResponse;
  filename?: string;
}

/**
 * Mutation hook for downloading birth chart report as PDF.
 * Single responsibility: handle PDF download with error normalization.
 */
export function useDownloadBirthChartPdf() {
  return useMutation<void, Error, DownloadBirthChartPdfPayload>({
    mutationFn: async ({ reportData, filename = 'astrological-birth-chart-report.pdf' }) => {
      const reportId = reportData.id;

      if (!reportId) {
        throw new Error('Missing reportId for PDF generation.');
      }

      await generateAndDownloadPdfFromUrl({
        reportId,
        filename,
        preset: 'highQuality',
      });
    },
  });
}
