import { z } from 'zod';

export const dailyUsageDto = z.object({
  used: z.number().int().min(0),
  limit: z.number().int().min(1),
});

export type DailyUsageDto = z.infer<typeof dailyUsageDto>;
