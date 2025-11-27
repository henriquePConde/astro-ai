import { prisma } from '@/backend/core/db/prisma';
import type { ListChartsQuery } from '../http/charts.schemas';
import { matchBirthData } from './birth-data-matcher';

export function makeChartsRepo() {
  return {
    async findAllForUser(userId: string, filters: ListChartsQuery) {
      const { page, pageSize, search, sortBy, sortOrder } = filters;

      // Build where clause
      const where: any = {
        userId,
      };

      // Get all charts for the user first (we'll filter and sort in memory)
      // Prisma JSON field filtering/sorting is limited, so we fetch all and process
      const allCharts = await prisma.chart.findMany({
        where: {
          userId,
        },
      });

      // Filter by search if provided
      let filteredCharts = allCharts;
      if (search) {
        const searchLower = search.toLowerCase();
        filteredCharts = allCharts.filter((chart) => {
          const birthData = chart.birthData as any;
          const name = (birthData?.name || '').toLowerCase();
          return name.includes(searchLower);
        });
      }

      // Sort charts
      let sortedCharts = [...filteredCharts];
      if (sortBy === 'name') {
        sortedCharts.sort((a, b) => {
          const nameA = ((a.birthData as any)?.name || '').toLowerCase();
          const nameB = ((b.birthData as any)?.name || '').toLowerCase();
          return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });
      } else if (sortBy === 'birthdate') {
        sortedCharts.sort((a, b) => {
          const bdA = a.birthData as any;
          const bdB = b.birthData as any;
          // Compare year, month, day
          const dateA = new Date(bdA?.year || 0, (bdA?.month || 1) - 1, bdA?.day || 1);
          const dateB = new Date(bdB?.year || 0, (bdB?.month || 1) - 1, bdB?.day || 1);
          return sortOrder === 'asc'
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        });
      } else {
        // Sort by createdAt
        sortedCharts.sort((a, b) => {
          return sortOrder === 'asc'
            ? a.createdAt.getTime() - b.createdAt.getTime()
            : b.createdAt.getTime() - a.createdAt.getTime();
        });
      }

      // Get total count
      const total = sortedCharts.length;

      // Apply pagination
      const charts = sortedCharts.slice((page - 1) * pageSize, page * pageSize);

      return {
        items: sortedCharts,
        total,
        totalPages: Math.ceil(total / pageSize),
      };
    },

    async findById(id: string, userId: string) {
      const chart = await prisma.chart.findFirst({
        where: {
          id,
          userId,
        },
      });
      return chart;
    },

    async findLatestReportByBirthData(userId: string, birthData: any) {
      const reports = await prisma.report.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Find the first report that matches the birth data
      for (const report of reports) {
        if (matchBirthData(report.birthData as any, birthData)) {
          return report;
        }
      }

      return null;
    },

    async findMessagesByChartId(chartId: string, userId: string) {
      const messages = await prisma.interpretMessage.findMany({
        where: {
          chartId,
          userId,
        },
        orderBy: {
          createdAt: 'asc',
        },
        select: {
          id: true,
          message: true,
          role: true,
          createdAt: true,
        },
      });
      return messages;
    },

    async deleteById(id: string, userId: string) {
      // Use deleteMany with both id and userId to enforce ownership at the DB level.
      // The Chart -> InterpretMessage relation is configured with onDelete: Cascade,
      // so related interpreter messages for this chart will be removed automatically.
      await prisma.chart.deleteMany({
        where: {
          id,
          userId,
        },
      });
    },

    async updateCalculatedData(id: string, userId: string, calculatedData: any) {
      await prisma.chart.updateMany({
        where: {
          id,
          userId,
        },
        data: {
          calculatedData,
          calculatedAt: new Date(),
        },
      });
    },

    isCacheValid(chart: any, maxAgeMinutes: number = 60): boolean {
      if (!chart.calculatedData || !chart.calculatedAt) {
        return false;
      }

      const cacheAge = Date.now() - new Date(chart.calculatedAt).getTime();
      const maxAge = maxAgeMinutes * 60 * 1000; // Convert to milliseconds

      return cacheAge < maxAge;
    },
  };
}
