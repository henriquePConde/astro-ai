/**
 * Domain entities and business rules for the location feature.
 */

export type LocationSearchResult = {
  name: string;
  displayName: string;
  country?: string;
  countryCode?: string;
  lat: number;
  lng: number;
  importance?: number;
  timezone?: string;
};

/**
 * Validates that coordinates are within valid ranges.
 */
export function isValidLatitude(lat: number): boolean {
  return lat >= -90 && lat <= 90;
}

/**
 * Validates that coordinates are within valid ranges.
 */
export function isValidLongitude(lng: number): boolean {
  return lng >= -180 && lng <= 180;
}

/**
 * Validates location search query meets minimum requirements.
 */
export function isValidLocationQuery(query: string): boolean {
  return query.trim().length >= 2;
}
