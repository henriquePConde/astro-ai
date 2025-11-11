'use client';

import { Box, useTheme } from '@mui/material';
import { styles } from './data-section.styles';
import { AstroInterpreter } from '../astro-interpreter';
import { BirthChartReportView } from './components/birth-chart-report/birth-chart-report.view';
import { TabsSectionView } from './components/tabs-section/tabs-section.view';
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
      <TabsSectionView activeTab={activeTab} onTabChange={onTabChange} />

      <Box sx={styles.content()(theme)}>
        {activeTab === 'ai' && <AstroInterpreter chartData={chartData} />}

        {activeTab === 'report' && (
          <BirthChartReportView
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
