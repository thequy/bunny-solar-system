'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PLANET_DATA } from '@/data/planets';

interface SunProps {
  onClick?: (id: string) => void;
}

export default function Sun({ onClick }: SunProps) {
  const sunRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Create animated shader for corona
  const coronaMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0xff6600) },
        color2: { value: new THREE.Color(0xffdd00) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normal;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        varying vec3 vNormal;
        
        // Simple noise function
        float noise(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        void main() {
          float n = noise(vUv * 10.0 + time * 0.5);
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 color = mix(color1, color2, n + time * 0.2);
          float alpha = intensity * 0.6 * (0.8 + n * 0.4);
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, []);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
    // Animate corona
    if (coronaMaterial) {
      coronaMaterial.uniforms.time.value = time;
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.y -= 0.001;
    }
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
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
      {/* Corona - outermost layer */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[6.5, 32, 32]} />
        <primitive object={coronaMaterial} attach="material" />
      </mesh>
      
      {/* Chromosphere - orange glow */}
      <mesh>
        <sphereGeometry args={[5.2, 32, 32]} />
        <meshBasicMaterial color={0xff6600} transparent opacity={0.4} />
      </mesh>
      
      {/* Transition zone */}
      <mesh>
        <sphereGeometry args={[4.8, 32, 32]} />
        <meshBasicMaterial color={0xffaa00} transparent opacity={0.3} />
      </mesh>
      
      {/* Photosphere - visible surface */}
      <mesh 
        ref={sunRef} 
        onPointerDown={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[4, 64, 64]} />
        <meshBasicMaterial color={0xffff00} />
      </mesh>
      
      {/* Inner bright core */}
      <mesh>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshBasicMaterial color={0xffffff} transparent opacity={0.3} />
      </mesh>
      
      {isHovered && (
        <Html distanceFactor={15} position={[0, 5, 0]}>
          <div className="planet-tooltip">
            <div className="tooltip-name">{PLANET_DATA.sun.name.vi}</div>
            <div className="tooltip-desc">{PLANET_DATA.sun.description.vi}</div>
          </div>
        </Html>
      )}
      
      {/* Point light from sun */}
      <pointLight color={0xffffee} intensity={3} distance={300} />
    </group>
  );
}