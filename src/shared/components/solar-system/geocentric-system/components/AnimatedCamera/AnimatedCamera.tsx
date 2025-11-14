import { useThree, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface AnimatedCameraProps {
  target: THREE.Vector3;
  onFinish: () => void;
}

export function AnimatedCamera({ target, onFinish }: AnimatedCameraProps) {
  const { camera } = useThree();
  const animationDone = useRef(false);

  useFrame((_state, delta: number) => {
    if (animationDone.current) return;

    camera.position.lerp(target, delta * 2);

    if (camera.position.distanceTo(target) < 0.05) {
      camera.position.copy(target);
      animationDone.current = true;
      onFinish();
    }
  });

  return null;
}
