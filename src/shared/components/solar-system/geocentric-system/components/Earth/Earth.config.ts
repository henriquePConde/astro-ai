import * as THREE from 'three';

export const EARTH_CONFIG = {
  texture: {
    path: '/planets/earth.jpg',
  },
  geometry: {
    args: [0.3, 64, 64] as [number, number, number],
  },
  material: {
    color: new THREE.Color('#87ceeb'),
    emissive: new THREE.Color('#b19cd9'),
    emissiveIntensity: 0.4,
    metalness: 0.2,
    roughness: 0.5,
    clearcoat: 0.3,
    clearcoatRoughness: 0.2,
    sheen: 0.15,
    sheenRoughness: 0.4,
    sheenColor: new THREE.Color('#ffffff'),
    envMapIntensity: 0.5,
  },
  rotation: {
    speed: 0.1,
  },
} as const;
