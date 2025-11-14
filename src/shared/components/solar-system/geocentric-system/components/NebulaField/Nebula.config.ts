import * as THREE from 'three';

export const NEBULA_CONFIG = {
  shaders: {
    vertex: `
      attribute float size;
      attribute float alpha;
      varying float vAlpha;
      uniform float time;
      
      void main() {
        vAlpha = alpha;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float dist = length(position - cameraPosition);
        gl_PointSize = size * (200.0 / dist);
        gl_Position = projectionMatrix * mvPosition;
        
        // Add subtle movement
        gl_Position.x += sin(time + position.z * 0.02) * 0.01;
        gl_Position.y += cos(time + position.x * 0.02) * 0.01;
      }
    `,
    fragment: `
      uniform vec3 color;
      varying float vAlpha;
      
      void main() {
        float r = length(gl_PointCoord - vec2(0.5));
        if (r > 0.5) discard;
        
        float strength = 0.03 / (r + 0.03);
        gl_FragColor = vec4(color, vAlpha * strength * 0.7);
      }
    `,
  },
  material: {
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: true,
  },
  animation: {
    timeSpeed: 0.2,
    hueSpeed: 0.00002,
    rotationZ: 0.01,
    rotationY: 0.005,
  },
  render: {
    renderOrder: -2,
  },
} as const;
