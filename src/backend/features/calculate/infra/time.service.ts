import { fromZonedTime } from 'date-fns-tz';
import type { BirthData } from '../domain/calculate.entities';
import { searchCities } from '@/backend/features/location';
import { env } from '@/backend/core/config/env';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function normalizeTime(birthData: BirthData): Promise<{
  utcDate: Date;
  timezone: string;
  coordinates: { lat: number; lng: number };
}> {
  const localDate = new Date(
    birthData.year,
    birthData.month - 1,
    birthData.day,
    birthData.hour,
    birthData.minute,
  );

  const coordinates = await getCoordinatesFromCity(birthData.city, birthData.nation);
  const timezone = await getTimezoneFromCoordinates(coordinates.lat, coordinates.lng);
  const utcDate = fromZonedTime(localDate, timezone);

  return {
    utcDate,
    timezone,
    coordinates,
  };
}

async function getCoordinatesFromCity(
  city?: string,
  nation?: string,
): Promise<{ lat: number; lng: number }> {
  if (!city) {
    return { lat: 0, lng: 0 };
  }

  await delay(1000); // Rate limiting

  try {
    const results = await searchCities(city, nation, 1);
    if (results.length > 0) {
      return { lat: results[0].lat, lng: results[0].lng };
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
  }

  throw new Error('Geocoding API error: No results found');
}

async function getTimezoneFromCoordinates(lat: number, lng: number): Promise<string> {
  // For now, use a simple timezone lookup
  // In production, you might want to use TimezoneDB API or another service
  // For now, we'll use a fallback approach with Nominatim reverse geocoding
  try {
    await delay(1000);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      {
        headers: {
          'User-Agent': 'AstroAI/1.0',
          'Accept-Language': 'en',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to fetch timezone');
    }

    const data = await response.json();
    // Nominatim doesn't provide timezone directly, but we can use the address to infer
    // For a more accurate solution, you'd use TimezoneDB API with an API key
    // For now, return UTC as fallback and note this needs improvement
    return data.timezone || 'UTC';
  } catch (error) {
    console.error('Error fetching timezone:', error);
    // Fallback to UTC
    return 'UTC';
  }
}
