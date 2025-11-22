'use client';

import { Box, CircularProgress, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { AppHeaderContainer } from '@/shared/components/app-header/app-header.container';
import { GeocentricSystem } from '@/shared/components/solar-system/geocentric-system';
import { ChartExperienceContainer } from '@/features/home/components/chart-experience/chart-experience.container';
import { ChartDetailPageView } from './chart-detail-page.view';
import type { ChartDetailResponse } from '@/features/charts/services/charts.service';
import { transformApiChartDataToChartData } from '@/features/home/services/chart-data.mapper';
import type { ChartData } from '@/features/home/types/chart.types';

/**
 * Charts detail page shell.
 *
 * - Owns the layout shell (header + solar system background + chart experience slot)
 * - Adapts persisted chart detail data into the shared ChartExperienceContainer
 * - Keeps behavior consistent with the home page chart experience without duplicating its internals.
 */
const CHARTS_DETAIL_SECTION_CONFIG = {
  currentSection: 2,
  introFinished: true,
} as const;

export interface ChartDetailPageContainerProps {
  chart: ChartDetailResponse | undefined;
  isLoading: boolean;
  error: Error | null;
}

export function ChartDetailPageContainer({
  chart,
  isLoading,
  error,
}: ChartDetailPageContainerProps) {
  const router = useRouter();

  // Transform chart data if available
  let transformedChartData: ChartData | null = null;
  let transformError: Error | null = null;
  if (chart?.chartData) {
    try {
      transformedChartData = transformApiChartDataToChartData(chart.chartData);
    } catch (err) {
      const normalizedError =
        err instanceof Error ? err : new Error('Failed to transform chart data');
      transformError = normalizedError;
      console.error('Failed to transform chart data:', normalizedError);
    }
  }

  // Convert messages to chat format, preserving role information so the AI interpreter
  // can reconstruct the conversation (both user prompts and assistant replies).
  // Transform messages from API format { id, role, message, createdAt } to frontend format { role, content }
  const initialMessages: Array<{ role: 'user' | 'assistant'; content: string }> =
    chart?.messages?.map((msg) => ({
      role: msg.role,
      content: msg.message,
    })) ?? [];

  const handleNewChartFromDetail = () => {
    // When viewing a saved chart, \"New chart\" takes the user back to the main chart experience.
    router.push('/');
  };

  // Handle loading and error states while maintaining layout
  let chartExperienceContent: React.ReactNode = null;

  if (isLoading) {
    chartExperienceContent = (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
      >
        <CircularProgress />
      </Box>
    );
  } else if (error) {
    chartExperienceContent = (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          p: 3,
        }}
      >
        <Alert severity="error">Failed to load chart: {error.message}</Alert>
      </Box>
    );
  } else if (transformError) {
    chartExperienceContent = (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          p: 3,
        }}
      >
        <Alert severity="error">Failed to process chart data.</Alert>
      </Box>
    );
  } else if (!chart) {
    chartExperienceContent = (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          p: 3,
        }}
      >
        <Alert severity="info">Chart not found</Alert>
      </Box>
    );
  } else {
    chartExperienceContent = (
      <ChartExperienceContainer
        currentSection={CHARTS_DETAIL_SECTION_CONFIG.currentSection}
        introFinished={CHARTS_DETAIL_SECTION_CONFIG.introFinished}
        onNewChart={handleNewChartFromDetail}
        initialChartData={transformedChartData}
        initialBirthData={chart.birthData}
        initialReport={
          chart.latestReport
            ? {
                id: chart.latestReport.id,
                content: chart.latestReport.content,
                createdAt: chart.latestReport.createdAt,
              }
            : undefined
        }
        initialMessages={initialMessages}
        chartId={chart.id}
      />
    );
  }

  return (
    <ChartDetailPageView
      headerContent={<AppHeaderContainer />}
      solarSystemContent={<GeocentricSystem onIntroEnd={() => {}} />}
      chartExperienceContent={chartExperienceContent}
    />
  );
}
