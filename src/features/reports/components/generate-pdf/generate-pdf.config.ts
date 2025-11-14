import type { PDFPresetKey } from '@/shared/services/pdf/pdf.service';

/**
 * Configuration and copy text for the generate PDF component.
 * Centralized to avoid magical strings and enable easy content updates.
 */
export const GENERATE_PDF_CONFIG = {
  copy: {
    label: {
      pdfQuality: 'PDF Quality',
    },
    button: {
      generate: 'Generate PDF',
      generating: 'Generating…',
    },
    presets: {
      highQuality: 'High Quality',
      compact: 'Compact',
      presentation: 'Presentation',
    },
  },
  ui: {
    select: {
      size: 'small' as const,
    },
    button: {
      variant: 'contained' as const,
    },
    label: {
      variant: 'caption' as const,
    },
  },
  defaults: {
    filename: 'astrological-birth-chart-report.pdf',
    preset: 'highQuality' as const,
  },
  values: {
    presetOptions: ['highQuality', 'compact', 'presentation'] as PDFPresetKey[],
  },
} as const;
