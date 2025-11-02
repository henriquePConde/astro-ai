import * as THREE from 'three';
import { useMemo } from 'react';

export function useStarShader(starTexture: THREE.Texture) {
  return useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        starTexture: { value: starTexture },
      },
      vertexShader: `
        attribute float size;
        attribute float twinkleOffset;
        attribute vec3 color;
        varying float vTwinkleOffset;
        varying vec3 vColor;
        varying float vSize;

        void main() {
          vTwinkleOffset = twinkleOffset;
          vColor = color;
          vSize = size;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (500.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform sampler2D starTexture;
        varying float vTwinkleOffset;
        varying vec3 vColor;
        varying float vSize;

        void main() {
          vec4 texColor = texture2D(starTexture, gl_PointCoord);
          float twinkle = sin(time * 1.5 + vTwinkleOffset) * 0.4 + 0.6;
          vec3 color = vColor * texColor.rgb * 2.0 * twinkle;
          float alpha = texColor.a * twinkle;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
    });
  }, [starTexture]);
}
