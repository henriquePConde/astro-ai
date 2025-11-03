import type { Aspect, PlanetData, AspectType } from '../domain/calculate.entities';

const DEFAULT_ASPECTS = [
  { name: 'Conjunction', degree: 0, orb: 10 },
  { name: 'Opposition', degree: 180, orb: 10 },
  { name: 'Trine', degree: 120, orb: 8 },
  { name: 'Square', degree: 90, orb: 8 },
  { name: 'Sextile', degree: 60, orb: 6 },
] as const;

function getAspectFromTwoPoints(
  point1Pos: number,
  point2Pos: number,
  aspectSettings: typeof DEFAULT_ASPECTS,
): Partial<Aspect> | null {
  let diff = Math.abs(point1Pos - point2Pos);
  if (diff > 180) diff = 360 - diff;

  for (const aspect of aspectSettings) {
    const orb = Math.abs(diff - aspect.degree);
    if (orb <= aspect.orb) {
      return {
        type: aspect.name.toLowerCase() as AspectType,
        exactAngle: aspect.degree,
        actualAngle: diff,
      };
    }
  }

  return null;
}

export function calculateAspects(planets: Record<string, PlanetData>): Aspect[] {
  const aspects: Aspect[] = [];
  const planetEntries = Object.entries(planets);

  for (let i = 0; i < planetEntries.length; i++) {
    for (let j = i + 1; j < planetEntries.length; j++) {
      const [p1Name, p1Data] = planetEntries[i];
      const [p2Name, p2Data] = planetEntries[j];

      const aspect = getAspectFromTwoPoints(p1Data.longitude, p2Data.longitude, DEFAULT_ASPECTS);

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
