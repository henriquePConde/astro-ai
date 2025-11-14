import { z } from 'zod';
import { birthDataSchema } from '@/backend/features/calculate/http/calculate.schemas';

export const generateReportBody = birthDataSchema;

export const reportContentDto = z.object({
  introduction: z.string(),
  personalityAndIdentity: z.string(),
  emotionalNeedsAndSecurity: z.string(),
  communicationAndThinking: z.string(),
  loveAndRelationships: z.string(),
  driveAndAmbition: z.string(),
  growthAndChallenges: z.string(),
  transformationAndHealing: z.string(),
  lifeThemesAndGuidance: z.string(),
});

export const reportDto = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  personName: z.string(),
  birthData: z.any(),
  content: reportContentDto,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const reportListItemDto = z.object({
  id: z.string().uuid(),
  personName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const reportsListDto = z.array(reportListItemDto);

export const dailyUsageDto = z.object({
  used: z.number().int().min(0),
  limit: z.number().int().min(1),
});

export type GenerateReportBody = z.infer<typeof generateReportBody>;
export type ReportDto = z.infer<typeof reportDto>;
export type ReportListItemDto = z.infer<typeof reportListItemDto>;
export type DailyUsageDto = z.infer<typeof dailyUsageDto>;
