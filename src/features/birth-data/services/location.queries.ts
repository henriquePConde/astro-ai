import { useQuery } from '@tanstack/react-query';
import { locationKeys } from './location.keys';
import { searchCities, searchCountries } from './location.service';

/**
 * Query hook for searching cities.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useCitiesQuery(q: string, country?: string, limit: number = 15) {
  return useQuery({
    queryKey: locationKeys.cities(q, country, limit),
    queryFn: () => searchCities({ q, country, limit }),
    enabled: q.length >= 2 && !!country,
    staleTime: 60_000,
  });
}

/**
 * Query hook for searching countries.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useCountriesQuery(q: string, limit: number = 10) {
  return useQuery({
    queryKey: locationKeys.countries(q, limit),
    queryFn: () => searchCountries({ q, limit }),
    enabled: q.length >= 2,
    staleTime: 60_000,
  });
}
