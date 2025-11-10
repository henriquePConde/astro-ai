'use client';

import { AstroInterpreter } from '../../../astro-interpreter';
import type { SectionContentViewProps } from './section-content.types';
import { BirthChartReportView } from '../birth-chart-report/birth-chart-report.view';

export function SectionContentView({
  activeTab,
  chartData,
  birthData,
  isGenerating,
  error,
  sections,
  onGenerateReport,
  onDownloadPdf,
  canDownloadPdf,
}: SectionContentViewProps) {
  if (!chartData) return null;

  switch (activeTab) {
    case 'ai':
      return <AstroInterpreter chartData={chartData} />;

    case 'report':
      return (
        <BirthChartReportView
          birthData={birthData}
          isGenerating={isGenerating}
          error={error}
          sections={sections}
          onGenerate={onGenerateReport}
          onDownloadPdf={onDownloadPdf}
          canDownload={canDownloadPdf}
        />
      );

    default:
      return null;
  }
}
