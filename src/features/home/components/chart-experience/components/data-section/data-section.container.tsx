'use client';

import { DataSectionView } from './data-section.view';
import type { DataSectionContainerProps, DataSectionTab } from './data-section.types';
import { useDataSectionTabs } from '@/features/home/hooks/use-data-section-tabs.state';
import { useGenerateBirthChartReport } from '@/features/home/hooks/use-generate-birth-chart-report.mutation';
import { generateAndDownloadPdfFromUrl } from '@/shared/services/pdf/pdf.service';

export function DataSectionContainer({
  chartData,
  isExpanded,
  isDragging,
  splitPosition,
  birthData,
}: DataSectionContainerProps) {
  const { activeTab, setActiveTab } = useDataSectionTabs('ai');

  const {
    mutate,
    data: reportData,
    isPending: isGenerating,
    error,
  } = useGenerateBirthChartReport();

  const sections = reportData?.content ?? {};
  const hasSections = Object.keys(sections).length > 0;

  const handleTabChange = (tab: DataSectionTab) => {
    setActiveTab(tab);
  };

  const handleGenerateReport = () => {
    if (!birthData) return;
    mutate({ birthData, chartData });
  };

  const handleDownloadPdf = async () => {
    if (!hasSections || !reportData) return;

    const reportId = reportData.id;

    if (!reportId) {
      console.warn('Missing reportId for PDF generation.');
      return;
    }

    try {
      await generateAndDownloadPdfFromUrl({
        reportId,
        filename: 'astrological-birth-chart-report.pdf',
        preset: 'highQuality',
      });
    } catch (error: any) {
      console.error('Failed to download PDF:', error);
      alert(`Failed to generate PDF: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <DataSectionView
      chartData={chartData}
      birthData={birthData}
      isExpanded={isExpanded}
      isDragging={isDragging}
      splitPosition={splitPosition}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      isGenerating={isGenerating}
      error={error ? ((error as any).message ?? 'Failed to generate report.') : null}
      sections={sections}
      hasSections={hasSections}
      onGenerateReport={handleGenerateReport}
      onDownloadPdf={handleDownloadPdf}
    />
  );
}
