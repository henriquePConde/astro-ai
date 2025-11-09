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
 * Map front-end birthData to the body expected by /api/reports.
 *
 * Backend /api/reports POST:
 *  - parses with generateReportBody
 *  - does:
 *      const input = generateReportBody.parse(body);
 *      const { name, ...birthData } = input;
 *      const report = await generateReport(user.id, { ...birthData, name }, name);
 *
 * So we must send:
 *  {
 *    name: string;
 *    ...birthDataFields
 *  }
 */
function toBackendBody({ birthData }: GenerateBirthChartReportPayload) {
  if (!birthData || !birthData.name) {
    throw new Error('Birth data with a name is required to generate a report.');
  }

  const { name, ...rest } = birthData;

  return {
    name,
    ...rest,
    // chartData can be added here when the backend schema supports it:
    // chartData,
  };
}

export async function generateBirthChartReport(
  payload: GenerateBirthChartReportPayload,
): Promise<BirthChartReportSections> {
  const body = toBackendBody(payload);

  // ✅ Hit the API route, not the page route
  const response = await client.post('/api/reports', body);

  const data = response.data;

  // Guard: make sure we didn't accidentally get HTML again
  if (typeof data !== 'object' || data === null) {
    throw new Error('Unexpected response from /api/reports');
  }

  // Backend likely returns a report object:
  // { id, name, content: { sectionKey: text, ... }, ... }
  const sections = (data as any).content ?? data;

  return BirthChartReportSectionsSchema.parse(sections);
}
