'use client';

import { Box, useTheme } from '@mui/material';
import { ControlButtonsContainer } from '../control-buttons/control-buttons.container';
import { DraggableResizerView } from '../draggable-resizer/draggable-resizer.view';
import { ChartSectionContainer } from '../chart-section/chart-section.container';
import { DataSectionContainer } from '../data-section/data-section.container';
import { ChartInteractionsSwitcher } from '../chart-interactions-switcher/chart-interactions-switcher';
import { styles } from './chart-content.styles';
import type { ChartContentProps } from './chart-content.types';

export function ChartContentView({
  chartData,
  isExpanded,
  isDragging,
  splitPosition,
  birthData,
  onNewChart,
  onToggleExpand,
  onDrag,
  onDragStart,
  onDragEnd,
  initialReport,
  initialMessages,
  chartId,
}: ChartContentProps) {
  const theme = useTheme();
  if (!chartData) return null;

  return (
    <Box sx={styles.wrapper()(theme)}>
      {/* Header row: left = interactions switch, right = control buttons */}
      <Box sx={styles.header()(theme)}>
        <ChartInteractionsSwitcher />
        <ControlButtonsContainer onNewChart={onNewChart} />
      </Box>

      {/* Main layout: chart / resizer / data section */}
      <Box
        sx={styles.container(isExpanded, isDragging)(theme)}
        onMouseMove={isExpanded ? onDrag : undefined}
        onMouseUp={isExpanded ? onDragEnd : undefined}
        onMouseLeave={isExpanded ? onDragEnd : undefined}
      >
        <ChartSectionContainer
          chartData={chartData}
          birthData={birthData}
          isExpanded={isExpanded}
          isDragging={isDragging}
          splitPosition={splitPosition}
        />

        {isExpanded && (
          <DraggableResizerView
            splitPosition={splitPosition}
            isDragging={isDragging}
            onDragStart={onDragStart}
          />
        )}

        <DataSectionContainer
          chartData={chartData}
          isExpanded={isExpanded}
          isDragging={isDragging}
          splitPosition={splitPosition}
          birthData={birthData}
          initialReport={initialReport}
          initialMessages={initialMessages}
          chartId={chartId}
        />
      </Box>
    </Box>
  );
}
