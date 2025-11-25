'use client';

import { useState } from 'react';
import { DataSectionView } from './data-section.view';
import type { DataSectionContainerProps } from './data-section.types';
import { DEFAULT_DATA_SECTION_TAB } from './data-section.constants';
import { useDataSectionTabs } from './hooks/use-data-section-tabs.state';
import { useBirthChartReportSections } from './hooks/use-birth-chart-report-sections.state';
import { useBirthChartReportActions } from './hooks/use-birth-chart-report-actions.state';
import { useErrorMessage } from './hooks/use-error-message.state';
import { useDataSectionTabsContext } from './context/data-section-tabs.context';

export function DataSectionContainer({
  chartData,
  isExpanded,
  isDragging,
  splitPosition,
  birthData,
  initialReport,
  initialMessages,
  chartId,
}: DataSectionContainerProps) {
  const [isChartExpanded, setIsChartExpanded] = useState(false);

  // Try to get tab state from context, fallback to local state if not available
  const tabsContext = useDataSectionTabsContext();
  const localTabs = useDataSectionTabs(DEFAULT_DATA_SECTION_TAB);
  const { activeTab, setActiveTab } = tabsContext || localTabs;

  const {
    generateReport,
    downloadPdf,
    isGenerating,
    isDownloading,
    reportData,
    generateError,
    downloadError,
    jobProgress,
  } = useBirthChartReportActions(birthData, chartData, initialReport);

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
      jobProgress={jobProgress}
      initialMessages={initialMessages}
      chartId={chartId}
      isChartExpanded={isChartExpanded}
      onExpandChart={() => setIsChartExpanded(true)}
      onCloseChart={() => setIsChartExpanded(false)}
    />
  );
}
