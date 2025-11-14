import type * as THREE from 'three';

export interface StarConfig {
  start: THREE.Vector3;
  dir: THREE.Vector3;
  speed: number;
  key: number;
}

export interface ShootingStarsViewProps {
  stars: StarConfig[];
}
