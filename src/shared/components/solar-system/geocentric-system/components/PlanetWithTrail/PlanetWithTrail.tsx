import { useRef, useMemo, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { usePlanetTrail } from './hooks/usePlanetTrail';

interface Props {
  name: string;
  distance: number;
  speed: number;
  size?: number;
  textureFile: string;
}

export function PlanetWithTrail({ name, distance, speed, size = 0.1, textureFile }: Props) {
  const planetRef = useRef<THREE.Mesh>(null!);
  const angleRef = useRef(Math.random() * Math.PI * 2);
  const texture = useLoader(THREE.TextureLoader, `/planets/${textureFile}`);
  const trailMeshRef = usePlanetTrail(distance, speed, angleRef);
  const [visible, setVisible] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const ringTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 1;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#ffd6e6');
    gradient.addColorStop(0.5, '#ccf2ff');
    gradient.addColorStop(1, '#ffd6e6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return new THREE.CanvasTexture(canvas);
  }, []);

  const planetColor = useMemo(() => {
    const colors: Record<string, string> = {
      Sun: '#ffd700',
      Mercury: '#e6e6fa',
      Venus: '#ffe4b5',
      Earth: '#87ceeb',
      Mars: '#ffb6c1',
      Jupiter: '#ffefd5',
      Saturn: '#dda0dd',
      Uranus: '#e0ffff',
      Neptune: '#b0e0e6',
      Moon: '#f0f8ff',
      Pluto: '#ffe4e1',
    };
    return new THREE.Color(colors[name] || '#ffffff');
  }, [name]);

  const emissive = name === 'Sun' ? '#ffb6c1' : '#b19cd9';

  const getRotationSpeed = (name: string) => {
    const speeds: Record<string, number> = {
      Sun: 0.1,
      Mercury: 0.16,
      Venus: -0.14,
      Earth: 0.2,
      Mars: 0.19,
      Jupiter: 0.3,
      Saturn: 0.28,
      Uranus: 0.18,
      Neptune: 0.16,
      Moon: 0.06,
      Pluto: 0.08,
    };
    return speeds[name] ?? 0.2;
  };

  useFrame((_state, delta: number) => {
    angleRef.current += speed * delta;
    const x = distance * Math.cos(angleRef.current);
    const z = distance * Math.sin(angleRef.current);
    planetRef.current.position.set(x, 0, z);
    planetRef.current.rotation.y += delta * getRotationSpeed(name);
  });

  const showTooltip = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setVisible(true);
    hoverTimeout.current = setTimeout(() => setVisible(false), 3000);
  };

  return (
    <>
      {/* Orbital ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance - 0.003, distance + 0.005, 128]} />
        <meshBasicMaterial map={ringTexture} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Trail */}
      <mesh ref={trailMeshRef}>
        <bufferGeometry />
        <meshBasicMaterial
          vertexColors
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Planet */}
      <mesh
        ref={planetRef}
        onPointerOver={(e: any) => {
          e.stopPropagation();
          showTooltip();
        }}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshPhysicalMaterial
          map={texture}
          color={planetColor}
          emissive={new THREE.Color(emissive)}
          emissiveIntensity={name === 'Sun' ? 0.8 : 0.4}
          metalness={0.2}
          roughness={0.5}
          clearcoat={0.3}
          clearcoatRoughness={0.2}
          sheen={0.15}
          sheenRoughness={0.4}
          sheenColor={new THREE.Color('#ffffff')}
          envMapIntensity={0.5}
        />
        {visible && (
          <Html center>
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.75)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {name}
            </div>
          </Html>
        )}
      </mesh>
    </>
  );
}
