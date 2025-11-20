import { prisma } from '@/backend/core/db/prisma';

/**
 * Helper function to get start and end of today in UTC.
 */
function getTodayUTCBounds() {
  const now = new Date();
  const startOfDay = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0),
  );
  const endOfDay = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999),
  );
  return { startOfDay, endOfDay };
}

/**
 * Get charts created by a user in the last 24 hours.
 * Returns count and timestamp of earliest chart.
 */
export async function getChartsByUserLast24Hours(userId: string): Promise<{
  count: number;
  firstGenerationAt: Date | null;
}> {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const charts = await prisma.chart.findMany({
    where: {
      userId,
      createdAt: {
        gte: twentyFourHoursAgo,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return {
    count: charts.length,
    firstGenerationAt: charts.length > 0 ? charts[0].createdAt : null,
  };
}

/**
 * Count charts created by a user today (UTC).
 * @deprecated Use getChartsByUserLast24Hours for 24-hour rolling window
 */
export async function countChartsByUserToday(userId: string): Promise<number> {
  const { startOfDay, endOfDay } = getTodayUTCBounds();

  return prisma.chart.count({
    where: {
      userId,
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });
}

/**
 * Get reports created by a user in the last 24 hours.
 * Returns count and timestamp of earliest report.
 */
export async function getReportsByUserLast24Hours(userId: string): Promise<{
  count: number;
  firstGenerationAt: Date | null;
}> {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const reports = await prisma.report.findMany({
    where: {
      userId,
      createdAt: {
        gte: twentyFourHoursAgo,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return {
    count: reports.length,
    firstGenerationAt: reports.length > 0 ? reports[0].createdAt : null,
  };
}

/**
 * Count reports created by a user today (UTC).
 * @deprecated Use getReportsByUserLast24Hours for 24-hour rolling window
 */
export async function countReportsByUserToday(userId: string): Promise<number> {
  const { startOfDay, endOfDay } = getTodayUTCBounds();

  return prisma.report.count({
    where: {
      userId,
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });
}

/**
 * Get messages sent by a user in the last 24 hours.
 * Returns count and timestamp of earliest message.
 */
export async function getMessagesByUserLast24Hours(userId: string): Promise<{
  count: number;
  firstGenerationAt: Date | null;
}> {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const messages = await prisma.interpretMessage.findMany({
    where: {
      userId,
      createdAt: {
        gte: twentyFourHoursAgo,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return {
    count: messages.length,
    firstGenerationAt: messages.length > 0 ? messages[0].createdAt : null,
  };
}

/**
 * Count AI interpreter messages sent by a user today (UTC).
 * @deprecated Use getMessagesByUserLast24Hours for 24-hour rolling window
 */
export async function countMessagesByUserToday(userId: string): Promise<number> {
  const { startOfDay, endOfDay } = getTodayUTCBounds();

  return prisma.interpretMessage.count({
    where: {
      userId,
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });
}
