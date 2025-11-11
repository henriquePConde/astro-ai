import { ZODIAC_SIGNS } from './constants';

/**
 * Gets the zodiac sign label for a given degree.
 * @param degree - The degree (0-360)
 * @param provided - Optional provided sign label to use instead of calculating
 * @returns The sign name
 */
export function getSignLabel(degree: number, provided?: string): string {
  if (provided) return provided;
  const index = ((Math.floor(degree / 30) % 12) + 12) % 12;
  return ZODIAC_SIGNS[index] ?? '—';
}
