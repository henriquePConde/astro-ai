'use client';

import { useState, useRef, useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { DataSectionView } from './data-section.view';
import type { DataSectionContainerProps } from './data-section.types';
import { DEFAULT_DATA_SECTION_TAB, DATA_SECTION_TABS } from './data-section.constants';
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
  const contentScrollRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isDesktopLayout = useMediaQuery(theme.breakpoints.up('lg'));
  const previousTabRef = useRef<string | null>(null);

  // Try to get tab state from context, fallback to local state if not available
  const tabsContext = useDataSectionTabsContext();
  const localTabs = useDataSectionTabs(DEFAULT_DATA_SECTION_TAB);
  const { activeTab, setActiveTab } = tabsContext || localTabs;

  // Scroll to top when chart tab is activated on mobile
  useEffect(() => {
    const wasTabJustActivated =
      activeTab === DATA_SECTION_TABS.CHART && previousTabRef.current !== DATA_SECTION_TABS.CHART;

    if (wasTabJustActivated && !isDesktopLayout && contentScrollRef.current) {
      // Use multiple attempts to ensure DOM is ready and scroll works
      const scrollToTop = () => {
        if (contentScrollRef.current) {
          contentScrollRef.current.scrollTop = 0;
        }
      };

      // Immediate scroll
      scrollToTop();

      // Use requestAnimationFrame for layout updates
      let frameId1: number | null = null;
      let frameId2: number | null = null;
      frameId1 = requestAnimationFrame(() => {
        scrollToTop();
        frameId2 = requestAnimationFrame(() => {
          scrollToTop();
        });
      });

      // Fallback with small delay
      const timeoutId = setTimeout(scrollToTop, 100);

      return () => {
        if (frameId1 !== null) cancelAnimationFrame(frameId1);
        if (frameId2 !== null) cancelAnimationFrame(frameId2);
        clearTimeout(timeoutId);
      };
    }

    previousTabRef.current = activeTab;
  }, [activeTab, isDesktopLayout]);

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
      contentScrollRef={contentScrollRef}
    />
  );
}
