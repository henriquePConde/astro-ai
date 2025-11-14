import { useMemo } from 'react';
import * as THREE from 'three';
import { Nebula } from './Nebula';

interface NebulaConfig {
  position: THREE.Vector3;
  h: number;
  s: number;
  l: number;
  size: number;
  opacity: number;
}

export function NebulaField() {
  const nebulae: NebulaConfig[] = useMemo(
    () => [
      {
        position: new THREE.Vector3(0, 0, -80),
        h: 0.92, // pink
        s: 0.5,
        l: 0.4,
        size: 35,
        opacity: 0.25,
      },
      {
        position: new THREE.Vector3(-40, 15, -90),
        h: 0.6, // blue
        s: 0.4,
        l: 0.35,
        size: 30,
        opacity: 0.2,
      },
      {
        position: new THREE.Vector3(35, -20, -85),
        h: 0.75, // lavender
        s: 0.45,
        l: 0.4,
        size: 40,
        opacity: 0.22,
      },
    ],
    [],
  );

  return (
    <group>
      {nebulae.map((nebula, i) => (
        <Nebula key={i} {...nebula} />
      ))}
    </group>
  );
}
