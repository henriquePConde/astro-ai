import type { StarfieldBackgroundViewProps } from './StarfieldBackground.types';

export function StarfieldBackgroundView({
  starsRef,
  backgroundRef,
  canvasTexture,
  material,
  positions,
  sizes,
  colors,
  twinkleOffsets,
}: StarfieldBackgroundViewProps) {
  return (
    <group ref={backgroundRef}>
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          <bufferAttribute attach="attributes-twinkleOffset" args={[twinkleOffsets, 1]} />
        </bufferGeometry>
        <primitive object={material} attach="material" />
      </points>
    </group>
  );
}
