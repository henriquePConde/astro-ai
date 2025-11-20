'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { usePlanetTrail } from './hooks/usePlanetTrail';
import { PlanetWithTrailView } from './PlanetWithTrail.view';
import type { PlanetWithTrailProps } from './PlanetWithTrail.types';
import { PLANET_WITH_TRAIL_CONFIG } from './PlanetWithTrail.config';

export function PlanetWithTrailContainer({
  name,
  distance,
  speed,
  size = PLANET_WITH_TRAIL_CONFIG.defaultSize,
  textureFile,
}: PlanetWithTrailProps) {
  const planetRef = useRef<THREE.Mesh>(null!);
  const angleRef = useRef(Math.random() * Math.PI * 2);
  const texture = useLoader(
    THREE.TextureLoader,
    `${PLANET_WITH_TRAIL_CONFIG.texturePath}/${textureFile}`,
  );
  const trailMeshRef = usePlanetTrail(distance, speed, angleRef);

  const ringTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = PLANET_WITH_TRAIL_CONFIG.ring.canvas.width;
    canvas.height = PLANET_WITH_TRAIL_CONFIG.ring.canvas.height;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    PLANET_WITH_TRAIL_CONFIG.ring.gradient.stops.forEach((stop) => {
      gradient.addColorStop(stop.offset, stop.color);
    });
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return new THREE.CanvasTexture(canvas);
  }, []);

  const planetColor = useMemo(() => {
    const colorHex =
      PLANET_WITH_TRAIL_CONFIG.planetColors[
        name as keyof typeof PLANET_WITH_TRAIL_CONFIG.planetColors
      ] || PLANET_WITH_TRAIL_CONFIG.planetColors.default;
    return new THREE.Color(colorHex);
  }, [name]);

  const emissive = useMemo(() => {
    const emissiveHex =
      name === 'Sun'
        ? PLANET_WITH_TRAIL_CONFIG.emissiveColors.sun
        : PLANET_WITH_TRAIL_CONFIG.emissiveColors.default;
    return new THREE.Color(emissiveHex);
  }, [name]);

  const emissiveIntensity =
    name === 'Sun'
      ? PLANET_WITH_TRAIL_CONFIG.emissiveIntensity.sun
      : PLANET_WITH_TRAIL_CONFIG.emissiveIntensity.default;

  const getRotationSpeed = (planetName: string) => {
    return (
      PLANET_WITH_TRAIL_CONFIG.rotationSpeeds[
        planetName as keyof typeof PLANET_WITH_TRAIL_CONFIG.rotationSpeeds
      ] ?? PLANET_WITH_TRAIL_CONFIG.rotationSpeeds.default
    );
  };

  useFrame((_state, delta: number) => {
    angleRef.current += speed * delta;
    const x = distance * Math.cos(angleRef.current);
    const z = distance * Math.sin(angleRef.current);
    planetRef.current.position.set(x, 0, z);
    planetRef.current.rotation.y += delta * getRotationSpeed(name);
  });

  return (
    <PlanetWithTrailView
      planetRef={planetRef}
      trailMeshRef={trailMeshRef}
      ringTexture={ringTexture}
      planetColor={planetColor}
      emissive={emissive}
      emissiveIntensity={emissiveIntensity}
      texture={texture}
      size={size}
      distance={distance}
      material={PLANET_WITH_TRAIL_CONFIG.material}
      ringGeometry={{
        innerRadius: distance + PLANET_WITH_TRAIL_CONFIG.ring.geometry.innerRadiusOffset,
        outerRadius: distance + PLANET_WITH_TRAIL_CONFIG.ring.geometry.outerRadiusOffset,
        thetaSegments: PLANET_WITH_TRAIL_CONFIG.ring.geometry.thetaSegments,
      }}
      ringMaterial={PLANET_WITH_TRAIL_CONFIG.ring.material}
      trailMaterial={PLANET_WITH_TRAIL_CONFIG.trail.material}
      ringRotation={PLANET_WITH_TRAIL_CONFIG.ring.rotation}
      sphereSegments={PLANET_WITH_TRAIL_CONFIG.geometry.sphereSegments}
    />
  );
}
