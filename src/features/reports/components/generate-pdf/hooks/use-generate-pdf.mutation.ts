// src/features/reports/components/generate-pdf/hooks/use-generate-pdf.mutation.ts

import { useMutation } from '@tanstack/react-query';
import {
  generateAndDownloadPdfFromUrl,
  type GeneratePdfOptions,
  type PDFPresetKey,
} from '@/shared/services/pdf/pdf.service';

export interface GeneratePdfPayload {
  reportId: string;
  filename?: string;
  preset?: PDFPresetKey;
}

/**
 * Mutation hook for generating and downloading PDF reports.
 * Component-level mutation hook for generate-pdf component.
 */
export function useGeneratePdf() {
  return useMutation<void, Error, GeneratePdfPayload>({
    mutationFn: async ({ reportId, filename, preset = 'highQuality' }) => {
      await generateAndDownloadPdfFromUrl({
        reportId,
        filename,
        preset,
      });
    },
  });
}
