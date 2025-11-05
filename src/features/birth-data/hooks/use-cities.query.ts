import { useQuery } from '@tanstack/react-query';
import { locationKeys } from '../services/location.keys';
import { searchCities } from '../services/location.service';

export function useCities(q: string, country?: string, limit: number = 15) {
    return useQuery({
        queryKey: locationKeys.cities(q, country, limit),
        queryFn: () => searchCities({ q, country, limit }),
        enabled: q.length >= 2,
        staleTime: 60_000,
    });
}


