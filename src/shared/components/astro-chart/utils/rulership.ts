import { ZODIAC_SIGNS } from './constants';

export type SignRulership = {
  sign: (typeof ZODIAC_SIGNS)[number];
  /**
   * Rulers for this sign. The first entry is treated as the primary (modern) ruler.
   * Additional entries can represent traditional or co-rulers.
   */
  rulers: string[];
};

export const SIGN_RULERS: ReadonlyArray<SignRulership> = [
  { sign: 'Aries', rulers: ['Mars'] },
  { sign: 'Taurus', rulers: ['Venus'] },
  { sign: 'Gemini', rulers: ['Mercury'] },
  { sign: 'Cancer', rulers: ['Moon'] },
  { sign: 'Leo', rulers: ['Sun'] },
  { sign: 'Virgo', rulers: ['Mercury'] },
  { sign: 'Libra', rulers: ['Venus'] },
  { sign: 'Scorpio', rulers: ['Pluto', 'Mars'] },
  { sign: 'Sagittarius', rulers: ['Jupiter'] },
  { sign: 'Capricorn', rulers: ['Saturn'] },
  { sign: 'Aquarius', rulers: ['Uranus', 'Saturn'] },
  { sign: 'Pisces', rulers: ['Neptune', 'Jupiter'] },
] as const;

export function getRulerPlanetName(signIndex: number): string | null {
  if (signIndex < 0 || signIndex >= SIGN_RULERS.length) return null;
  const entry = SIGN_RULERS[signIndex];
  if (!entry || !entry.rulers.length) return null;
  return entry.rulers[0] ?? null;
}
