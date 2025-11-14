'use client';

import { ChartApplicationView } from './chart-application.view';
import { useChartApplicationLogic } from '../../hooks/use-chart-application-logic';
import type { ChartApplicationContainerProps } from './chart-application.types';

export function ChartApplicationContainer(props: ChartApplicationContainerProps) {
  const { handleDrag, handleDragStart, handleDragEnd, handleToggleExpand, handleNewChart } =
    useChartApplicationLogic({
      onDrag: props.onDrag,
      onDragStart: props.onDragStart,
      onDragEnd: props.onDragEnd,
      onToggleExpand: props.onToggleExpand,
      onNewChart: props.onNewChart,
    });

  return (
    <ChartApplicationView
      {...props}
      onDrag={handleDrag}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onToggleExpand={handleToggleExpand}
      onNewChart={handleNewChart}
    />
  );
}
