/**
 * Domain entities and business rules for the calculate feature.
 */

export type BirthData = {
  name: string;
  year: number;
  month: number; // 1-12
  day: number; // 1-31
  hour: number; // 0-23
  minute: number; // 0-59
  city?: string;
  nation?: string;
};

export type AspectType = 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile';

export type Aspect = {
  p1_name: string;
  p1_abs_pos: number;
  p2_name: string;
  p2_abs_pos: number;
  type: AspectType;
  exactAngle: number;
  actualAngle: number;
};

export type PlanetData = {
  longitude: number;
  latitude: number;
  distance: number;
  longitudeSpeed: number;
  sign: number;
  house: number;
  retrograde: boolean;
};

export type ChartData = {
  datetime: {
    iso: string;
    timezone: string;
    julian: number;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  houses: {
    cusps: number[];
    ascendant: number;
    mc: number;
  };
  planets: Record<string, PlanetData>;
  aspects: Aspect[];
};

/**
 * Validates birth data meets business requirements.
 */
export function isValidBirthData(data: BirthData): boolean {
  if (!data.year || data.year < 1900 || data.year > 2100) return false;
  if (!data.month || data.month < 1 || data.month > 12) return false;
  if (!data.day || data.day < 1 || data.day > 31) return false;
  if (data.hour < 0 || data.hour > 23) return false;
  if (data.minute < 0 || data.minute > 59) return false;
  return true;
}
