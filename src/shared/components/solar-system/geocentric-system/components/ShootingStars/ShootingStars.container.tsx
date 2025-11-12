'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { ShootingStarsView } from './ShootingStars.view';
import { SHOOTING_STARS_CONFIG } from './ShootingStars.config';
import type { StarConfig } from './ShootingStars.types';

export function ShootingStarsContainer() {
  const stars: StarConfig[] = useMemo(() => {
    const data: StarConfig[] = [];

    for (let i = 0; i < SHOOTING_STARS_CONFIG.count; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const radius = SHOOTING_STARS_CONFIG.radius;

      const start = new THREE.Vector3(
        radius * Math.sin(theta) * Math.cos(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(theta),
      );

      const dir = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
      ).normalize();

      const speed =
        SHOOTING_STARS_CONFIG.speed.min +
        Math.random() * (SHOOTING_STARS_CONFIG.speed.max - SHOOTING_STARS_CONFIG.speed.min);

      data.push({ start, dir, speed, key: i });
    }

    return data;
  }, []);

  return <ShootingStarsView stars={stars} />;
}
