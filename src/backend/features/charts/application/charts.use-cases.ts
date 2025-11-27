import { makeChartsRepo } from '../infra/charts.repo';
import { chartsListDto, chartDetailDto, chartListItemDto } from '../http/charts.schemas';
import type { ListChartsQuery } from '../http/charts.schemas';
import { notFound } from '@/backend/core/errors/http-errors';
import { calculateChart } from '@/backend/features/calculate';
import { toSimpleChartData } from '@/backend/features/reports/infra/report-data-transform.service';

export async function listCharts(userId: string, filters: ListChartsQuery) {
  const repo = makeChartsRepo();
  const { items, total, totalPages } = await repo.findAllForUser(userId, filters);

  // Transform to DTOs
  const chartItems = items.map((chart) => {
    const birthData = chart.birthData as any;
    return chartListItemDto.parse({
      id: chart.id,
      name: birthData?.name || 'Unknown',
      birthdate: {
        year: birthData?.year || 0,
        month: birthData?.month || 1,
        day: birthData?.day || 1,
      },
      createdAt: chart.createdAt,
      birthData: birthData,
    });
  });

  return chartsListDto.parse({
    items: chartItems,
    pagination: {
      page: filters.page,
      pageSize: filters.pageSize,
      total,
      totalPages,
    },
  });
}

export async function getChartById(id: string, userId: string) {
  const repo = makeChartsRepo();
  const chart = await repo.findById(id, userId);

  if (!chart) {
    throw notFound('Chart not found');
  }

  // Get latest report for this chart
  const latestReport = await repo.findLatestReportByBirthData(userId, chart.birthData);

  // Get messages for this chart
  const messages = await repo.findMessagesByChartId(id, userId);

  // Calculate chart data with caching and timeout protection
  let chartData = undefined;

  // Check if we have valid cached data
  if (repo.isCacheValid(chart, 60)) {
    // Cache for 60 minutes
    console.log('Using cached chart data for chart:', id);
    chartData = chart.calculatedData;
  } else {
    // Need to calculate fresh data
    try {
      console.log('Calculating fresh chart data for chart:', id);

      // Add timeout wrapper to prevent Vercel timeout
      const calculationPromise = calculateChart(chart.birthData as any);
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Chart calculation timeout')), 7000); // 7 second timeout
      });

      const calculated = await Promise.race([calculationPromise, timeoutPromise]);
      // Convert full calculation result into the same "simple" chart data
      // shape that the /api/calculate endpoint returns for the home page.
      chartData = toSimpleChartData(calculated as any);

      // Cache the calculated data for future requests
      try {
        await repo.updateCalculatedData(id, userId, chartData);
        console.log('Cached chart data for future requests');
      } catch (cacheError) {
        console.warn('Failed to cache chart data:', cacheError);
        // Continue even if caching fails
      }
    } catch (error) {
      // If calculation fails, continue without chart data
      console.error('Failed to calculate chart data:', error);

      // If we have old cached data, use it as fallback
      if (chart.calculatedData) {
        console.log('Using stale cached data as fallback');
        chartData = chart.calculatedData;
      }
      // For timeout errors, we'll still return the chart without calculated data
      // The frontend can handle missing chart data gracefully
    }
  }

  return chartDetailDto.parse({
    id: chart.id,
    birthData: chart.birthData as any,
    createdAt: chart.createdAt,
    chartData,
    latestReport: latestReport
      ? {
          id: latestReport.id,
          content: latestReport.content as Record<string, string>,
          createdAt: latestReport.createdAt,
        }
      : null,
    messages: messages.map((msg) => ({
      id: msg.id,
      // Fallback to 'user' for older records that may not have a role yet
      role: (msg as any).role ?? 'user',
      message: msg.message,
      createdAt: msg.createdAt,
    })),
  });
}

export async function deleteChart(id: string, userId: string) {
  const repo = makeChartsRepo();
  const chart = await repo.findById(id, userId);

  if (!chart) {
    throw notFound('Chart not found');
  }

  await repo.deleteById(id, userId);
}
