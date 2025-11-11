'use client';

import { useMemo } from 'react';
import { BIRTH_CHART_REPORT_CONFIG } from './birth-chart-report.config';
import { useBirthChartReportHandlers } from './hooks/use-birth-chart-report-handlers.state';
import { BirthChartReportView } from './birth-chart-report.view';
import type { BirthChartReportContainerProps } from './birth-chart-report.types';

export function BirthChartReportContainer({
  birthData,
  isGenerating,
  error,
  sections,
  hasSections,
  onGenerate,
  onDownloadPdf,
}: BirthChartReportContainerProps) {
  const { handleGenerateClick, handleDownloadClick } = useBirthChartReportHandlers({
    birthData,
    isGenerating,
    hasSections,
    onGenerate,
    onDownloadPdf,
  });

  const generateButtonText = useMemo(() => {
    if (isGenerating) return BIRTH_CHART_REPORT_CONFIG.copy.button.generating;
    if (hasSections) return BIRTH_CHART_REPORT_CONFIG.copy.button.regenerate;
    return BIRTH_CHART_REPORT_CONFIG.copy.button.generate;
  }, [isGenerating, hasSections]);

  return (
    <BirthChartReportView
      birthData={birthData}
      isGenerating={isGenerating}
      error={error}
      sections={sections}
      hasSections={hasSections}
      onGenerate={onGenerate}
      onDownloadPdf={onDownloadPdf}
      handleGenerateClick={handleGenerateClick}
      handleDownloadClick={handleDownloadClick}
      generateButtonText={generateButtonText}
      config={BIRTH_CHART_REPORT_CONFIG}
    />
  );
}
