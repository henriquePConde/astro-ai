'use client';

import { SECTION_CONTENT_CONFIG } from './section-content.config';
import { useSectionContentState } from './hooks/use-section-content-state.state';
import { SectionContentView } from './section-content.view';
import type { SectionContentContainerProps } from './section-content.types';

export function SectionContentContainer({
  activeSection,
  chartData,
  birthData,
  reportData,
  isGenerating,
  error,
  onGenerateReport,
  onDownloadPdf,
}: SectionContentContainerProps) {
  const { sections, hasSections } = useSectionContentState({ reportData });

  return (
    <SectionContentView
      activeSection={activeSection}
      chartData={chartData}
      birthData={birthData}
      sections={sections}
      hasSections={hasSections}
      isGenerating={isGenerating}
      error={error}
      onGenerateReport={onGenerateReport}
      onDownloadPdf={onDownloadPdf}
      config={SECTION_CONTENT_CONFIG}
    />
  );
}
