import { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useEarthRotation } from './hooks/useEarthRotation';

export function Earth() {
  const earthRef = useRef<THREE.Mesh>(null!);
  const texture = useLoader(THREE.TextureLoader, '/planets/earth.jpg');

  useEarthRotation(earthRef);

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[0.3, 64, 64]} />
      <meshPhysicalMaterial
        map={texture}
        color={new THREE.Color('#87ceeb')}
        emissive={new THREE.Color('#b19cd9')}
        emissiveIntensity={0.4}
        metalness={0.2}
        roughness={0.5}
        clearcoat={0.3}
        clearcoatRoughness={0.2}
        sheen={0.15}
        sheenRoughness={0.4}
        sheenColor={new THREE.Color('#ffffff')}
        envMapIntensity={0.5}
      />
    </mesh>
  );
}
