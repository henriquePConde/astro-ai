'use client';

import { ChartLayoutWrapperView } from '../chart-layout-wrapper/chart-layout-wrapper.view';
import { FormWrapperView } from '../form-wrapper/form-wrapper.view';
import { LoadingOrErrorView } from '../loading-or-error/loading-or-error.view';
import { ChartContentView } from '../chart-content/chart-content.view';
import { useChartApplicationLogic } from '../../hooks/use-chart-application-logic';
import type { ChartApplicationProps } from './chart-application.types';
import { ChartInteractionsProvider } from '../../context/chart-interactions.context';
import { ChartTooltipOverlay } from '../chart-tooltip/chart-tooltip.overlay';

export function ChartApplicationView({
  chartData,
  transformedChartData,
  loading,
  error,
  isExpanded,
  isDragging,
  splitPosition,
  currentSection,
  introFinished,
  birthData,
  onFormSubmit,
  onNewChart,
  onToggleExpand,
  onDragStart,
  onDrag,
  onDragEnd,
}: ChartApplicationProps) {
  const { handleDrag, handleDragStart, handleDragEnd, handleToggleExpand, handleNewChart } =
    useChartApplicationLogic({
      onDrag,
      onDragStart,
      onDragEnd,
      onToggleExpand,
      onNewChart,
    });

  return (
    <ChartInteractionsProvider>
      <ChartLayoutWrapperView
        currentSection={currentSection}
        introFinished={introFinished}
        isDragging={isDragging}
        chartData={chartData}
      >
        {!chartData ? (
          <FormWrapperView onFormSubmit={onFormSubmit} />
        ) : (
          <>
            <LoadingOrErrorView loading={loading} error={error} />
            <ChartContentView
              chartData={transformedChartData}
              isExpanded={isExpanded}
              isDragging={isDragging}
              splitPosition={splitPosition}
              birthData={birthData}
              onNewChart={handleNewChart}
              onToggleExpand={handleToggleExpand}
              onDrag={handleDrag}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          </>
        )}
      </ChartLayoutWrapperView>
      <ChartTooltipOverlay />
    </ChartInteractionsProvider>
  );
}
