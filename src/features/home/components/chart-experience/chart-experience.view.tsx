'use client';

import { Box } from '@mui/material';
import { ChartApplicationView } from './components/chart-application/chart-application.view';
import { defaultBirthData } from '../../constants/default-birth-data';
import { styles } from './chart-experience.styles';
import type { ChartExperienceProps } from './chart-experience.types';

export function ChartExperienceView({
  chart,
  layout,
  section,
  onNewChart,
  initialReport,
  initialMessages,
  chartId,
}: ChartExperienceProps) {
  const { chartData, transformedChartData, birthData, loading, error, handleFormSubmit } = chart;

  return (
    <Box sx={styles.root()}>
      <ChartApplicationView
        chartData={chartData}
        transformedChartData={transformedChartData}
        loading={loading}
        error={error}
        isExpanded={true}
        isDragging={layout.isDragging}
        splitPosition={layout.splitPosition}
        currentSection={section.currentSection}
        introFinished={section.introFinished}
        birthData={birthData ?? defaultBirthData}
        onFormSubmit={handleFormSubmit}
        onNewChart={onNewChart}
        onToggleExpand={() => {}}
        onDragStart={layout.handleDragStart}
        onDrag={layout.handleDrag}
        onDragEnd={layout.handleDragEnd}
        initialReport={initialReport}
        initialMessages={initialMessages}
        chartId={chartId}
      />
    </Box>
  );
}
