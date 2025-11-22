export const planetColors = Object.freeze({
  sun: '#ffd6e6',
  moon: '#e6ccff',
  mercury: '#ccf2ff',
  venus: '#ffe6cc',
  mars: '#ffccf2',
  jupiter: '#ffd6e6',
  saturn: '#e6ccff',
  uranus: '#ccf2ff',
  neptune: '#ffe6cc',
  pluto: '#ffccf2',
} as const);

export type PlanetColorKey = keyof typeof planetColors;

/**
 * Returns the hex color for a given planet name using the shared palette.
 * Accepts names like "sun" or "Sun"; falls back to sun's color if unknown.
 */
export function getPlanetColor(name: string): string {
  const key = name.trim().toLowerCase() as PlanetColorKey;
  if (key in planetColors) {
    return planetColors[key];
  }

  return planetColors.sun;
}
