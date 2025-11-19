import type { REPORT_ACCORDION_CONFIG } from './report-accordion.config';

export interface ReportAccordionViewProps {
  sections: Record<string, string>;
  isGenerating: boolean;
  isDownloading: boolean;
  hasBirthData: boolean;
  hasContent: boolean;
  sectionKeys: string[];
  openSections: Record<string, boolean>;
  onToggleSection: (key: string) => void;
  config: typeof REPORT_ACCORDION_CONFIG;
  jobProgress: number | null;
  onGoToAI: () => void;
}

export interface ReportAccordionContainerProps {
  sections: Record<string, string>;
  isGenerating: boolean;
  isDownloading: boolean;
  hasBirthData: boolean;
  hasContent: boolean;
  jobProgress: number | null;
  onGoToAI: () => void;
}
