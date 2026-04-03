'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetData } from '@/types';
import { PLANET_DATA } from '@/data/planets';

interface PlanetProps {
  id: string;
  data: PlanetData;
  onClick: (id: string) => void;
  isSelected: boolean;
}

export default function Planet({ id, data, onClick, isSelected }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  const initialAngle = useMemo(() => Math.random() * Math.PI * 2, []);
  const moonInitialAngle = useMemo(() => Math.random() * Math.PI * 2, []);
  const [isHovered, setIsHovered] = useState(false);
  const [isMoonHovered, setIsMoonHovered] = useState(false);
  const orbitRadius = data.size * 2;

  const moonData = PLANET_DATA.moon;
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const planetX = Math.cos(initialAngle + time * data.speed * 10) * data.distance;
      const planetZ = Math.sin(initialAngle + time * data.speed * 10) * data.distance;
      
      meshRef.current.position.x = planetX;
      meshRef.current.position.z = planetZ;
      meshRef.current.rotation.y += 0.01;

      if (moonRef.current && id === 'earth') {
        moonRef.current.position.x = planetX + Math.cos(moonInitialAngle + time * 0.5) * orbitRadius;
        moonRef.current.position.z = planetZ + Math.sin(moonInitialAngle + time * 0.5) * orbitRadius;
      }
    }
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    // Trigger click on pointer down
    if (onClick) onClick(id);
  };

  const handlePointerOver = () => {
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    document.body.style.cursor = 'auto';
  };

  const handleMoonPointerOver = () => {
    setIsMoonHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handleMoonPointerOut = () => {
    setIsMoonHovered(false);
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
        onPointerDown={handlePointerDown}
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
        <mesh>
          <sphereGeometry args={[data.size * 1.15, 32, 32]} />
          <meshBasicMaterial color={data.color} transparent opacity={0.15} side={THREE.BackSide} />
        </mesh>
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
      {id === 'earth' && (
        <mesh 
          ref={moonRef} 
          position={[Math.cos(initialAngle) * data.distance + orbitRadius, 0, Math.sin(initialAngle) * data.distance]}
          onPointerOver={handleMoonPointerOver}
          onPointerOut={handleMoonPointerOut}
        onClick={() => onClick('moon')}
        >
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial 
            color={0xcccccc} 
            roughness={0.2} 
            metalness={0.5}
            emissive={isMoonHovered ? 0x444444 : 0x222222}
          />
          {isMoonHovered && (
            <Html distanceFactor={15} position={[0, 0.8, 0]}>
              <div className="planet-tooltip">
                <div className="tooltip-name">{moonData.name.vi}</div>
                <div className="tooltip-desc">{moonData.description.vi}</div>
              </div>
            </Html>
          )}
        </mesh>
      )}
    </group>
  );
}
