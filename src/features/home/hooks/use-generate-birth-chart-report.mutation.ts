'use client';

import { useMutation } from '@tanstack/react-query';
import {
  generateBirthChartReport,
  type GenerateBirthChartReportPayload,
  type BirthChartReportSections,
} from '@/features/home/services/birth-chart-report.service';

export function useGenerateBirthChartReport() {
  return useMutation<BirthChartReportSections, unknown, GenerateBirthChartReportPayload>({
    mutationFn: generateBirthChartReport,
  });
}
