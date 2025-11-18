import * as https from 'https';
import { URL } from 'url';
import type { LocationSearchResult } from '../domain/location.entities';

const BASE_URL = 'https://nominatim.openstreetmap.org/search';
const HEADERS = {
  'User-Agent': 'Mozilla/5.0',
};

// Country name to ISO code mapping
const COUNTRY_MAPPING: Record<string, string> = {
  // USEFUL ALIASES
  usa: 'US',
  america: 'US',
  uk: 'GB',
  'great britain': 'GB',
  england: 'GB',
  britain: 'GB',
  deutschland: 'DE',
  españa: 'ES',
  holland: 'NL',
  brasil: 'BR',
  méxico: 'MX',
  'south korea': 'KR',
  'north korea': 'KP',
  uae: 'AE',
  'russian federation': 'RU',
  iran: 'IR',
  syria: 'SY',
  palestine: 'PS',
  laos: 'LA',
  'cape verde': 'CV',
  'ivory coast': 'CI',
  macedonia: 'MK',
  myanmar: 'MM',
  burma: 'MM',
  'east timor': 'TL',
  swaziland: 'SZ',
  vatican: 'VA',
  congo: 'CG',
  'democratic republic of congo': 'CD',
  drc: 'CD',
  // OFFICIAL ISO COUNTRY NAMES (abbreviated list - full list in original)
  afghanistan: 'AF',
  albania: 'AL',
  algeria: 'DZ',
  argentina: 'AR',
  australia: 'AU',
  austria: 'AT',
  bangladesh: 'BD',
  belgium: 'BE',
  brazil: 'BR',
  bulgaria: 'BG',
  canada: 'CA',
  chile: 'CL',
  china: 'CN',
  colombia: 'CO',
  croatia: 'HR',
  'czech republic': 'CZ',
  denmark: 'DK',
  egypt: 'EG',
  finland: 'FI',
  france: 'FR',
  germany: 'DE',
  greece: 'GR',
  hungary: 'HU',
  iceland: 'IS',
  india: 'IN',
  indonesia: 'ID',
  iraq: 'IQ',
  ireland: 'IE',
  israel: 'IL',
  italy: 'IT',
  japan: 'JP',
  mexico: 'MX',
  netherlands: 'NL',
  'new zealand': 'NZ',
  nigeria: 'NG',
  norway: 'NO',
  pakistan: 'PK',
  peru: 'PE',
  philippines: 'PH',
  poland: 'PL',
  portugal: 'PT',
  romania: 'RO',
  russia: 'RU',
  'saudi arabia': 'SA',
  'south africa': 'ZA',
  spain: 'ES',
  sweden: 'SE',
  switzerland: 'CH',
  thailand: 'TH',
  turkey: 'TR',
  ukraine: 'UA',
  'united arab emirates': 'AE',
  'united kingdom': 'GB',
  'united states': 'US',
  'united states of america': 'US',
  venezuela: 'VE',
  vietnam: 'VN',
};

function getCountryCode(countryName: string): string | null {
  if (!countryName) return null;
  const normalized = countryName.toLowerCase().trim();
  return COUNTRY_MAPPING[normalized] || null;
}

function findPartialCountryMatches(query: string): string[] {
  const matches: string[] = [];
  for (const countryName of Object.keys(COUNTRY_MAPPING)) {
    if (countryName.startsWith(query) || countryName.includes(query)) {
      matches.push(countryName);
    }
  }
  return matches.sort((a, b) => {
    if (a === query && b !== query) return -1;
    if (b === query && a !== query) return 1;
    if (a.startsWith(query) && !b.startsWith(query)) return -1;
    if (b.startsWith(query) && !a.startsWith(query)) return 1;
    return a.length - b.length;
  });
}

function toProperCase(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeHttpRequest(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: HEADERS,
      // Keep external requests well under Vercel's 10s limit
      timeout: 7000,
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          reject(new Error('Failed to parse JSON response'));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

export function makeLocationRepo() {
  return {
    async searchCountries(query: string, limit: number = 10): Promise<LocationSearchResult[]> {
      if (!query || query.trim().length < 2) {
        return [];
      }

      const normalizedQuery = query.toLowerCase().trim();
      const results: LocationSearchResult[] = [];

      // First, search our local country mapping for partial matches
      const localMatches = findPartialCountryMatches(normalizedQuery);

      // Convert local matches to LocationSearchResult format
      for (const match of localMatches.slice(0, limit)) {
        const countryCode = COUNTRY_MAPPING[match.toLowerCase()];
        if (countryCode) {
          const properName = toProperCase(match);
          results.push({
            name: properName,
            displayName: properName,
            country: properName,
            countryCode: countryCode,
            lat: 0,
            lng: 0,
            importance: 1.0,
          });
        }
      }

      // If we don't have enough results, try the API for additional matches
      if (results.length < limit) {
        try {
          // Keep a small delay to respect Nominatim, but avoid adding a full second
          await delay(300);

          const searchParams = new URLSearchParams({
            q: query.trim(),
            format: 'json',
            addressdetails: '1',
            limit: (limit * 2).toString(),
            countrycodes: '',
            featuretype: 'country',
          });

          const data = await makeHttpRequest(`${BASE_URL}?${searchParams}`);

          const apiResults = data
            .filter(
              (item: any) =>
                item.type === 'administrative' &&
                item.address?.country &&
                item.importance > 0.3 &&
                !results.some(
                  (existing) => existing.countryCode === item.address.country_code?.toUpperCase(),
                ),
            )
            .map((item: any) => ({
              name: item.address.country,
              displayName: item.display_name,
              country: item.address.country,
              countryCode: item.address.country_code?.toUpperCase(),
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lon),
              importance: item.importance,
            }))
            .sort((a: any, b: any) => (b.importance || 0) - (a.importance || 0));

          const remainingSlots = limit - results.length;
          results.push(...apiResults.slice(0, remainingSlots));
        } catch (error) {
          console.error('Error searching countries via API:', error);
          // Continue with local results only
        }
      }

      // Sort by relevance
      return results
        .sort((a, b) => {
          const aExact = a.name.toLowerCase() === normalizedQuery ? 1 : 0;
          const bExact = b.name.toLowerCase() === normalizedQuery ? 1 : 0;
          if (aExact !== bExact) return bExact - aExact;

          const aStarts = a.name.toLowerCase().startsWith(normalizedQuery) ? 1 : 0;
          const bStarts = b.name.toLowerCase().startsWith(normalizedQuery) ? 1 : 0;
          if (aStarts !== bStarts) return bStarts - aStarts;

          return (b.importance || 0) - (a.importance || 0);
        })
        .slice(0, limit);
    },

    async searchCities(
      query: string,
      countryName?: string,
      limit: number = 15,
    ): Promise<LocationSearchResult[]> {
      if (!query || query.trim().length < 2) {
        return [];
      }

      try {
        // Keep a small delay to respect Nominatim, but avoid adding a full second
        await delay(300);

        const countryCode = countryName ? getCountryCode(countryName) : null;

        let searchQuery = query.trim();
        if (countryCode) {
          searchQuery = `${searchQuery}, ${countryCode}`;
        }

        const searchParams = new URLSearchParams({
          q: searchQuery,
          format: 'json',
          addressdetails: '1',
          limit: limit.toString(),
        });

        if (countryCode) {
          searchParams.set('countrycodes', countryCode.toLowerCase());
        }

        const fullUrl = `${BASE_URL}?${searchParams}`;
        const data = await makeHttpRequest(fullUrl);

        const filteredResults = data.filter(
          (item: any) => item.importance > 0.1 && item.place_rank <= 20,
        );

        return filteredResults
          .map((item: any) => ({
            name:
              item.address?.municipality ||
              item.address?.city ||
              item.address?.town ||
              item.address?.village ||
              item.address?.hamlet ||
              item.address?.suburb ||
              item.address?.state ||
              item.name ||
              'Unknown',
            displayName: item.display_name,
            country: item.address?.country,
            countryCode: item.address?.country_code?.toUpperCase(),
            lat: parseFloat(item.lat || '0'),
            lng: parseFloat(item.lon || '0'),
            importance: item.importance,
          }))
          .filter((result: LocationSearchResult) => result.name && result.name !== 'Unknown')
          .sort(
            (a: LocationSearchResult, b: LocationSearchResult) =>
              (b.importance || 0) - (a.importance || 0),
          )
          .slice(0, limit);
      } catch (error) {
        console.error('Error searching cities:', error);
        return [];
      }
    },
  };
}
