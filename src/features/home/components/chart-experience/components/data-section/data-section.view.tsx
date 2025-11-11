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
  error,
  sections,
  hasSections,
  onGenerateReport,
  onDownloadPdf,
}: DataSectionViewProps) {
  const theme = useTheme();
  if (!chartData) return null;

  return (
    <Box sx={styles.container(isExpanded, isDragging, splitPosition)(theme)}>
      <TabsSectionContainer activeTab={activeTab} onTabChange={onTabChange} />

      <Box sx={styles.content()(theme)}>
        {activeTab === DATA_SECTION_TABS.AI && <AstroInterpreter chartData={chartData} />}

        {activeTab === DATA_SECTION_TABS.REPORT && (
          <BirthChartReportContainer
            birthData={birthData}
            isGenerating={isGenerating}
            error={error}
            sections={sections}
            hasSections={hasSections}
            onGenerate={onGenerateReport}
            onDownloadPdf={onDownloadPdf}
          />
        )}
      </Box>
    </Box>
  );
}
