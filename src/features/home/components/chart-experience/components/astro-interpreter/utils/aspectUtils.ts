// src/features/home/components/chart-experience/components/astro-interpreter/utils/aspect-utils.ts

import type { PlanetInfo } from '@/shared/components/astro-chart/types';

export const calculateChartAspects = (planetPositions: PlanetInfo[]) => {
  const aspects: {
    planet1: string;
    planet2: string;
    type: string;
    angle: number;
  }[] = [];

  const ASPECTS = [
    { type: 'Conjunction', angle: 0, orb: 8 },
    { type: 'Sextile', angle: 60, orb: 6 },
    { type: 'Square', angle: 90, orb: 8 },
    { type: 'Trine', angle: 120, orb: 8 },
    { type: 'Opposition', angle: 180, orb: 8 },
  ];

  for (let i = 0; i < planetPositions.length; i++) {
    for (let j = i + 1; j < planetPositions.length; j++) {
      const p1 = planetPositions[i]!;
      const p2 = planetPositions[j]!;

      const pos1 = parseFloat(p1.position);
      const pos2 = parseFloat(p2.position);
      const diff = Math.abs(pos1 - pos2);
      const angle = diff > 180 ? 360 - diff : diff;

      for (const a of ASPECTS) {
        if (Math.abs(angle - a.angle) <= a.orb) {
          aspects.push({
            planet1: p1.name,
            planet2: p2.name,
            type: a.type,
            angle,
          });
          break;
        }
      }
    }
  }

  return aspects;
};
