// src/features/reports/components/generate-pdf/hooks/use-pdf-preset.state.ts

import { useState } from 'react';
import type { PDFPresetKey } from '@/shared/services/pdf/pdf.service';

/**
 * UI state hook for PDF preset selection.
 * Component-level hook for local UI state only (no I/O).
 */
export function usePdfPreset(initialPreset: PDFPresetKey = 'highQuality') {
  const [preset, setPreset] = useState<PDFPresetKey>(initialPreset);

  return {
    preset,
    setPreset,
  };
}
