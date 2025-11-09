'use client';

import { Box } from '@mui/material';
import { styles } from './data-section.styles';
import type { DataSectionViewProps } from './data-section.types';
import { TabsSectionView } from './components/tabs-section/tabs-section.view';
import { SectionContentView } from './components/section-content/section-content.view';

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
  onGenerateReport,
}: DataSectionViewProps) {
  if (!chartData) return null;

  return (
    <Box sx={styles.container(isExpanded, isDragging, splitPosition)}>
      <TabsSectionView activeTab={activeTab} onTabChange={onTabChange} />

      <Box sx={styles.content()}>
        <SectionContentView
          activeTab={activeTab}
          chartData={chartData}
          birthData={birthData}
          isGenerating={isGenerating}
          error={error}
          sections={sections}
          onGenerateReport={onGenerateReport}
        />
      </Box>
    </Box>
  );
}
