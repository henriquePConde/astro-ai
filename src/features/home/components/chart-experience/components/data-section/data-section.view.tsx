'use client';

import { Box, useTheme } from '@mui/material';
import { styles } from './data-section.styles';
import { AstroInterpreter } from '../astro-interpreter';
import { BirthChartReportContainer } from './components/birth-chart-report/birth-chart-report.container';
import { TabsSectionContainer } from './components/tabs-section/tabs-section.container';
import { DATA_SECTION_TABS } from './data-section.constants';
import type { DataSectionViewProps } from './data-section.types';

export function DataSectionView({
  chartData,
  birthData,
  isExpanded,
  isDragging,
  splitPosition,
  activeTab,
  onTabChange,
  isGenerating,
  isDownloading,
  error,
  sections,
  hasSections,
  onGenerateReport,
  onDownloadPdf,
  jobProgress,
  initialMessages,
  chartId,
}: DataSectionViewProps) {
  const theme = useTheme();
  if (!chartData) return null;

  return (
    <Box sx={styles.container(isExpanded, isDragging, splitPosition)(theme)}>
      <TabsSectionContainer activeTab={activeTab} onTabChange={onTabChange} />

      <Box sx={styles.content()(theme)}>
        <Box
          role="tabpanel"
          aria-hidden={activeTab !== DATA_SECTION_TABS.AI}
          sx={styles.tabPanel(activeTab === DATA_SECTION_TABS.AI)(theme)}
        >
          <AstroInterpreter
            chartData={chartData}
            initialMessages={initialMessages}
            chartId={chartId}
            key={
              birthData
                ? `${birthData.year}-${birthData.month}-${birthData.day}-${birthData.hour}-${birthData.minute}-${birthData.city}-${birthData.nation}`
                : 'no-birth'
            }
          />
        </Box>

        <Box
          role="tabpanel"
          aria-hidden={activeTab !== DATA_SECTION_TABS.REPORT}
          sx={styles.tabPanel(activeTab === DATA_SECTION_TABS.REPORT)(theme)}
        >
          <BirthChartReportContainer
            birthData={birthData}
            isGenerating={isGenerating}
            isDownloading={isDownloading}
            error={error}
            sections={sections}
            hasSections={hasSections}
            onGenerate={onGenerateReport}
            onDownloadPdf={onDownloadPdf}
            jobProgress={jobProgress}
            onGoToAI={() => onTabChange(DATA_SECTION_TABS.AI)}
          />
        </Box>
      </Box>
    </Box>
  );
}
