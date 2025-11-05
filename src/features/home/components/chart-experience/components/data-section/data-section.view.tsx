'use client';

import { Box, Typography } from '@mui/material';
import { styles } from './data-section.styles';
import type { DataSectionProps } from './data-section.types';

export function DataSectionView({
  chartData,
  isExpanded,
  isDragging,
  splitPosition,
  birthData,
}: DataSectionProps) {
  // TODO: Implement full DataSection with tabs and content
  // For now, this is a placeholder that matches the structure
  return (
    <Box sx={styles.container(isExpanded, isDragging, splitPosition)}>
      <Box sx={styles.content()}>
        <Typography sx={styles.placeholder()}>
          Data Section - Chart information and interpretations will appear here
        </Typography>
      </Box>
    </Box>
  );
}

