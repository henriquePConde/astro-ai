import type { REPORT_ACCORDION_CONFIG } from './report-accordion.config';

export interface ReportAccordionViewProps {
  sections: Record<string, string>;
  isGenerating: boolean;
  hasBirthData: boolean;
  hasContent: boolean;
  sectionKeys: string[];
  openSections: Record<string, boolean>;
  onToggleSection: (key: string) => void;
  config: typeof REPORT_ACCORDION_CONFIG;
}

export interface ReportAccordionContainerProps {
  sections: Record<string, string>;
  isGenerating: boolean;
  hasBirthData: boolean;
  hasContent: boolean;
}
