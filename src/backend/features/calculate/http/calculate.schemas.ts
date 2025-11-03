import { z } from 'zod';

export const birthDataSchema = z.object({
  name: z.string().min(1),
  year: z.number().int().min(1900).max(2100),
  month: z.number().int().min(1).max(12),
  day: z.number().int().min(1).max(31),
  hour: z.number().int().min(0).max(23),
  minute: z.number().int().min(0).max(59),
  city: z.string().optional(),
  nation: z.string().optional(),
});

export const planetDto = z.object({
  name: z.string(),
  symbol: z.string(),
  degree: z.number(),
  sign: z.number(),
  color: z.string(),
});

export const houseDto = z.object({
  firstHouse: z.number(),
  secondHouse: z.number(),
  thirdHouse: z.number(),
  fourthHouse: z.number(),
  fifthHouse: z.number(),
  sixthHouse: z.number(),
  seventhHouse: z.number(),
  eighthHouse: z.number(),
  ninthHouse: z.number(),
  tenthHouse: z.number(),
  eleventhHouse: z.number(),
  twelfthHouse: z.number(),
});

export const aspectDto = z.object({
  p1_name: z.string(),
  p1_abs_pos: z.number(),
  p2_name: z.string(),
  p2_abs_pos: z.number(),
  type: z.enum(['conjunction', 'opposition', 'trine', 'square', 'sextile']),
  exactAngle: z.number(),
  actualAngle: z.number(),
});

export const calculateChartDto = z.object({
  success: z.literal(true),
  data: z.object({
    planets: z.array(planetDto),
    houses: houseDto,
    aspects: z.array(aspectDto),
  }),
});

export const solarReturnBody = z.object({
  birthData: birthDataSchema,
  targetYear: z.number().int().min(1900).max(2100),
  locationCity: z.string().optional(),
  locationNation: z.string().optional(),
});

export type BirthDataInput = z.infer<typeof birthDataSchema>;
export type CalculateChartResponse = z.infer<typeof calculateChartDto>;
export type SolarReturnInput = z.infer<typeof solarReturnBody>;
