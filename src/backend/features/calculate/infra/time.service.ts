// astro-ai-fullstack/src/backend/features/calculate/infra/time.service.ts
// This implementation mirrors the old astro-ai-backend TimeService behavior
// as closely as possible to ensure identical chart results.

import { fromZonedTime } from 'date-fns-tz';
import type { BirthData } from '../domain/calculate.entities';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search';
const TIMEZONEDB_BASE_URL = 'https://api.timezonedb.com/v2.1/get-time-zone';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function normalizeTime(birthData: BirthData): Promise<{
  utcDate: Date;
  timezone: string;
  coordinates: { lat: number; lng: number };
}> {
  try {
    console.log('TimeService - Input birth data:', birthData);

    const localDate = new Date(
      birthData.year,
      birthData.month - 1,
      birthData.day,
      birthData.hour,
      birthData.minute,
    );
    console.log('TimeService - Local date created:', localDate);

    const coordinates = await getCoordinatesFromCity(birthData.city, birthData.nation);
    console.log('TimeService - Coordinates retrieved:', coordinates);

    const timezone = await getTimezoneFromCoordinates(coordinates.lat, coordinates.lng);
    console.log('TimeService - Timezone retrieved:', timezone);

    const utcDate = fromZonedTime(localDate, timezone);
    console.log('TimeService - UTC date calculated:', utcDate);

    return {
      utcDate,
      timezone,
      coordinates,
    };
  } catch (error) {
    console.error('TimeService - Error normalizing time:', error);
    throw error;
  }
}

/**
 * Geocode city/nation using Nominatim, same strategy as old backend.
 * - If no city: returns { lat: 0, lng: 0 }.
 * - If lookup fails or no results: throws (do NOT silently fall back for provided city).
 */
async function getCoordinatesFromCity(
  city?: string,
  nation?: string,
): Promise<{ lat: number; lng: number }> {
  if (!city) {
    // Same as old backend: default coordinates if no city provided
    return { lat: 0, lng: 0 };
  }

  const headers = {
    'User-Agent': 'AstroAI/1.0 (contact@astroai.local)',
    'Accept-Language': 'en',
  };

  await delay(1000); // Rate limiting like old service

  const searchQuery = nation
    ? `${encodeURIComponent(city)}, ${encodeURIComponent(nation)}`
    : encodeURIComponent(city);

  const url = `${NOMINATIM_BASE_URL}?q=${searchQuery}&format=json`;

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`Failed to fetch coordinates: ${response.status}`);
  }

  const data = await response.json();

  if (Array.isArray(data) && data.length > 0) {
    const first = data[0];
    const lat = parseFloat(first.lat);
    const lng = parseFloat(first.lon);

    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      return { lat, lng };
    }

    throw new Error('Geocoding API error: Invalid coordinates in response');
  }

  throw new Error('Geocoding API error: No results found');
}

/**
 * Resolve timezone via TimezoneDB, matching the old backend behavior.
 * - Requires TIMEZONEDB_API_KEY in env.
 * - Throws on failure instead of silently defaulting to UTC.
 */
async function getTimezoneFromCoordinates(lat: number, lng: number): Promise<string> {
  const apiKey = process.env.TIMEZONEDB_API_KEY;

  console.log('TimeService - TIMEZONEDB_API_KEY present:', !!apiKey);

  if (!apiKey) {
    throw new Error('TimezoneDB API key not found (TIMEZONEDB_API_KEY missing)');
  }

  const url = `${TIMEZONEDB_BASE_URL}?key=${encodeURIComponent(
    apiKey,
  )}&format=json&by=position&lat=${lat}&lng=${lng}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch timezone: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'OK' && typeof data.zoneName === 'string' && data.zoneName.length > 0) {
      return data.zoneName;
    }

    throw new Error(`Timezone API error: ${data.message || data.status || 'Unknown error'}`);
  } catch (error) {
    console.error('TimezoneDB request failed:', error);
    throw error;
  }
}
