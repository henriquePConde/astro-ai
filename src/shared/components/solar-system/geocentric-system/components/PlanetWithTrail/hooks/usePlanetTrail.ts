import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, type MutableRefObject } from 'react';
import * as THREE from 'three';

interface TrailPoint {
  x: number;
  z: number;
}

export function usePlanetTrail(
  distance: number,
  speed: number,
  angleRef: MutableRefObject<number>,
) {
  const trailMeshRef = useRef<THREE.Mesh>(null!);
  const trailPoints = useRef<TrailPoint[]>([]);

  const BASE_TRAIL_LENGTH = 128;
  const MIN_TRAIL = 64;
  const MAX_TRAIL = 192;
  const DECAY = 0.99;
  const trailLength = useMemo(
    () => Math.min(MAX_TRAIL, Math.max(MIN_TRAIL, Math.round(BASE_TRAIL_LENGTH * (1 + speed)))),
    [speed],
  );

  useFrame(() => {
    const x = distance * Math.cos(angleRef.current);
    const z = distance * Math.sin(angleRef.current);
    trailPoints.current.unshift({ x, z });

    if (trailPoints.current.length > trailLength) {
      trailPoints.current.length = trailLength;
    }

    if (trailMeshRef.current && trailPoints.current.length > 1) {
      const positions: number[] = [];
      const colors: number[] = [];
      const indices: number[] = [];
      const baseWidth = 0.01;

      for (let i = 0; i < trailPoints.current.length - 1; i++) {
        const current = trailPoints.current[i];
        const next = trailPoints.current[i + 1];
        const dx = next.x - current.x;
        const dz = next.z - current.z;
        const len = Math.sqrt(dx * dx + dz * dz);
        const progress = i / trailPoints.current.length;
        const width = baseWidth * (1 - progress * 0.3);
        const px = (-dz / len) * width;
        const pz = (dx / len) * width;

        positions.push(
          current.x + px,
          0,
          current.z + pz,
          current.x - px,
          0,
          current.z - pz,
          next.x + px,
          0,
          next.z + pz,
          next.x - px,
          0,
          next.z - pz,
        );

        const opacity = Math.pow(DECAY, i) * Math.pow(1 - progress, 0.5);
        const color = new THREE.Color('#ffd700');

        for (let j = 0; j < 4; j++) {
          colors.push(color.r * opacity, color.g * opacity, color.b * opacity);
        }

        const offset = i * 4;
        indices.push(offset, offset + 1, offset + 2, offset + 1, offset + 3, offset + 2);
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      geometry.setIndex(indices);

      trailMeshRef.current.geometry.dispose();
      trailMeshRef.current.geometry = geometry;
    }
  });

  return trailMeshRef;
}
