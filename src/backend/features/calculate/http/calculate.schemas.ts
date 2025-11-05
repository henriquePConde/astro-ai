// astro-ai-fullstack/src/backend/features/calculate/http/calculate.schemas.ts
import { z } from 'zod';

const finite = () => z.number().finite();

export const birthDataSchema = z.object({
  name: z.string().min(1).transform((s) => s.trim()),
  year: z.coerce.number().int().min(1900).max(2100),
  month: z.coerce.number().int().min(1).max(12),
  day: z.coerce.number().int().min(1).max(31),
  hour: z.coerce.number().int().min(0).max(23),
  minute: z.coerce.number().int().min(0).max(59),
  city: z.string().optional(),
  nation: z.string().optional(),
});

export const planetDto = z.object({
  name: z.string(),
  symbol: z.string(),
  degree: finite(),
  sign: finite(),
  color: z.string(),
});

export const houseDto = z.object({
  firstHouse: finite(),
  secondHouse: finite(),
  thirdHouse: finite(),
  fourthHouse: finite(),
  fifthHouse: finite(),
  sixthHouse: finite(),
  seventhHouse: finite(),
  eighthHouse: finite(),
  ninthHouse: finite(),
  tenthHouse: finite(),
  eleventhHouse: finite(),
  twelfthHouse: finite(),
});

export const aspectDto = z.object({
  p1_name: z.string(),
  p1_abs_pos: finite(),
  p2_name: z.string(),
  p2_abs_pos: finite(),
  type: z.enum(['conjunction', 'opposition', 'trine', 'square', 'sextile']),
  exactAngle: finite(),
  actualAngle: finite(),
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
  targetYear: z.coerce.number().int().min(1900).max(2100),
  locationCity: z.string().optional(),
  locationNation: z.string().optional(),
});

export type BirthDataInput = z.infer<typeof birthDataSchema>;
export type CalculateChartResponse = z.infer<typeof calculateChartDto>;
export type SolarReturnInput = z.infer<typeof solarReturnBody>;
