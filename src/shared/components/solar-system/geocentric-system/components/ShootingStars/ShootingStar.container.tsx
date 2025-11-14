'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useStarMotion } from './hooks/useStarMotion';
import { ShootingStarView } from './ShootingStar.view';
import type { ShootingStarProps } from './ShootingStar.types';
import { SHOOTING_STAR_CONFIG } from './ShootingStar.config';

export function ShootingStarContainer({ startPosition, direction, speed }: ShootingStarProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const trailRef = useRef<THREE.Mesh>(null!);

  const reset = () => {
    meshRef.current?.position.copy(startPosition);
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI;
    direction
      .set(Math.sin(theta) * Math.cos(phi), Math.sin(theta) * Math.sin(phi), Math.cos(theta))
      .normalize();
  };

  const starColor = useMemo(() => {
    return SHOOTING_STAR_CONFIG.colorPalette[
      Math.floor(Math.random() * SHOOTING_STAR_CONFIG.colorPalette.length)
    ];
  }, []);

  useStarMotion({
    startPosition,
    direction,
    speed,
    onReset: reset,
    meshRef,
    trailRef,
  });

  return (
    <ShootingStarView
      meshRef={meshRef}
      trailRef={trailRef}
      startPosition={startPosition}
      starColor={starColor}
      sphereGeometry={{
        radius: SHOOTING_STAR_CONFIG.sphere.radius,
        widthSegments: SHOOTING_STAR_CONFIG.sphere.widthSegments,
        heightSegments: SHOOTING_STAR_CONFIG.sphere.heightSegments,
      }}
      sphereMaterial={SHOOTING_STAR_CONFIG.sphere.material}
      pointLight={SHOOTING_STAR_CONFIG.pointLight}
      cylinderGeometry={{
        radiusTop: SHOOTING_STAR_CONFIG.cylinder.radiusTop,
        radiusBottom: SHOOTING_STAR_CONFIG.cylinder.radiusBottom,
        height: SHOOTING_STAR_CONFIG.cylinder.height,
        radialSegments: SHOOTING_STAR_CONFIG.cylinder.radialSegments,
        heightSegments: SHOOTING_STAR_CONFIG.cylinder.heightSegments,
      }}
      trailMaterial={SHOOTING_STAR_CONFIG.cylinder.material}
    />
  );
}
