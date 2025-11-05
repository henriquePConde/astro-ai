// astro-ai-fullstack/src/backend/features/calculate/infra/time.service.ts
import { fromZonedTime } from 'date-fns-tz';
import type { BirthData } from '../domain/calculate.entities';
import { searchCities } from '@/backend/features/location';

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
  const utcDate = fromZonedTime(localDate, timezone || 'UTC');

  return {
    utcDate,
    timezone: timezone || 'UTC',
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

  await delay(200);

  try {
    const results = await searchCities(city, nation, 1);
    if (results.length > 0) {
      return { lat: results[0].lat, lng: results[0].lng };
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
  }

  // Be resilient: avoid throwing => no NaNs later
  return { lat: 0, lng: 0 };
}

async function getTimezoneFromCoordinates(lat: number, lng: number): Promise<string> {
  if (lat === 0 && lng === 0) {
    return 'UTC';
  }

  try {
    await delay(200);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      {
        headers: {
          'User-Agent': 'AstroAI/1.0',
          'Accept-Language': 'en',
        },
      },
    );

    if (!response.ok) throw new Error('Failed to fetch timezone');

    const data = await response.json();
    return data.timezone || 'UTC';
  } catch (error) {
    console.error('Error fetching timezone:', error);
    return 'UTC';
  }
}
