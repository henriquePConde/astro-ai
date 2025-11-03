import { z } from 'zod';

export const searchCountriesQuery = z.object({
  q: z.string().min(2, 'Query must be at least 2 characters'),
  limit: z.coerce.number().int().min(1).max(20).default(10).optional(),
});

export const searchCitiesQuery = z.object({
  q: z.string().min(2, 'Query must be at least 2 characters'),
  country: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(25).default(15).optional(),
});

export const locationSearchResultDto = z.object({
  name: z.string(),
  displayName: z.string(),
  country: z.string().optional(),
  countryCode: z.string().optional(),
  lat: z.number(),
  lng: z.number(),
  importance: z.number().optional(),
  timezone: z.string().optional(),
});

export const locationSearchResultsDto = z.array(locationSearchResultDto);

export type LocationSearchResultDto = z.infer<typeof locationSearchResultDto>;
export type SearchCountriesQuery = z.infer<typeof searchCountriesQuery>;
export type SearchCitiesQuery = z.infer<typeof searchCitiesQuery>;
