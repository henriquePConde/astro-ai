/**
 * Background job to pre-calculate and cache chart data
 * This helps prevent timeouts on chart detail pages
 */

import { prisma } from '@/backend/core/db/prisma';
import { calculateChart } from '@/backend/features/calculate';
import { toSimpleChartData } from '@/backend/features/charts/infra/chart-data-transformer';

interface CacheWarmingOptions {
  batchSize?: number;
  maxProcessingTime?: number; // in milliseconds
}

/**
 * Warms the cache for charts that don't have calculated data
 */
export async function warmChartCache(options: CacheWarmingOptions = {}) {
  const { batchSize = 10, maxProcessingTime = 45000 } = options; // 45 seconds max
  const startTime = Date.now();

  console.log('Starting chart cache warming...');

  try {
    // Find charts without cached data or with stale cache (older than 24 hours)
    const staleThreshold = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const chartsToProcess = await prisma.chart.findMany({
      where: {
        OR: [
          { calculatedData: null },
          { calculatedAt: null },
          { calculatedAt: { lt: staleThreshold } },
        ],
      },
      take: batchSize,
      orderBy: {
        createdAt: 'desc', // Process newest charts first
      },
    });

    console.log(`Found ${chartsToProcess.length} charts to process`);

    let processed = 0;
    let errors = 0;

    for (const chart of chartsToProcess) {
      // Check if we're running out of time
      if (Date.now() - startTime > maxProcessingTime) {
        console.log('Stopping due to time limit');
        break;
      }

      try {
        console.log(`Processing chart ${chart.id}...`);

        // Calculate chart data with timeout
        const calculationPromise = calculateChart(chart.birthData as any);
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Calculation timeout')), 10000);
        });

        const calculated = await Promise.race([calculationPromise, timeoutPromise]);
        const chartData = toSimpleChartData(calculated as any);

        // Update the cache
        await prisma.chart.update({
          where: { id: chart.id },
          data: {
            calculatedData: chartData,
            calculatedAt: new Date(),
          },
        });

        processed++;
        console.log(`Successfully cached chart ${chart.id}`);
      } catch (error) {
        errors++;
        console.error(`Failed to process chart ${chart.id}:`, error);

        // Continue with next chart
        continue;
      }
    }

    const duration = Date.now() - startTime;
    console.log(
      `Chart cache warming completed: ${processed} processed, ${errors} errors, ${duration}ms`,
    );

    return {
      processed,
      errors,
      duration,
      totalFound: chartsToProcess.length,
    };
  } catch (error) {
    console.error('Chart cache warming failed:', error);
    throw error;
  }
}

/**
 * Clears stale cache entries (older than specified days)
 */
export async function clearStaleCache(maxAgeDays: number = 7) {
  const threshold = new Date(Date.now() - maxAgeDays * 24 * 60 * 60 * 1000);

  const result = await prisma.chart.updateMany({
    where: {
      calculatedAt: {
        lt: threshold,
      },
    },
    data: {
      calculatedData: null,
      calculatedAt: null,
    },
  });

  console.log(`Cleared ${result.count} stale cache entries`);
  return result.count;
}
