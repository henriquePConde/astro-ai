import { client } from '@/shared/services/http/client';
import { z } from 'zod';

export const ReportSummaryDto = z.object({
  id: z.string(),
  createdAt: z.string().optional(),
  title: z.string().optional(),
});

export const ReportDetailDto = z.object({
  id: z.string(),
  content: z.record(z.string(), z.any()).optional(),
});

export type ReportSummary = z.infer<typeof ReportSummaryDto>;
export type ReportDetail = z.infer<typeof ReportDetailDto>;

export async function listReports() {
  const res = await client.get('/api/reports');
  return z.array(ReportSummaryDto).parse(res.data);
}

export async function getReport(id: string) {
  const res = await client.get(`/api/reports/${id}`);
  return ReportDetailDto.parse(res.data);
}

export async function createReport(payload: {
  name: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  city?: string;
  nation?: string;
}) {
  const res = await client.post('/api/reports', payload);
  return ReportDetailDto.parse(res.data);
}

export type DailyUsage = {
  charts: { used: number; limit: number };
  reports: { used: number; limit: number };
  messages: { used: number; limit: number };
};

export async function getDailyUsage(): Promise<DailyUsage> {
  const res = await client.get('/api/reports/daily-usage');
  return res.data as DailyUsage;
}
