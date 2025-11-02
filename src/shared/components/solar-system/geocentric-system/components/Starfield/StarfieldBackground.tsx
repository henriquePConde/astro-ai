import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

import { useStarShader } from './hooks/useStarShader';
import { useStarfieldGeometry } from './hooks/useStarfieldGeometry';

export function StarfieldBackground() {
  const starsRef = useRef<THREE.Points>(null!);
  const backgroundRef = useRef<THREE.Group>(null!);

  const canvasTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  const { positions, sizes, colors, twinkleOffsets } = useStarfieldGeometry();
  const material = useStarShader(canvasTexture);

  useFrame((_state, delta: number) => {
    material.uniforms.time.value += delta;
    if (backgroundRef.current) {
      backgroundRef.current.rotation.y += delta * 0.01;
      backgroundRef.current.rotation.x += delta * 0.002;
    }
  });

  return (
    <group ref={backgroundRef}>
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="attributes-twinkleOffset" args={[twinkleOffsets, 1]} />
        </bufferGeometry>
        <primitive object={material} attach="material" />
      </points>
    </group>
  );
}
