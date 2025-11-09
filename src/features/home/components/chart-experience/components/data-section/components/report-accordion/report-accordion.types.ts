// report-accordion.types.ts
export interface ReportAccordionProps {
  sections: Record<string, string>;
  isGenerating: boolean;
  hasBirthData: boolean;
  hasContent: boolean;
}
