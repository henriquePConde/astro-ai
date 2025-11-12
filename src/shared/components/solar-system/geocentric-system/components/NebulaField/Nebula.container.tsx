'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useNebulaGeometry } from './hooks/useNebulaGeometry';
import { NebulaView } from './Nebula.view';
import type { NebulaProps } from './Nebula.types';
import { NEBULA_CONFIG } from './Nebula.config';

export function NebulaContainer({ position, h, s, l, size, opacity }: NebulaProps) {
  const particlesRef = useRef<THREE.Points>(null!);
  const colorRef = useRef(new THREE.Color());
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const { positions, sizes, alphas } = useNebulaGeometry(position, size, opacity);

  const material = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: colorRef.current.setHSL(h, s, l) },
        time: { value: 0 },
      },
      vertexShader: NEBULA_CONFIG.shaders.vertex,
      fragmentShader: NEBULA_CONFIG.shaders.fragment,
      transparent: NEBULA_CONFIG.material.transparent,
      blending: NEBULA_CONFIG.material.blending,
      depthWrite: NEBULA_CONFIG.material.depthWrite,
      depthTest: NEBULA_CONFIG.material.depthTest,
    });
    materialRef.current = mat;
    return mat;
  }, [h, s, l]);

  useFrame((_state, delta: number) => {
    materialRef.current.uniforms.time.value += delta * NEBULA_CONFIG.animation.timeSpeed;

    // Animate hue very subtly
    const hue = (h + performance.now() * NEBULA_CONFIG.animation.hueSpeed) % 1;
    colorRef.current.setHSL(hue, s, l);
    materialRef.current.uniforms.color.value.copy(colorRef.current);

    if (particlesRef.current) {
      particlesRef.current.rotation.z += delta * NEBULA_CONFIG.animation.rotationZ;
      particlesRef.current.rotation.y += delta * NEBULA_CONFIG.animation.rotationY;
    }
  });

  return (
    <NebulaView
      particlesRef={particlesRef}
      material={material}
      positions={positions}
      sizes={sizes}
      alphas={alphas}
      position={position}
      renderOrder={NEBULA_CONFIG.render.renderOrder}
    />
  );
}
