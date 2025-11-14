'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import {
  Earth,
  PlanetWithTrail,
  StarfieldBackground,
  ShootingStars,
  NebulaField,
  AnimatedCamera,
} from './components';

import { LoadingScreen } from '../loading-screen';
import { styles } from './GeocentricSystem.styles';
import type { GeocentricSystemViewProps } from './GeocentricSystem.types';
import { GEOCENTRIC_SYSTEM_CONFIG } from './GeocentricSystem.config';

export function GeocentricSystemView({
  canAnimate,
  loadingOpacity,
  progress,
  planets,
  onIntroEnd,
}: GeocentricSystemViewProps) {
  const { camera, lights, animatedCamera, orbitControls } = GEOCENTRIC_SYSTEM_CONFIG;

  return (
    <div style={styles.root()}>
      <Canvas
        camera={{ position: camera.position, fov: camera.fov, far: camera.far }}
        style={styles.canvas()}
      >
        <ambientLight intensity={lights.ambient.intensity} />
        {lights.pointLights.map((light, index) => (
          <pointLight key={index} position={light.position} intensity={light.intensity} />
        ))}
        <color attach="background" args={[styles.backgroundColor()]} />

        <StarfieldBackground />
        <ShootingStars />
        <NebulaField />
        <Earth />

        {canAnimate && <AnimatedCamera target={animatedCamera.target} onFinish={onIntroEnd} />}

        {planets.map((planet) => (
          <PlanetWithTrail key={planet.name} {...planet} />
        ))}

        <OrbitControls
          minDistance={orbitControls.minDistance}
          maxDistance={orbitControls.maxDistance}
          enablePan={orbitControls.enablePan}
        />
      </Canvas>

      <LoadingScreen progress={progress} opacity={loadingOpacity} />
    </div>
  );
}
