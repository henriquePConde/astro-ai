import type * as THREE from 'three';

export interface ShootingStarProps {
  startPosition: THREE.Vector3;
  direction: THREE.Vector3;
  speed: number;
}

export interface ShootingStarViewProps {
  meshRef: React.RefObject<THREE.Mesh>;
  trailRef: React.RefObject<THREE.Mesh>;
  startPosition: THREE.Vector3;
  starColor: string;
  sphereGeometry: {
    radius: number;
    widthSegments: number;
    heightSegments: number;
  };
  sphereMaterial: {
    transparent: boolean;
    opacity: number;
  };
  pointLight: {
    intensity: number;
    distance: number;
    decay: number;
  };
  cylinderGeometry: {
    radiusTop: number;
    radiusBottom: number;
    height: number;
    radialSegments: number;
    heightSegments: number;
  };
  trailMaterial: {
    transparent: boolean;
    opacity: number;
  };
}
