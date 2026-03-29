'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetData } from '@/types';

interface PlanetProps {
  id: string;
  data: PlanetData;
  onClick: (id: string) => void;
  isSelected: boolean;
}

export default function Planet({ id, data, onClick, isSelected }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialAngle = useMemo(() => Math.random() * Math.PI * 2, []);
  const [isHovered, setIsHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.x = Math.cos(initialAngle + time * data.speed * 10) * data.distance;
      meshRef.current.position.z = Math.sin(initialAngle + time * data.speed * 10) * data.distance;
      meshRef.current.rotation.y += 0.01;
    }
  });

  const handleClick = () => {
    onClick(id);
  };

  const handlePointerOver = () => {
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[data.distance - 0.1, data.distance + 0.1, 64]} />
        <meshBasicMaterial color={0x3a3a5a} side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        position={[Math.cos(initialAngle) * data.distance, 0, Math.sin(initialAngle) * data.distance]}
      >
        <sphereGeometry args={[data.size, 32, 32]} />
        <meshStandardMaterial
          color={data.color}
          roughness={0.8}
          metalness={0.1}
          emissive={isSelected ? 0x222222 : 0x000000}
        />
        {data.hasRings && (
          <mesh rotation={[Math.PI / 2.5, 0, 0]}>
            <ringGeometry args={[data.size * 1.4, data.size * 2.2, 32]} />
            <meshBasicMaterial color={0xc9b96a} side={THREE.DoubleSide} transparent opacity={0.7} />
          </mesh>
        )}
        {isHovered && (
          <Html distanceFactor={15} position={[0, data.size + 0.5, 0]}>
            <div className="planet-tooltip">
              <div className="tooltip-name">{data.name.vi}</div>
              <div className="tooltip-desc">{data.description.vi}</div>
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
}
