'use client';

import { Box, useTheme } from '@mui/material';
import { styles } from './draggable-resizer.styles';
import type { DraggableResizerProps } from './draggable-resizer.types';

export function DraggableResizerView({
  splitPosition,
  isDragging,
  onDragStart,
}: DraggableResizerProps) {
  const theme = useTheme();

  return (
    <Box sx={styles.container(splitPosition, isDragging)(theme)} onMouseDown={onDragStart}>
      <Box sx={styles.handle()(theme)} />
    </Box>
  );
}
