'use client';

import { useState } from 'react';
import { ChartApplicationView } from './chart-application.view';
import type { ChartData } from '../../services/chart.service';

export function ChartApplicationContainer({ data }: { data: ChartData }) {
  const [isExpanded, setExpanded] = useState(true);
  const [isDragging, setDragging] = useState(false);
  const [splitPosition, setSplit] = useState(50);

  return (
    <ChartApplicationView
      chartData={data}
      isExpanded={isExpanded}
      isDragging={isDragging}
      splitPosition={splitPosition}
      onToggleExpand={() => setExpanded((v) => !v)}
      onNewChart={() => window.location.assign('/chart')}
      onDragStart={() => setDragging(true)}
      onDrag={(e) => setSplit(Math.min(80, Math.max(20, (e.clientX / window.innerWidth) * 100)))}
      onDragEnd={() => setDragging(false)}
    />
  );
}
