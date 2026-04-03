'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function KuiperBelt() {
  const beltRef = useRef<THREE.Group>(null);
  
  // Generate random asteroid positions in the Kuiper belt
  const asteroids = useMemo(() => {
    const count = 300;
    const positions: { x: number; z: number; size: number; color: number }[] = [];
    
    for (let i = 0; i < count; i++) {
      // Kuiper belt: 30-50 AU, we'll map to scene units (75-95)
      const angle = Math.random() * Math.PI * 2;
      const distance = 75 + Math.random() * 20;
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      const size = 0.05 + Math.random() * 0.15;
      
      // Various colors: gray, brown, icy blue
      const colors = [0x888888, 0xa08060, 0x6090a0, 0xc0c0c0];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      positions.push({ x, z, size, color });
    }
    
    return positions;
  }, []);
  
  useFrame((state) => {
    if (beltRef.current) {
      // Slow rotation of the entire belt
      beltRef.current.rotation.y += 0.0002;
    }
  });
  
  return (
    <group ref={beltRef}>
      {/* Kuiper belt particles */}
      {asteroids.map((asteroid, i) => {
        return (
          <mesh key={i} position={[asteroid.x, 0, asteroid.z]}>
            <sphereGeometry args={[asteroid.size, 8, 8]} />
            <meshStandardMaterial 
              color={asteroid.color} 
              roughness={0.9}
              metalness={0.1}
            />
          </mesh>
        );
      })}
      
      {/* Belt ring visualization - subtle glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[75, 95, 64]} />
        <meshBasicMaterial 
          color={0x446688} 
          side={THREE.DoubleSide} 
          transparent 
          opacity={0.08} 
        />
      </mesh>
    </group>
  );
}