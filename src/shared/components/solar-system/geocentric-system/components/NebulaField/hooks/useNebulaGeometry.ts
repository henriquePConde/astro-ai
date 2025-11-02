import { useMemo } from 'react';
import * as THREE from 'three';

export function useNebulaGeometry(
  position: THREE.Vector3,
  size: number,
  opacity: number,
  count = 600,
) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = Math.pow(Math.random(), 0.6) * size;

      const x = position.x + r * Math.sin(phi) * Math.cos(theta);
      const y = position.y + r * Math.sin(phi) * Math.sin(theta);
      let z = position.z + r * Math.cos(phi);
      if (z > -70) z = -70;

      positions.set([x, y, z], i * 3);
      sizes[i] = (0.6 + Math.random() * 0.4) * size * 0.2;
      const dist = r / size;
      alphas[i] = (1 - Math.pow(dist, 1.2)) * opacity * 1.8;
    }

    return { positions, sizes, alphas };
  }, [position, size, opacity, count]);
}
