'use client';

import { useMediaQuery, useTheme } from '@mui/material';
import { ChartLayoutWrapperView } from '../chart-layout-wrapper/chart-layout-wrapper.view';
import { FormWrapperView } from '../form-wrapper/form-wrapper.view';
import { LoadingOrErrorView } from '../loading-or-error/loading-or-error.view';
import { ChartContentView } from '../chart-content/chart-content.view';
import type { ChartApplicationViewProps } from './chart-application.types';
import { ChartInteractionsProvider } from '../../context/chart-interactions.context';
import { ChartTooltipOverlayContainer as ChartTooltipOverlay } from '../chart-tooltip/chart-tooltip.container';
import { DataSectionTabsProvider } from '../data-section/context/data-section-tabs.context';
import { useDataSectionTabs } from '../data-section/hooks/use-data-section-tabs.state';
import {
  DATA_SECTION_TABS,
  DEFAULT_DATA_SECTION_TAB,
} from '../data-section/data-section.constants';

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
  newChartLoading = false,
  onToggleExpand,
  onDragStart,
  onDrag,
  onDragEnd,
  initialReport,
  initialMessages,
  chartId,
}: ChartApplicationViewProps) {
  const theme = useTheme();
  const isDesktopLayout = useMediaQuery(theme.breakpoints.up('lg'));
  const initialTab = isDesktopLayout ? DEFAULT_DATA_SECTION_TAB : DATA_SECTION_TABS.CHART;
  const { activeTab, setActiveTab } = useDataSectionTabs(initialTab);

  return (
    <DataSectionTabsProvider activeTab={activeTab} setActiveTab={setActiveTab}>
      <ChartInteractionsProvider chartData={transformedChartData}>
        <ChartLayoutWrapperView
          currentSection={currentSection}
          introFinished={introFinished}
          isDragging={isDragging}
          chartData={transformedChartData ?? chartData}
        >
          {!transformedChartData ? (
            <FormWrapperView onFormSubmit={onFormSubmit} isLoading={loading} />
          ) : (
            <>
              <LoadingOrErrorView loading={loading} error={error} />
              <ChartContentView
                chartData={transformedChartData}
                isExpanded={isExpanded}
                isDragging={isDragging}
                splitPosition={splitPosition}
                birthData={birthData}
                onNewChart={onNewChart}
                newChartLoading={newChartLoading}
                onToggleExpand={onToggleExpand}
                onDrag={onDrag}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                initialReport={initialReport}
                initialMessages={initialMessages}
                chartId={chartId}
              />
            </>
          )}
        </ChartLayoutWrapperView>
        <ChartTooltipOverlay />
      </ChartInteractionsProvider>
    </DataSectionTabsProvider>
  );
}
