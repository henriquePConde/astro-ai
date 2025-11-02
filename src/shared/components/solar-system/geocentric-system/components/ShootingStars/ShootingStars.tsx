import { useMemo } from 'react';
import * as THREE from 'three';
import { ShootingStar } from './ShootingStar';

interface StarConfig {
  start: THREE.Vector3;
  dir: THREE.Vector3;
  speed: number;
  key: number;
}

export function ShootingStars() {
  const stars: StarConfig[] = useMemo(() => {
    const data: StarConfig[] = [];

    for (let i = 0; i < 25; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const radius = 50;

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

      const speed = 6 + Math.random() * 4;

      data.push({ start, dir, speed, key: i });
    }

    return data;
  }, []);

  return (
    <>
      {stars.map(({ start, dir, speed, key }) => (
        <ShootingStar key={key} startPosition={start} direction={dir} speed={speed} />
      ))}
    </>
  );
}
