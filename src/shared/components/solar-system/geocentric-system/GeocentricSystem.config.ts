import * as THREE from 'three';

export const GEOCENTRIC_SYSTEM_CONFIG = {
  camera: {
    position: [0, 1.8, 2.4] as [number, number, number],
    fov: 45,
    far: 1000,
  },
  lights: {
    ambient: {
      intensity: 1.2,
    },
    pointLights: [
      {
        position: [5, 5, 5] as [number, number, number],
        intensity: 1.8,
      },
      {
        position: [-5, -5, -5] as [number, number, number],
        intensity: 1.0,
      },
    ],
  },
  animatedCamera: {
    target: new THREE.Vector3(0, 2.0, 3.2),
  },
  orbitControls: {
    minDistance: 1,
    maxDistance: 10,
    enablePan: false,
  },
} as const;
