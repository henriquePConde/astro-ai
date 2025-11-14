'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  generateBirthChartReport,
  type GenerateBirthChartReportPayload,
  type BirthChartReportResponse,
} from '../services/birth-chart-report.service';
import { reportsKeys } from '@/features/reports/services/reports.keys';

export function useGenerateBirthChartReport() {
  const queryClient = useQueryClient();

  return useMutation<BirthChartReportResponse, unknown, GenerateBirthChartReportPayload>({
    mutationFn: generateBirthChartReport,
    onSuccess: () => {
      // Invalidate daily usage query to refresh counts after report generation
      queryClient.invalidateQueries({ queryKey: reportsKeys.usage() });
    },
  });
}
