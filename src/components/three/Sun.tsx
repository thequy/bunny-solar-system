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
  const [isHovered, setIsHovered] = useState(false);
  
  // Simple glow material for corona
  const coronaMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        glowColor: { value: new THREE.Color(0xffaa00) }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normal;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 glowColor;
        varying vec3 vNormal;
        
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          float pulse = 0.9 + sin(time * 2.0) * 0.1;
          gl_FragColor = vec4(glowColor, intensity * 0.5 * pulse);
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
    coronaMaterial.uniforms.time.value = time;
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
      {/* Corona glow - subtle animated effect */}
      <mesh>
        <sphereGeometry args={[5.2, 32, 32]} />
        <primitive object={coronaMaterial} attach="material" />
      </mesh>
      
      {/* Outer atmosphere - warm glow */}
      <mesh>
        <sphereGeometry args={[4.6, 32, 32]} />
        <meshBasicMaterial color={0xff9900} transparent opacity={0.25} />
      </mesh>
      
      {/* Inner atmosphere - orange tint */}
      <mesh>
        <sphereGeometry args={[4.3, 32, 32]} />
        <meshBasicMaterial color={0xffcc00} transparent opacity={0.3} />
      </mesh>
      
      {/* Photosphere - main surface */}
      <mesh 
        ref={sunRef} 
        onPointerDown={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[4, 64, 64]} />
        <meshBasicMaterial color={0xffdd00} />
      </mesh>
      
      {/* Core highlight */}
      <mesh>
        <sphereGeometry args={[3.2, 32, 32]} />
        <meshBasicMaterial color={0xffffff} transparent opacity={0.4} />
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