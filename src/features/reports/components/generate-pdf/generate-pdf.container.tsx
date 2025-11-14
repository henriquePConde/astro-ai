'use client';

import { useCallback } from 'react';
import { GENERATE_PDF_CONFIG } from './generate-pdf.config';
import { GeneratePdfView } from './generate-pdf.view';
import { usePdfPreset } from './hooks/use-pdf-preset.state';
import { useGeneratePdf } from './hooks/use-generate-pdf.mutation';

export interface GeneratePdfContainerProps {
  reportId: string;
}

export function GeneratePdfControls({ reportId }: GeneratePdfContainerProps) {
  const { preset, setPreset } = usePdfPreset(GENERATE_PDF_CONFIG.defaults.preset);
  const { mutate: generatePdf, isPending: isLoading } = useGeneratePdf();

  const handleGenerate = useCallback(() => {
    generatePdf({
      reportId,
      filename: GENERATE_PDF_CONFIG.defaults.filename,
      preset,
    });
  }, [reportId, preset, generatePdf]);

  return (
    <GeneratePdfView
      preset={preset}
      onPresetChange={setPreset}
      onGenerate={handleGenerate}
      isLoading={isLoading}
      config={GENERATE_PDF_CONFIG}
    />
  );
}
