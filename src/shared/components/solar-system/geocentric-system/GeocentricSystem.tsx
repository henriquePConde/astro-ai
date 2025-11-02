'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useSolarSystemConfig } from './hooks/useSolarSystemConfig';
import { useFadeInOnProgress } from './hooks/useFadeInOnProgress';

import {
  Earth,
  PlanetWithTrail,
  StarfieldBackground,
  ShootingStars,
  NebulaField,
  AnimatedCamera,
} from './components';

import { LoadingScreen } from '../loading-screen';

interface Props {
  onIntroEnd: () => void;
}

export function GeocentricSystem({ onIntroEnd }: Props) {
  const { canAnimate, loadingOpacity, progress } = useFadeInOnProgress();
  const planets = useSolarSystemConfig();

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 1.8, 2.4], fov: 45, far: 1000 }}
        style={{ background: '#030720' }}
      >
        <ambientLight intensity={1.2} />
        <pointLight position={[5, 5, 5]} intensity={1.8} />
        <pointLight position={[-5, -5, -5]} intensity={1.0} />
        <color attach="background" args={['#030720']} />

        <StarfieldBackground />
        <ShootingStars />
        <NebulaField />
        <Earth />

        {canAnimate && (
          <AnimatedCamera target={new THREE.Vector3(0, 2.0, 3.2)} onFinish={onIntroEnd} />
        )}

        {planets.map((planet) => (
          <PlanetWithTrail key={planet.name} {...planet} />
        ))}

        <OrbitControls minDistance={1} maxDistance={10} enablePan={false} />
      </Canvas>

      <LoadingScreen progress={progress} opacity={loadingOpacity} />
    </div>
  );
}
