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

// Planet-specific surface effects
function getPlanetSurfaceEffects(id: string, color: number) {
  const colorHex = '#' + color.toString(16).padStart(6, '0');
  
  switch (id) {
    case 'jupiter':
      return {
        bands: true,
        bandColors: [0xd9a86a, 0xc49a5a, 0xe6b87a, 0xbf9a5a]
      };
    case 'saturn':
      return {
        bands: true,
        bandColors: [0xe6d98a, 0xd4c47a, 0xf0e0a0, 0xc9b96a]
      };
    case 'uranus':
      return {
        bands: true,
        bandColors: [0x8ad9d9, 0x7acaca, 0xa0e8e8, 0x6acaca]
      };
    case 'neptune':
      return {
        bands: true,
        bandColors: [0x4a6ad9, 0x3a5aca, 0x5a7ae9, 0x2a4aba]
      };
    case 'earth':
      return {
        atmosphere: true,
        clouds: true
      };
    case 'mars':
      return {
        dust: true
      };
    default:
      return {};
  }
}

export default function Planet({ id, data, onClick, isSelected }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const initialAngle = useMemo(() => Math.random() * Math.PI * 2, []);
  const moonInitialAngle = useMemo(() => Math.random() * Math.PI * 2, []);
  const [isHovered, setIsHovered] = useState(false);
  const [isMoonHovered, setIsMoonHovered] = useState(false);
  const orbitRadius = data.size * 2;

  const moonData = PLANET_DATA.moon;
  const surfaceEffects = getPlanetSurfaceEffects(id, data.color);
  
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

  // Render gas giant bands
  const renderBands = () => {
    if (!surfaceEffects.bands) return null;
    
    return (
      <group>
        {surfaceEffects.bandColors?.map((bandColor, i) => (
          <mesh key={i} rotation={[0, 0, i * 0.3]}>
            <cylinderGeometry args={[data.size * 0.98, data.size * 0.98, data.size * 0.1, 32]} />
            <meshBasicMaterial color={bandColor} transparent opacity={0.4} />
          </mesh>
        ))}
      </group>
    );
  };

  // Render Earth-specific effects
  const renderEarthEffects = () => {
    return (
      <group>
        {/* Cloud layer */}
        <mesh>
          <sphereGeometry args={[data.size * 1.02, 32, 32]} />
          <meshBasicMaterial color={0xffffff} transparent opacity={0.25} />
        </mesh>
        {/* Atmosphere glow */}
        <mesh>
          <sphereGeometry args={[data.size * 1.08, 32, 32]} />
          <meshBasicMaterial color={0x6ab0e9} transparent opacity={0.1} side={THREE.BackSide} />
        </mesh>
      </group>
    );
  };

  // Render Mars dust effect
  const renderMarsEffects = () => {
    return (
      <mesh>
        <sphereGeometry args={[data.size * 1.05, 32, 32]} />
        <meshBasicMaterial color={0xd94a3a} transparent opacity={0.15} />
      </mesh>
    );
  };

  // Render rocky planet atmosphere/atmosphere
  const renderAtmosphere = () => {
    if (id === 'venus') {
      return (
        <mesh>
          <sphereGeometry args={[data.size * 1.08, 32, 32]} />
          <meshBasicMaterial color={0xe6c87a} transparent opacity={0.2} />
        </mesh>
      );
    }
    if (id === 'earth') {
      return renderEarthEffects();
    }
    if (id === 'mars') {
      return renderMarsEffects();
    }
    return null;
  };

  return (
    <group>
      {/* Orbit ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[data.distance - 0.1, data.distance + 0.1, 64]} />
        <meshBasicMaterial color={0x3a3a5a} side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>
      
      {/* Main planet */}
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
        
        {/* Planet-specific effects */}
        {renderBands()}
        {renderAtmosphere()}
        
        {/* Planet rings */}
        {data.hasRings && (
          <mesh rotation={[Math.PI / 2.5, 0, 0]}>
            <ringGeometry args={[data.size * 1.4, data.size * 2.2, 32]} />
            <meshBasicMaterial color={0xc9b96a} side={THREE.DoubleSide} transparent opacity={0.7} />
          </mesh>
        )}
        
        {/* Hover tooltip */}
        {isHovered && (
          <Html distanceFactor={15} position={[0, data.size + 0.5, 0]}>
            <div className="planet-tooltip">
              <div className="tooltip-name">{data.name.vi}</div>
              <div className="tooltip-desc">{data.description.vi}</div>
            </div>
          </Html>
        )}
      </mesh>
      
      {/* Moon for Earth */}
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