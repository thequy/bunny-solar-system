'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SunProps {
  onClick?: (id: string) => void;
}

export default function Sun({ onClick }: SunProps) {
  const sunRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
  });

  const handleClick = () => {
    if (onClick) onClick('sun');
  };

  return (
    <group>
      <mesh ref={sunRef} onClick={handleClick}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial color={0xffdd00} />
      </mesh>
      <mesh>
        <sphereGeometry args={[4.5, 32, 32]} />
        <meshBasicMaterial color={0xffaa00} transparent opacity={0.3} />
      </mesh>
      <pointLight color={0xffffee} intensity={2} distance={300} />
    </group>
  );
}
