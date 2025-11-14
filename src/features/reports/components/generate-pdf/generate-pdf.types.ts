import type { PDFPresetKey } from '@/shared/services/pdf/pdf.service';
import type { GENERATE_PDF_CONFIG } from './generate-pdf.config';

export type GeneratePdfConfig = typeof GENERATE_PDF_CONFIG;

export interface GeneratePdfViewProps {
  preset: PDFPresetKey;
  onPresetChange: (preset: PDFPresetKey) => void;
  onGenerate: () => void;
  isLoading: boolean;
  config: GeneratePdfConfig;
}
