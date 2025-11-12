import type { NebulaViewProps } from './Nebula.types';

export function NebulaView({
  particlesRef,
  material,
  positions,
  sizes,
  alphas,
  position,
  renderOrder,
}: NebulaViewProps) {
  return (
    <points ref={particlesRef} position={position} renderOrder={renderOrder}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-alpha" args={[alphas, 1]} />
      </bufferGeometry>
      <primitive object={material} attach="material" />
    </points>
  );
}
