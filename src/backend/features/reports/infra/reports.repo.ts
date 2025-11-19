import { prisma } from '@/backend/core/db/prisma';
import type { ReportContent, ReportJob, ReportJobMeta } from '../domain/reports.entities';

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

    // === Long-running report jobs ===

    async createJob(userId: string, personName: string, birthData: any): Promise<ReportJob> {
      const totalSteps = 1 + 9; // 1 for prepare context, 9 sections

      const job = await prisma.reportJob.create({
        data: {
          userId,
          personName,
          birthData,
          status: 'pending',
          currentStep: 0,
          totalSteps,
          progress: 0,
          partialContent: {},
          meta: {},
        },
      });

      return job as unknown as ReportJob;
    },

    async getJob(id: string): Promise<ReportJob | null> {
      const job = await prisma.reportJob.findUnique({
        where: { id },
      });
      return job ? (job as unknown as ReportJob) : null;
    },

    async updateJob(
      id: string,
      data: Partial<{
        status: ReportJob['status'];
        currentStep: number;
        totalSteps: number;
        progress: number;
        errorMessage: string | null;
        partialContent: Partial<ReportContent> | null;
        meta: ReportJobMeta | null;
        reportId: string | null;
      }>,
    ): Promise<ReportJob> {
      const job = await prisma.reportJob.update({
        where: { id },
        // The ReportJob JSON fields (partialContent, meta) are stored as Prisma Json types.
        // We keep the domain-friendly shape here and let Prisma handle the conversion.
        // Casting avoids over-constraining the update payload.
        data: data as any,
      });
      return job as unknown as ReportJob;
    },
  };
}
