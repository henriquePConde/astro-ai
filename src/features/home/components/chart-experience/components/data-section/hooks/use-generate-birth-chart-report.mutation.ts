'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { GenerateBirthChartReportPayload } from '../../../../../services/birth-chart-report.service';
import { reportsKeys } from '@/features/reports/services/reports.keys';
import { createReportJob, type ReportJob } from '@/features/reports/services/reports.service';

export function useGenerateBirthChartReport() {
  const queryClient = useQueryClient();

  return useMutation<ReportJob, unknown, GenerateBirthChartReportPayload>({
    mutationFn: async (payload) => {
      const { birthData } = payload;

      if (!birthData || !birthData.name) {
        throw new Error('Birth data with a name is required to generate a report.');
      }

      return createReportJob({
        name: birthData.name,
        year: birthData.year,
        month: birthData.month,
        day: birthData.day,
        hour: birthData.hour,
        minute: birthData.minute,
        city: birthData.city,
        nation: birthData.nation,
      });
    },
    onSuccess: () => {
      // Invalidate daily usage query to refresh counts after report generation
      queryClient.invalidateQueries({ queryKey: reportsKeys.usage() });
    },
  });
}
