'use client';

import { DataSectionView } from './data-section.view';
import type { DataSectionContainerProps, DataSectionTab } from './data-section.types';
import { useDataSectionTabs } from '@/features/home/hooks/use-data-section-tabs.state';
import { useGenerateBirthChartReport } from '@/features/home/hooks/use-generate-birth-chart-report.mutation';

export function DataSectionContainer({
  chartData,
  isExpanded,
  isDragging,
  splitPosition,
  birthData,
}: DataSectionContainerProps) {
  const { activeTab, setActiveTab } = useDataSectionTabs('ai');

  const { mutate, data: sections, isPending: isGenerating, error } = useGenerateBirthChartReport();

  const handleTabChange = (tab: DataSectionTab) => {
    setActiveTab(tab);
  };

  const handleGenerateReport = () => {
    if (!birthData || !chartData) return;
    mutate({ birthData, chartData });
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
      sections={sections ?? {}}
      onGenerateReport={handleGenerateReport}
    />
  );
}
