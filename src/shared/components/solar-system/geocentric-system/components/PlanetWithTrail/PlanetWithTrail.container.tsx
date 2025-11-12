'use client';

import { useRef, useMemo, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { usePlanetTrail } from './hooks/usePlanetTrail';
import { PlanetWithTrailView } from './PlanetWithTrail.view';
import type { PlanetWithTrailProps } from './PlanetWithTrail.types';
import { PLANET_WITH_TRAIL_CONFIG } from './PlanetWithTrail.config';
import { styles } from './PlanetWithTrail.styles';

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
  const [visible, setVisible] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

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

  const showTooltip = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setVisible(true);
    hoverTimeout.current = setTimeout(
      () => setVisible(false),
      PLANET_WITH_TRAIL_CONFIG.tooltip.timeout,
    );
  };

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    showTooltip();
  };

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
      name={name}
      visible={visible}
      onPointerOver={handlePointerOver}
      material={PLANET_WITH_TRAIL_CONFIG.material}
      ringGeometry={{
        innerRadius: distance + PLANET_WITH_TRAIL_CONFIG.ring.geometry.innerRadiusOffset,
        outerRadius: distance + PLANET_WITH_TRAIL_CONFIG.ring.geometry.outerRadiusOffset,
        thetaSegments: PLANET_WITH_TRAIL_CONFIG.ring.geometry.thetaSegments,
      }}
      ringMaterial={PLANET_WITH_TRAIL_CONFIG.ring.material}
      trailMaterial={PLANET_WITH_TRAIL_CONFIG.trail.material}
      tooltipStyles={styles.tooltip()}
      ringRotation={PLANET_WITH_TRAIL_CONFIG.ring.rotation}
      sphereSegments={PLANET_WITH_TRAIL_CONFIG.geometry.sphereSegments}
    />
  );
}
