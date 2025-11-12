import type { RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function useEarthRotation(ref: RefObject<THREE.Mesh>, speed: number) {
  useFrame((_state, delta: number) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speed;
    }
  });
}
