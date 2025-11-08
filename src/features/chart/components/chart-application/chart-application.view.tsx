'use client';

import { Box, Button } from '@mui/material';
import AstroWheel from '@/shared/components/astro-chart/AstroWheel';
import { toWheelData } from '../../services/chart.mappers';
import { ChartInteractionsSwitcher } from '../chart-interactions-switcher/chart-interactions-switcher';
import { styles } from './chart-application.styles';
import type { ChartApplicationViewProps } from './chart-application.types';

export function ChartApplicationView({
  chartData,
  isExpanded,
  isDragging,
  splitPosition,
  onToggleExpand,
  onNewChart,
  onDragStart,
  onDrag,
  onDragEnd,
}: ChartApplicationViewProps) {
  return (
    <Box sx={styles.root()}>
      {/* Top-right controls inside this chart area */}
      <Box sx={styles.controlsContainer()}>
        <ChartInteractionsSwitcher />
        <Button size="small" variant="outlined" onClick={onToggleExpand} sx={styles.expandButton()}>
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
        <Button size="small" variant="contained" onClick={onNewChart} sx={styles.newChartButton()}>
          New Chart
        </Button>
      </Box>

      {/* Main layout */}
      <Box
        sx={styles.mainLayout()}
        onMouseMove={isExpanded ? onDrag : undefined}
        onMouseUp={isExpanded ? onDragEnd : undefined}
        onMouseLeave={isExpanded ? onDragEnd : undefined}
      >
        {/* Chart side */}
        <Box sx={styles.chartSide(splitPosition)}>
          <AstroWheel data={toWheelData(chartData)} />
        </Box>

        {/* Drag handle */}
        {isExpanded && <Box onMouseDown={onDragStart} sx={styles.dragHandle()} />}

        {/* Right panel placeholder */}
        <Box sx={styles.rightPanel(splitPosition)}>
          DATA SECTION - CHART INFORMATION AND INTERPRETATIONS WILL APPEAR HERE
        </Box>
      </Box>
    </Box>
  );
}
