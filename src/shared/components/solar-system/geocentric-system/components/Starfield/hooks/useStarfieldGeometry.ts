import { useMemo } from 'react';
import * as THREE from 'three';

export function useStarfieldGeometry(starCount = 35000) {
  return useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    const colors = new Float32Array(starCount * 3);
    const twinkleOffsets = new Float32Array(starCount);

    const palette = [
      new THREE.Color('#88ccff'),
      new THREE.Color('#e6eef1'),
      new THREE.Color('#fff3e0'),
      new THREE.Color('#e6e6fa'),
    ];

    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 45 + Math.random() * 5;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const sizeRoll = Math.random();
      sizes[i] =
        sizeRoll < 0.6
          ? 0.05 + Math.random() * 0.05
          : sizeRoll < 0.85
            ? 0.15 + Math.random() * 0.15
            : 0.35 + Math.random() * 0.25;

      twinkleOffsets[i] = Math.random() * Math.PI * 2;

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, sizes, colors, twinkleOffsets };
  }, [starCount]);
}
