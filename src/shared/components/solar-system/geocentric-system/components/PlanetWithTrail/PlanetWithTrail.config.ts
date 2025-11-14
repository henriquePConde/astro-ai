import * as THREE from 'three';

export const PLANET_WITH_TRAIL_CONFIG = {
  defaultSize: 0.1,
  texturePath: '/planets',
  tooltip: {
    timeout: 3000,
  },
  planetColors: {
    Sun: '#ffd700',
    Mercury: '#e6e6fa',
    Venus: '#ffe4b5',
    Earth: '#87ceeb',
    Mars: '#ffb6c1',
    Jupiter: '#ffefd5',
    Saturn: '#dda0dd',
    Uranus: '#e0ffff',
    Neptune: '#b0e0e6',
    Moon: '#f0f8ff',
    Pluto: '#ffe4e1',
    default: '#ffffff',
  },
  emissiveColors: {
    sun: '#ffb6c1',
    default: '#b19cd9',
  },
  rotationSpeeds: {
    Sun: 0.1,
    Mercury: 0.16,
    Venus: -0.14,
    Earth: 0.2,
    Mars: 0.19,
    Jupiter: 0.3,
    Saturn: 0.28,
    Uranus: 0.18,
    Neptune: 0.16,
    Moon: 0.06,
    Pluto: 0.08,
    default: 0.2,
  },
  emissiveIntensity: {
    sun: 0.8,
    default: 0.4,
  },
  material: {
    metalness: 0.2,
    roughness: 0.5,
    clearcoat: 0.3,
    clearcoatRoughness: 0.2,
    sheen: 0.15,
    sheenRoughness: 0.4,
    sheenColor: new THREE.Color('#ffffff'),
    envMapIntensity: 0.5,
  },
  ring: {
    canvas: {
      width: 64,
      height: 1,
    },
    gradient: {
      stops: [
        { offset: 0, color: '#ffd6e6' },
        { offset: 0.5, color: '#ccf2ff' },
        { offset: 1, color: '#ffd6e6' },
      ],
    },
    geometry: {
      innerRadiusOffset: -0.003,
      outerRadiusOffset: 0.005,
      thetaSegments: 128,
    },
    material: {
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    },
    rotation: [-Math.PI / 2, 0, 0] as [number, number, number],
  },
  trail: {
    material: {
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
      depthWrite: false,
    },
  },
  geometry: {
    sphereSegments: 32,
  },
} as const;
