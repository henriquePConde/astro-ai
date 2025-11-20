// astro-ai-fullstack/src/backend/features/calculate/infra/aspects.service.ts
import type { Aspect, PlanetData, AspectType } from '../domain/calculate.entities';

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

function isFiniteNum(n: unknown): n is number {
  return typeof n === 'number' && Number.isFinite(n);
}

// Check if a planet is a major body (Sun, Moon, or Angle - ASC/MC)
function isMajorBody(planetName: string): boolean {
  const nameLower = planetName.toLowerCase();
  return (
    nameLower === 'sun' || nameLower === 'moon' || nameLower === 'ascendant' || nameLower === 'mc'
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

function getAspectFromTwoPoints(
  point1Pos: number,
  point2Pos: number,
  planet1Name: string,
  planet2Name: string,
): Partial<Aspect> | null {
  if (!isFiniteNum(point1Pos) || !isFiniteNum(point2Pos)) return null;

  let diff = Math.abs(point1Pos - point2Pos);
  if (diff > 180) diff = 360 - diff;

  for (const [aspectName, degree] of Object.entries(ASPECT_DEGREES)) {
    const orb = getAspectOrb(aspectName as keyof typeof ASPECT_ORBS, planet1Name, planet2Name);
    const angleDiff = Math.abs(diff - degree);

    if (angleDiff <= orb) {
      return {
        type: aspectName.toLowerCase() as AspectType,
        exactAngle: degree,
        actualAngle: diff,
      };
    }
  }

  return null;
}

export function calculateAspects(planets: Record<string, PlanetData>): Aspect[] {
  const aspects: Aspect[] = [];
  const planetEntries = Object.entries(planets).filter(([, p]) => isFiniteNum(p?.longitude));

  for (let i = 0; i < planetEntries.length; i++) {
    for (let j = i + 1; j < planetEntries.length; j++) {
      const [p1Name, p1Data] = planetEntries[i];
      const [p2Name, p2Data] = planetEntries[j];

      const aspect = getAspectFromTwoPoints(p1Data.longitude, p2Data.longitude, p1Name, p2Name);

      if (aspect) {
        aspects.push({
          p1_name: p1Name,
          p1_abs_pos: p1Data.longitude,
          p2_name: p2Name,
          p2_abs_pos: p2Data.longitude,
          type: aspect.type!,
          exactAngle: aspect.exactAngle!,
          actualAngle: aspect.actualAngle!,
        });
      }
    }
  }

  return aspects;
}
