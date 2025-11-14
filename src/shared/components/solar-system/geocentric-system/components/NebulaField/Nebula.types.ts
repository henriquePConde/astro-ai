import type * as THREE from 'three';

export interface NebulaProps {
  position: THREE.Vector3;
  h: number;
  s: number;
  l: number;
  size: number;
  opacity: number;
}

export interface NebulaViewProps {
  particlesRef: React.RefObject<THREE.Points>;
  material: THREE.ShaderMaterial;
  positions: Float32Array;
  sizes: Float32Array;
  alphas: Float32Array;
  position: THREE.Vector3;
  renderOrder: number;
}
