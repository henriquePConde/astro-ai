import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarMotionOptions {
  startPosition: THREE.Vector3;
  direction: THREE.Vector3;
  speed: number;
  onReset: () => void;
  meshRef: React.RefObject<THREE.Mesh>;
  trailRef: React.RefObject<THREE.Mesh>;
}

export function useStarMotion({
  startPosition,
  direction,
  speed,
  onReset,
  meshRef,
  trailRef,
}: StarMotionOptions) {
  const [isActive, setIsActive] = useState(true);
  const timeRef = useRef(0);

  useFrame((_state, delta: number) => {
    if (!isActive) return;

    timeRef.current += delta;

    const mesh = meshRef.current;
    const trail = trailRef.current;

    if (!mesh) return;

    mesh.position.addScaledVector(direction, speed * delta);

    const distance = mesh.position.distanceTo(startPosition);
    const progress = distance / 100;

    let opacity = 1;
    if (progress < 0.1) opacity = progress / 0.1;
    else if (progress > 0.6) opacity = 1 - (progress - 0.6) / 0.4;

    opacity = THREE.MathUtils.clamp(opacity, 0, 1);

    if (mesh.material instanceof THREE.MeshBasicMaterial) {
      mesh.material.opacity = opacity;
    }

    if (trail) {
      const offset = direction.clone().multiplyScalar(-0.2);
      trail.position.copy(mesh.position).add(offset);
      trail.lookAt(mesh.position.clone().add(direction));
      trail.rotateX(Math.PI / 2);

      if (trail.material instanceof THREE.MeshBasicMaterial) {
        trail.material.opacity = opacity * 0.5;
      }
    }

    if (progress >= 1 || opacity <= 0) {
      setIsActive(false);
      timeRef.current = 0;
      onReset();

      setTimeout(() => setIsActive(true), Math.random() * 2000 + 1000);
    }
  });
}
