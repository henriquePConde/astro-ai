import type { RefObject } from 'react';
import type * as THREE from 'three';

export interface EarthViewProps {
  earthRef: RefObject<THREE.Mesh>;
  texture: THREE.Texture;
  geometryArgs: [number, number, number];
  material: {
    color: THREE.Color;
    emissive: THREE.Color;
    emissiveIntensity: number;
    metalness: number;
    roughness: number;
    clearcoat: number;
    clearcoatRoughness: number;
    sheen: number;
    sheenRoughness: number;
    sheenColor: THREE.Color;
    envMapIntensity: number;
  };
}
