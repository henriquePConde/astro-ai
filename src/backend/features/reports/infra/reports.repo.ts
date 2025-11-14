import { prisma } from '@/backend/core/db/prisma';
import type { ReportContent } from '../domain/reports.entities';

export function makeReportsRepo() {
  return {
    async create(userId: string, personName: string, birthData: any, content: ReportContent) {
      return prisma.report.create({
        data: {
          userId,
          personName,
          birthData,
          content,
        },
      });
    },

    async findAllForUser(userId: string) {
      return prisma.report.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          personName: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    },

    async findById(id: string) {
      return prisma.report.findUnique({
        where: { id },
      });
    },

    async countByUserToday(userId: string): Promise<number> {
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
    },
  };
}
