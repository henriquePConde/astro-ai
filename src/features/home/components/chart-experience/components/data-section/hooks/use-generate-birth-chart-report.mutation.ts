'use client';

import { useMutation } from '@tanstack/react-query';
import {
  generateBirthChartReport,
  type GenerateBirthChartReportPayload,
  type BirthChartReportResponse,
} from '../../../../../services/birth-chart-report.service';

export function useGenerateBirthChartReport() {
  return useMutation<BirthChartReportResponse, unknown, GenerateBirthChartReportPayload>({
    mutationFn: generateBirthChartReport,
  });
}
