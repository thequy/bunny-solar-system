'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PLANET_DATA } from '@/data/planets';

interface SunProps {
  onClick?: (id: string) => void;
}

export default function Sun({ onClick }: SunProps) {
  const sunRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
  });

  const handleClick = () => {
    if (onClick) onClick('sun');
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
      <mesh 
        ref={sunRef} 
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial color={0xffdd00} />
        {isHovered && (
          <Html distanceFactor={15} position={[0, 5, 0]}>
            <div className="planet-tooltip">
              <div className="tooltip-name">{PLANET_DATA.sun.name.vi}</div>
              <div className="tooltip-desc">{PLANET_DATA.sun.description.vi}</div>
            </div>
          </Html>
        )}
      </mesh>
      <mesh>
        <sphereGeometry args={[4.5, 32, 32]} />
        <meshBasicMaterial color={0xffaa00} transparent opacity={0.3} />
      </mesh>
      <pointLight color={0xffffee} intensity={3} distance={300} />
    </group>
  );
}
