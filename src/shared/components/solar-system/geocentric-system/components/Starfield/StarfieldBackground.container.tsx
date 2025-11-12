'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStarShader } from './hooks/useStarShader';
import { useStarfieldGeometry } from './hooks/useStarfieldGeometry';
import { StarfieldBackgroundView } from './StarfieldBackground.view';
import { STARFIELD_BACKGROUND_CONFIG } from './StarfieldBackground.config';

export function StarfieldBackgroundContainer() {
  const starsRef = useRef<THREE.Points>(null!);
  const backgroundRef = useRef<THREE.Group>(null!);

  const canvasTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = STARFIELD_BACKGROUND_CONFIG.canvas.width;
    canvas.height = STARFIELD_BACKGROUND_CONFIG.canvas.height;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(
      STARFIELD_BACKGROUND_CONFIG.canvas.gradient.centerX,
      STARFIELD_BACKGROUND_CONFIG.canvas.gradient.centerY,
      STARFIELD_BACKGROUND_CONFIG.canvas.gradient.innerRadius,
      STARFIELD_BACKGROUND_CONFIG.canvas.gradient.centerX,
      STARFIELD_BACKGROUND_CONFIG.canvas.gradient.centerY,
      STARFIELD_BACKGROUND_CONFIG.canvas.gradient.outerRadius,
    );
    STARFIELD_BACKGROUND_CONFIG.canvas.gradient.stops.forEach((stop) => {
      gradient.addColorStop(stop.offset, stop.color);
    });
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  const { positions, sizes, colors, twinkleOffsets } = useStarfieldGeometry();
  const material = useStarShader(canvasTexture);

  useFrame((_state, delta: number) => {
    material.uniforms.time.value += delta;
    if (backgroundRef.current) {
      backgroundRef.current.rotation.y += delta * STARFIELD_BACKGROUND_CONFIG.animation.rotationY;
      backgroundRef.current.rotation.x += delta * STARFIELD_BACKGROUND_CONFIG.animation.rotationX;
    }
  });

  return (
    <StarfieldBackgroundView
      starsRef={starsRef}
      backgroundRef={backgroundRef}
      canvasTexture={canvasTexture}
      material={material}
      positions={positions}
      sizes={sizes}
      colors={colors}
      twinkleOffsets={twinkleOffsets}
    />
  );
}
