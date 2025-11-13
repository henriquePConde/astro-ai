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
 * Count charts created by a user today (UTC).
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
 * Count reports created by a user today (UTC).
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
 * Count AI interpreter messages sent by a user today (UTC).
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
