import { prisma } from '@/backend/core/db/prisma';

/**
 * Count reports created by a user today (UTC).
 */
export async function countReportsByUserToday(userId: string): Promise<number> {
  const now = new Date();
  const startOfDay = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0),
  );
  const endOfDay = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999),
  );

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
