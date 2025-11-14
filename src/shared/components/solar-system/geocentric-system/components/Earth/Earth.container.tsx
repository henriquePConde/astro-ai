'use client';

import { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useEarthRotation } from './hooks/useEarthRotation';
import { EarthView } from './Earth.view';
import { EARTH_CONFIG } from './Earth.config';

export function EarthContainer() {
  const earthRef = useRef<THREE.Mesh>(null!);
  const texture = useLoader(THREE.TextureLoader, EARTH_CONFIG.texture.path);

  useEarthRotation(earthRef, EARTH_CONFIG.rotation.speed);

  return (
    <EarthView
      earthRef={earthRef}
      texture={texture}
      geometryArgs={EARTH_CONFIG.geometry.args}
      material={EARTH_CONFIG.material}
    />
  );
}
