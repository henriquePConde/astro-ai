import { z } from 'zod';
import { client } from '@/shared/services/http/client';
import {
  chartsListDto,
  chartDetailDto,
  listChartsQuery,
} from '@/backend/features/charts/http/charts.schemas';

export type ChartsListFilters = z.infer<typeof listChartsQuery>;
export type ChartsListResponse = z.infer<typeof chartsListDto>;
export type ChartDetailResponse = z.infer<typeof chartDetailDto>;

export async function listCharts(filters: ChartsListFilters): Promise<ChartsListResponse> {
  const params = new URLSearchParams();
  params.set('page', String(filters.page));
  params.set('pageSize', String(filters.pageSize));
  if (filters.search) {
    params.set('search', filters.search);
  }
  params.set('sortBy', filters.sortBy);
  params.set('sortOrder', filters.sortOrder);

  const res = await client.get(`/api/charts?${params.toString()}`);
  return chartsListDto.parse(res.data);
}

export async function getChartById(id: string): Promise<ChartDetailResponse> {
  const res = await client.get(`/api/charts/${id}`);
  return chartDetailDto.parse(res.data);
}

export async function deleteChartById(id: string): Promise<void> {
  await client.delete(`/api/charts/${id}`);
}
