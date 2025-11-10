import { z } from 'zod';
import { client } from '@/shared/services/http/client';
import type { BirthChartData } from '../types/chart.types';

export const BirthChartReportSectionsSchema = z.record(z.string());

export type BirthChartReportSections = z.infer<typeof BirthChartReportSectionsSchema>;

export interface GenerateBirthChartReportPayload {
  birthData: BirthChartData;
  chartData?: any; // optional: include if/when backend uses it
}

/**
 * Backend /api/reports POST:
 *  - parses with generateReportBody (BirthData)
 *  - generateReport(user.id, birthData, name)
 *  - returns reportDto:
 *      {
 *        id, userId, personName,
 *        birthData,
 *        content: { ...sections },
 *        createdAt, updatedAt
 *      }
 */

const BirthChartReportResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  personName: z.string(),
  birthData: z.any(),
  content: BirthChartReportSectionsSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type BirthChartReportResponse = z.infer<typeof BirthChartReportResponseSchema>;

function toBackendBody({ birthData }: GenerateBirthChartReportPayload) {
  if (!birthData || !birthData.name) {
    throw new Error('Birth data with a name is required to generate a report.');
  }

  // generateReportBody expects the BirthData shape
  return {
    ...birthData,
  };
}

export async function generateBirthChartReport(
  payload: GenerateBirthChartReportPayload,
): Promise<BirthChartReportResponse> {
  const body = toBackendBody(payload);

  const response = await client.post('/api/reports', body);

  const data = response.data;

  if (typeof data !== 'object' || data === null) {
    throw new Error('Unexpected response from /api/reports');
  }

  return BirthChartReportResponseSchema.parse(data);
}
