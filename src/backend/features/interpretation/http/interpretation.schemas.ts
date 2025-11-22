import { z } from 'zod';

export const chartPlanetDto = z.object({
  name: z.string(),
  sign: z.string(),
  house: z.number().int(),
  position: z.string(),
});

export const chartAspectDto = z.object({
  planet1: z.string(),
  planet2: z.string(),
  type: z.string(),
  angle: z.number(),
});

const housesCuspsDto = z.object({
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

const houseDetailsDto = z.object({
  cuspDegree: z.number(),
  cuspSign: z.string(),
  signsWithin: z.array(z.string()),
});

export const chartContextDto = z.object({
  planets: z.array(chartPlanetDto),
  aspects: z.array(chartAspectDto),
  houses: z.object({
    ascendant: z.number(),
    midheaven: z.number(),
    cusps: housesCuspsDto.optional(),
    details: z.record(houseDetailsDto).optional(),
    interceptedSigns: z.array(z.string()).optional(),
    rulers: z.record(z.string()).optional(),
  }),
});

export const messageDto = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
});

export const interpretBody = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
  context: chartContextDto,
  chatHistory: z.array(messageDto).default([]),
  chartId: z.string().uuid().optional(),
});

export type InterpretBody = z.infer<typeof interpretBody>;
export type ChartContextDto = z.infer<typeof chartContextDto>;
export type MessageDto = z.infer<typeof messageDto>;
