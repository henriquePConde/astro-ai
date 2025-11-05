'use client';

import { Box, Button } from '@mui/material';
import type { ChartData } from '../../services/chart.service';
import AstroWheel from '@/shared/components/astro-chart/AstroWheel';
import { toWheelData } from '../../services/chart.mappers';

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
}: {
  chartData: ChartData;
  isExpanded: boolean;
  isDragging: boolean;
  splitPosition: number;
  onToggleExpand: () => void;
  onNewChart: () => void;
  onDragStart: () => void;
  onDrag: (e: React.MouseEvent) => void;
  onDragEnd: () => void;
}) {
  return (
    <Box sx={{ position: 'fixed', inset: 0, zIndex: 50, bgcolor: 'rgba(13,12,34,0.98)', pt: 8 }}>
      <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 1 }}>
        <Button size="small" variant="outlined" onClick={onToggleExpand}>
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
        <Button size="small" variant="outlined" onClick={onNewChart}>
          New Chart
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          height: isExpanded ? '100vh' : 'calc(100% - 2rem)',
          mt: isExpanded ? 0 : 2,
          mb: isExpanded ? 0 : 2,
          alignItems: 'flex-start',
          px: 4,
        }}
        onMouseMove={isExpanded ? onDrag : undefined}
        onMouseUp={isExpanded ? onDragEnd : undefined}
        onMouseLeave={isExpanded ? onDragEnd : undefined}
      >
        <Box
          sx={{
            flex: `0 0 ${splitPosition}%`,
            minWidth: 260,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AstroWheel data={toWheelData(chartData)} />
        </Box>

        {isExpanded && (
          <Box
            onMouseDown={onDragStart}
            sx={{
              width: 4,
              cursor: 'col-resize',
              bgcolor: 'rgba(255,255,255,0.2)',
              borderRadius: 2,
            }}
          />
        )}

        <Box
          sx={{
            flex: `1 1 ${100 - splitPosition}%`,
            minWidth: 260,
            bgcolor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 2,
            p: 2,
          }}
        >
          {/* DataSection parity placeholder */}
        </Box>
      </Box>
    </Box>
  );
}
