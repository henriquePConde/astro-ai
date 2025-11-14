import type { ShootingStarViewProps } from './ShootingStar.types';

export function ShootingStarView({
  meshRef,
  trailRef,
  startPosition,
  starColor,
  sphereGeometry,
  sphereMaterial,
  pointLight,
  cylinderGeometry,
  trailMaterial,
}: ShootingStarViewProps) {
  return (
    <group>
      <mesh ref={meshRef} position={startPosition}>
        <sphereGeometry
          args={[
            sphereGeometry.radius,
            sphereGeometry.widthSegments,
            sphereGeometry.heightSegments,
          ]}
        />
        <meshBasicMaterial
          color={starColor}
          transparent={sphereMaterial.transparent}
          opacity={sphereMaterial.opacity}
        />
        <pointLight
          color={starColor}
          intensity={pointLight.intensity}
          distance={pointLight.distance}
          decay={pointLight.decay}
        />
      </mesh>
      <mesh ref={trailRef} position={startPosition}>
        <cylinderGeometry
          args={[
            cylinderGeometry.radiusTop,
            cylinderGeometry.radiusBottom,
            cylinderGeometry.height,
            cylinderGeometry.radialSegments,
            cylinderGeometry.heightSegments,
          ]}
        />
        <meshBasicMaterial
          color={starColor}
          transparent={trailMaterial.transparent}
          opacity={trailMaterial.opacity}
        />
      </mesh>
    </group>
  );
}
