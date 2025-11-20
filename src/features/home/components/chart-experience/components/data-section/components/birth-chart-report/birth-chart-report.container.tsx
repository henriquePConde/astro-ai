'use client';

import { useMemo } from 'react';
import { BIRTH_CHART_REPORT_CONFIG } from './birth-chart-report.config';
import { useBirthChartReportHandlers } from './hooks/use-birth-chart-report-handlers.state';
import { BirthChartReportView } from './birth-chart-report.view';
import { useDailyUsage } from '@/features/reports/services/reports.queries';
import type { BirthChartReportContainerProps } from './birth-chart-report.types';

export function BirthChartReportContainer({
  birthData,
  isGenerating,
  isDownloading,
  error,
  sections,
  hasSections,
  onGenerate,
  onDownloadPdf,
  jobProgress,
  onGoToAI,
}: BirthChartReportContainerProps) {
  const { handleGenerateClick, handleDownloadClick } = useBirthChartReportHandlers({
    birthData,
    isGenerating,
    isDownloading,
    hasSections,
    onGenerate,
    onDownloadPdf,
  });

  const { data: usage } = useDailyUsage();

  const generateButtonText = useMemo(() => {
    if (hasSections) return BIRTH_CHART_REPORT_CONFIG.copy.button.regenerate;
    return BIRTH_CHART_REPORT_CONFIG.copy.button.generate;
  }, [hasSections]);

  return (
    <BirthChartReportView
      birthData={birthData}
      isGenerating={isGenerating}
      isDownloading={isDownloading}
      error={error}
      sections={sections}
      hasSections={hasSections}
      onGenerate={onGenerate}
      onDownloadPdf={onDownloadPdf}
      handleGenerateClick={handleGenerateClick}
      handleDownloadClick={handleDownloadClick}
      generateButtonText={generateButtonText}
      usage={usage}
      config={BIRTH_CHART_REPORT_CONFIG}
      jobProgress={jobProgress}
      onGoToAI={onGoToAI}
    />
  );
}
