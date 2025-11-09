'use client';

import { Box } from '@mui/material';
import { styles } from './data-section.styles';
import type { DataSectionProps } from './data-section.types';
import { AstroInterpreter } from '../astro-interpreter';

export function DataSectionView({
  chartData,
  isExpanded,
  isDragging,
  splitPosition,
}: DataSectionProps) {
  return (
    <Box sx={styles.container(isExpanded, isDragging, splitPosition)}>
      <Box sx={styles.content()}>
        {chartData ? <AstroInterpreter chartData={chartData} /> : null}
      </Box>
    </Box>
  );
}
