import { z } from 'zod';
import { birthDataSchema } from '@/backend/features/calculate/http/calculate.schemas';

export const listChartsQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
  sortBy: z.enum(['name', 'birthdate', 'createdAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const chartListItemDto = z.object({
  id: z.string().uuid(),
  name: z.string(),
  birthdate: z.object({
    year: z.number(),
    month: z.number(),
    day: z.number(),
  }),
  createdAt: z.coerce.date(),
  birthData: birthDataSchema,
});

export const chartsListDto = z.object({
  items: z.array(chartListItemDto),
  pagination: z.object({
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
  }),
});

export const chartDetailDto = z.object({
  id: z.string().uuid(),
  birthData: birthDataSchema,
  createdAt: z.coerce.date(),
  chartData: z.any().optional(),
  latestReport: z
    .object({
      id: z.string().uuid(),
      content: z.record(z.string()),
      createdAt: z.coerce.date(),
    })
    .nullable()
    .optional(),
  messages: z
    .array(
      z.object({
        id: z.string().uuid(),
        role: z.enum(['user', 'assistant']),
        message: z.string(),
        createdAt: z.coerce.date(),
      }),
    )
    .optional(),
});

export type ListChartsQuery = z.infer<typeof listChartsQuery>;
export type ChartListItemDto = z.infer<typeof chartListItemDto>;
export type ChartsListDto = z.infer<typeof chartsListDto>;
export type ChartDetailDto = z.infer<typeof chartDetailDto>;
