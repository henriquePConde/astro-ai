'use client';

import { useMemo } from 'react';
import { REPORT_ACCORDION_CONFIG } from './report-accordion.config';
import { useAccordionSections } from './hooks/use-accordion-sections.state';
import { ReportAccordionView } from './report-accordion.view';
import type { ReportAccordionContainerProps } from './report-accordion.types';

export function ReportAccordionContainer({
  sections,
  isGenerating,
  hasBirthData,
  hasContent,
}: ReportAccordionContainerProps) {
  const sectionKeys = useMemo(() => Object.keys(sections || {}), [sections]);
  const { openSections, toggleSection } = useAccordionSections({ sectionKeys });

  return (
    <ReportAccordionView
      sections={sections}
      isGenerating={isGenerating}
      hasBirthData={hasBirthData}
      hasContent={hasContent}
      sectionKeys={sectionKeys}
      openSections={openSections}
      onToggleSection={toggleSection}
      config={REPORT_ACCORDION_CONFIG}
    />
  );
}
