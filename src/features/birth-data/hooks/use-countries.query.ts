import { useQuery } from '@tanstack/react-query';
import { locationKeys } from '../services/location.keys';
import { searchCountries } from '../services/location.service';

export function useCountries(q: string, limit: number = 10) {
    return useQuery({
        queryKey: locationKeys.countries(q, limit),
        queryFn: () => searchCountries({ q, limit }),
        enabled: q.length >= 2,
        staleTime: 60_000,
    });
}


