import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useStarMotion } from './hooks/useStarMotion';

interface ShootingStarProps {
  startPosition: THREE.Vector3;
  direction: THREE.Vector3;
  speed: number;
}

export function ShootingStar({ startPosition, direction, speed }: ShootingStarProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const trailRef = useRef<THREE.Mesh>(null!);

  const reset = () => {
    meshRef.current?.position.copy(startPosition);
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI;
    direction
      .set(Math.sin(theta) * Math.cos(phi), Math.sin(theta) * Math.sin(phi), Math.cos(theta))
      .normalize();
  };

  const starColor = useMemo(() => {
    const palette = ['#fff', '#fffacd', '#e6e6fa', '#f0ffff', '#fff0f5'];
    return palette[Math.floor(Math.random() * palette.length)];
  }, []);

  useStarMotion({
    startPosition,
    direction,
    speed,
    onReset: reset,
    meshRef,
    trailRef,
  });

  return (
    <group>
      <mesh ref={meshRef} position={startPosition}>
        <sphereGeometry args={[0.015, 12, 12]} />
        <meshBasicMaterial color={starColor} transparent opacity={1} />
        <pointLight color={starColor} intensity={0.3} distance={1.5} decay={2} />
      </mesh>
      <mesh ref={trailRef} position={startPosition}>
        <cylinderGeometry args={[0, 0.01, 0.4, 8, 1]} />
        <meshBasicMaterial color={starColor} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}
