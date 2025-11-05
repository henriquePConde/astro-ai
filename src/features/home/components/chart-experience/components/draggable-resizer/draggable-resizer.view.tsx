'use client';

import { Box } from '@mui/material';
import { styles } from './draggable-resizer.styles';
import type { DraggableResizerProps } from './draggable-resizer.types';

export function DraggableResizerView({
  splitPosition,
  isDragging,
  onDragStart,
}: DraggableResizerProps) {
  return (
    <Box
      sx={styles.container(splitPosition, isDragging)}
      onMouseDown={onDragStart}
    >
      <Box sx={styles.handle()} />
    </Box>
  );
}

