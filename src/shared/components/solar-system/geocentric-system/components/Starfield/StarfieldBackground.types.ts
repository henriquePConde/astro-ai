import type * as THREE from 'three';

export interface StarfieldBackgroundViewProps {
  starsRef: React.RefObject<THREE.Points>;
  backgroundRef: React.RefObject<THREE.Group>;
  canvasTexture: THREE.CanvasTexture;
  material: THREE.ShaderMaterial;
  positions: Float32Array;
  sizes: Float32Array;
  colors: Float32Array;
  twinkleOffsets: Float32Array;
}
