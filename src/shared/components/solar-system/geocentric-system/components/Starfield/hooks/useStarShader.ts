import * as THREE from 'three';
import { useMemo } from 'react';
import { STARFIELD_BACKGROUND_CONFIG } from '../StarfieldBackground.config';

export function useStarShader(starTexture: THREE.Texture) {
  return useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        starTexture: { value: starTexture },
      },
      vertexShader: STARFIELD_BACKGROUND_CONFIG.shaders.vertex,
      fragmentShader: STARFIELD_BACKGROUND_CONFIG.shaders.fragment,
      transparent: STARFIELD_BACKGROUND_CONFIG.material.transparent,
      blending: STARFIELD_BACKGROUND_CONFIG.material.blending,
      depthWrite: STARFIELD_BACKGROUND_CONFIG.material.depthWrite,
      depthTest: STARFIELD_BACKGROUND_CONFIG.material.depthTest,
    });
  }, [starTexture]);
}
