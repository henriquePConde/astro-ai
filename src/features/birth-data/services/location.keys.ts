export const locationKeys = {
    all: ['location'] as const,
    countries: (q: string, limit: number) => [...locationKeys.all, 'countries', { q, limit }] as const,
    cities: (q: string, country: string | undefined, limit: number) =>
        [...locationKeys.all, 'cities', { q, country, limit }] as const,
};


