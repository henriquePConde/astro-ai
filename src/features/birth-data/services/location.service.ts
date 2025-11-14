import { client } from '@/shared/services/http/client';
import { z } from 'zod';

const CountryDto = z.union([
    z.string(),
    z.object({ name: z.string(), code: z.string().optional() }).passthrough(),
]);

const CityDto = z.union([
    z.string(),
    z.object({ name: z.string(), country: z.string().optional() }).passthrough(),
]);

export async function searchCountries(params: { q: string; limit?: number }) {
    const res = await client.get('/api/location/countries', { params });
    // API shape is { success: boolean, data: [...] }
    const payload = res?.data?.data ?? [];
    return z.array(CountryDto).parse(payload);
}

export async function searchCities(params: { q: string; country?: string; limit?: number }) {
    const res = await client.get('/api/location/cities', { params });
    // API shape is { success: boolean, data: [...] }
    const payload = res?.data?.data ?? [];
    return z.array(CityDto).parse(payload);
}
