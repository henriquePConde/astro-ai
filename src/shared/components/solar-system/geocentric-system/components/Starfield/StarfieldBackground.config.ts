import * as THREE from 'three';

export const STARFIELD_BACKGROUND_CONFIG = {
  canvas: {
    width: 32,
    height: 32,
    gradient: {
      centerX: 16,
      centerY: 16,
      innerRadius: 0,
      outerRadius: 16,
      stops: [
        { offset: 0, color: 'white' },
        { offset: 1, color: 'rgba(255,255,255,0)' },
      ],
    },
  },
  shaders: {
    vertex: `
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
    fragment: `
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
  },
  material: {
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false,
  },
  animation: {
    rotationY: 0.01,
    rotationX: 0.002,
  },
} as const;
