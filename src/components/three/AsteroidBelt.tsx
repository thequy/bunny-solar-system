'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function AsteroidBelt() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      const angle = (i / 150) * Math.PI * 2;
      const radius = 18 + Math.random() * 4;
      const height = (Math.random() - 0.5) * 1.5;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  const sizes = useMemo(() => {
    const s = new Float32Array(150);
    for (let i = 0; i < 150; i++) {
      s[i] = 0.1 + Math.random() * 0.15;
    }
    return s;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0008;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          args={[positions, 3]} 
        />
        <bufferAttribute 
          attach="attributes-size" 
          args={[sizes, 1]} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.2} 
        color={0x888888} 
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
      />
    </points>
  );
}