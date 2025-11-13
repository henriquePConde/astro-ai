import { z } from 'zod';

const usageInfoDto = z.object({
  used: z.number().int().min(0),
  limit: z.number().int().min(1),
});

export const dailyUsageDto = z.object({
  charts: usageInfoDto,
  reports: usageInfoDto,
  messages: usageInfoDto,
});

export type DailyUsageDto = z.infer<typeof dailyUsageDto>;
