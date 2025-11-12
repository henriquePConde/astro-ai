'use client';

import { DataSectionView } from './data-section.view';
import type { DataSectionContainerProps } from './data-section.types';
import { DEFAULT_DATA_SECTION_TAB } from './data-section.constants';
import { useDataSectionTabs } from './hooks/use-data-section-tabs.state';
import { useBirthChartReportSections } from './hooks/use-birth-chart-report-sections.state';
import { useBirthChartReportActions } from './hooks/use-birth-chart-report-actions.state';
import { useErrorMessage } from './hooks/use-error-message.state';

export function DataSectionContainer({
  chartData,
  isExpanded,
  isDragging,
  splitPosition,
  birthData,
}: DataSectionContainerProps) {
  const { activeTab, setActiveTab } = useDataSectionTabs(DEFAULT_DATA_SECTION_TAB);

  const {
    generateReport,
    downloadPdf,
    isGenerating,
    isDownloading,
    reportData,
    generateError,
    downloadError,
  } = useBirthChartReportActions(birthData, chartData);

  const { sections, hasSections } = useBirthChartReportSections(reportData);

  const error = useErrorMessage(generateError, downloadError);

  return (
    <DataSectionView
      chartData={chartData}
      birthData={birthData}
      isExpanded={isExpanded}
      isDragging={isDragging}
      splitPosition={splitPosition}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      isGenerating={isGenerating}
      isDownloading={isDownloading}
      error={error}
      sections={sections}
      hasSections={hasSections}
      onGenerateReport={generateReport}
      onDownloadPdf={downloadPdf}
    />
  );
}
