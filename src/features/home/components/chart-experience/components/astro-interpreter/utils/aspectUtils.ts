// src/features/home/components/chart-experience/components/astro-interpreter/utils/aspect-utils.ts

import type { PlanetInfo } from '@/shared/components/astro-chart/types';

// Orb configuration: [planets, sun/moon/angles]
const ASPECT_ORBS = {
  Conjunction: { planets: 7, major: 9 },
  Opposition: { planets: 7, major: 9 },
  Square: { planets: 6, major: 7.5 },
  Trine: { planets: 6, major: 7.5 },
  Sextile: { planets: 4, major: 5 },
} as const;

const ASPECT_DEGREES = {
  Conjunction: 0,
  Opposition: 180,
  Square: 90,
  Trine: 120,
  Sextile: 60,
} as const;

// Check if a planet is a major body (Sun, Moon, or Angle - ASC/MC)
function isMajorBody(planetName: string): boolean {
  const nameLower = planetName.toLowerCase();
  return (
    nameLower === 'sun' ||
    nameLower === 'moon' ||
    nameLower === 'ascendant' ||
    nameLower === 'mc' ||
    nameLower === 'asc'
  );
}

// Get the appropriate orb for an aspect based on whether planets are major bodies
function getAspectOrb(
  aspectName: keyof typeof ASPECT_ORBS,
  planet1Name: string,
  planet2Name: string,
): number {
  const isMajor1 = isMajorBody(planet1Name);
  const isMajor2 = isMajorBody(planet2Name);
  const hasMajorBody = isMajor1 || isMajor2;

  return hasMajorBody ? ASPECT_ORBS[aspectName].major : ASPECT_ORBS[aspectName].planets;
}

export const calculateChartAspects = (planetPositions: PlanetInfo[]) => {
  const aspects: {
    planet1: string;
    planet2: string;
    type: string;
    angle: number;
  }[] = [];

  for (let i = 0; i < planetPositions.length; i++) {
    for (let j = i + 1; j < planetPositions.length; j++) {
      const p1 = planetPositions[i]!;
      const p2 = planetPositions[j]!;

      const pos1 = parseFloat(p1.position);
      const pos2 = parseFloat(p2.position);
      const diff = Math.abs(pos1 - pos2);
      const angle = diff > 180 ? 360 - diff : diff;

      for (const [aspectName, degree] of Object.entries(ASPECT_DEGREES)) {
        const orb = getAspectOrb(aspectName as keyof typeof ASPECT_ORBS, p1.name, p2.name);

        if (Math.abs(angle - degree) <= orb) {
          aspects.push({
            planet1: p1.name,
            planet2: p2.name,
            type: aspectName,
            angle,
          });
          break;
        }
      }
    }
  }

  return aspects;
};
