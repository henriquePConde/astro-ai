import type * as THREE from 'three';

export interface PlanetWithTrailProps {
  name: string;
  distance: number;
  speed: number;
  size?: number;
  textureFile: string;
}

export interface PlanetWithTrailViewProps {
  planetRef: React.RefObject<THREE.Mesh>;
  trailMeshRef: React.RefObject<THREE.Mesh>;
  ringTexture: THREE.CanvasTexture;
  planetColor: THREE.Color;
  emissive: THREE.Color;
  emissiveIntensity: number;
  texture: THREE.Texture;
  size: number;
  distance: number;
  material: {
    metalness: number;
    roughness: number;
    clearcoat: number;
    clearcoatRoughness: number;
    sheen: number;
    sheenRoughness: number;
    sheenColor: THREE.Color;
    envMapIntensity: number;
  };
  ringGeometry: {
    innerRadius: number;
    outerRadius: number;
    thetaSegments: number;
  };
  ringMaterial: {
    transparent: boolean;
    opacity: number;
    side: THREE.Side;
  };
  trailMaterial: {
    vertexColors: boolean;
    transparent: boolean;
    opacity: number;
    side: THREE.Side;
    depthWrite: boolean;
  };
  ringRotation: [number, number, number];
  sphereSegments: number;
}
