import { MutableRefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function useEarthRotation(ref: MutableRefObject<THREE.Mesh | null>) {
  useFrame((_state, delta: number) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.1;
    }
  });
}
