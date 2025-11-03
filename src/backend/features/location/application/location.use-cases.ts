import { makeLocationRepo } from '../infra/location.repo';
import { isValidLocationQuery } from '../domain/location.entities';
import { badRequest } from '@/backend/core/errors/http-errors';
import type { LocationSearchResult } from '../domain/location.entities';

export async function searchCountries(
  query: string,
  limit: number = 10,
): Promise<LocationSearchResult[]> {
  if (!isValidLocationQuery(query)) {
    throw badRequest('Query must be at least 2 characters long');
  }

  const maxLimit = Math.min(limit, 20); // Cap at 20 results
  const repo = makeLocationRepo();
  const results = await repo.searchCountries(query, maxLimit);

  return results;
}

export async function searchCities(
  query: string,
  countryName?: string,
  limit: number = 15,
): Promise<LocationSearchResult[]> {
  if (!isValidLocationQuery(query)) {
    throw badRequest('Query must be at least 2 characters long');
  }

  const maxLimit = Math.min(limit, 25); // Cap at 25 results
  const repo = makeLocationRepo();
  const results = await repo.searchCities(query, countryName, maxLimit);

  return results;
}
