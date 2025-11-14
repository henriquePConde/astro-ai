import * as THREE from 'three';
import { Html } from '@react-three/drei';
import type { PlanetWithTrailViewProps } from './PlanetWithTrail.types';

export function PlanetWithTrailView({
  planetRef,
  trailMeshRef,
  ringTexture,
  planetColor,
  emissive,
  emissiveIntensity,
  texture,
  size,
  distance,
  name,
  visible,
  onPointerOver,
  material,
  ringGeometry,
  ringMaterial,
  trailMaterial,
  tooltipStyles,
  ringRotation,
  sphereSegments,
}: PlanetWithTrailViewProps) {
  return (
    <>
      {/* Orbital ring */}
      <mesh rotation={ringRotation}>
        <ringGeometry
          args={[ringGeometry.innerRadius, ringGeometry.outerRadius, ringGeometry.thetaSegments]}
        />
        <meshBasicMaterial
          map={ringTexture}
          transparent={ringMaterial.transparent}
          opacity={ringMaterial.opacity}
          side={ringMaterial.side}
        />
      </mesh>

      {/* Trail */}
      <mesh ref={trailMeshRef}>
        <bufferGeometry />
        <meshBasicMaterial
          vertexColors={trailMaterial.vertexColors}
          transparent={trailMaterial.transparent}
          opacity={trailMaterial.opacity}
          side={trailMaterial.side}
          depthWrite={trailMaterial.depthWrite}
        />
      </mesh>

      {/* Planet */}
      <mesh ref={planetRef} onPointerOver={onPointerOver}>
        <sphereGeometry args={[size, sphereSegments, sphereSegments]} />
        <meshPhysicalMaterial
          map={texture}
          color={planetColor}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
          metalness={material.metalness}
          roughness={material.roughness}
          clearcoat={material.clearcoat}
          clearcoatRoughness={material.clearcoatRoughness}
          sheen={material.sheen}
          sheenRoughness={material.sheenRoughness}
          sheenColor={material.sheenColor}
          envMapIntensity={material.envMapIntensity}
        />
        {visible && (
          <Html center>
            <div style={tooltipStyles}>{name}</div>
          </Html>
        )}
      </mesh>
    </>
  );
}
