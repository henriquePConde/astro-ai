import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useNebulaGeometry } from './hooks/useNebulaGeometry';

interface Props {
  position: THREE.Vector3;
  h: number;
  s: number;
  l: number;
  size: number;
  opacity: number;
}

export function Nebula({ position, h, s, l, size, opacity }: Props) {
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
      vertexShader: `
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
      fragmentShader: `
        uniform vec3 color;
        varying float vAlpha;
        
        void main() {
          float r = length(gl_PointCoord - vec2(0.5));
          if (r > 0.5) discard;
          
          float strength = 0.03 / (r + 0.03);
          gl_FragColor = vec4(color, vAlpha * strength * 0.7);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: true,
    });
    materialRef.current = mat;
    return mat;
  }, [h, s, l]);

  useFrame((_state, delta: number) => {
    materialRef.current.uniforms.time.value += delta * 0.2;

    // Animate hue very subtly
    const hue = (h + performance.now() * 0.00002) % 1;
    colorRef.current.setHSL(hue, s, l);
    materialRef.current.uniforms.color.value.copy(colorRef.current);

    if (particlesRef.current) {
      particlesRef.current.rotation.z += delta * 0.01;
      particlesRef.current.rotation.y += delta * 0.005;
    }
  });

  return (
    <points ref={particlesRef} position={position} renderOrder={-2}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-alpha" args={[alphas, 1]} />
      </bufferGeometry>
      <primitive object={material} attach="material" />
    </points>
  );
}
