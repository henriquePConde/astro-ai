import type { EarthViewProps } from './Earth.types';

export function EarthView({ earthRef, texture, geometryArgs, material }: EarthViewProps) {
  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={geometryArgs} />
      <meshPhysicalMaterial
        map={texture}
        color={material.color}
        emissive={material.emissive}
        emissiveIntensity={material.emissiveIntensity}
        metalness={material.metalness}
        roughness={material.roughness}
        clearcoat={material.clearcoat}
        clearcoatRoughness={material.clearcoatRoughness}
        sheen={material.sheen}
        sheenRoughness={material.sheenRoughness}
        sheenColor={material.sheenColor}
        envMapIntensity={material.envMapIntensity}
      />
    </mesh>
  );
}
