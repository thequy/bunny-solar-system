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
  
  // Corona shader - extends into space with solar wind
  const coronaMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
        
        void main() {
          float edgeFactor = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
          float pulse = 0.85 + sin(time * 1.5) * 0.15;
          float angle = atan(vPosition.y, vPosition.x);
          float streamer = sin(angle * 8.0 + time * 0.5) * 0.3 + 0.7;
          vec3 coronaColor = vec3(1.0, 0.7, 0.3);
          float alpha = edgeFactor * 0.4 * pulse * streamer;
          gl_FragColor = vec4(coronaColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, []);
  
  // Chromosphere shader - faculae and flares
  const chromoMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        
        float noise(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453);
        }
        
        void main() {
          vec3 chromoColor = vec3(1.0, 0.3, 0.2);
          float faculae = noise(vUv * 20.0 + time * 0.3);
          faculae = smoothstep(0.6, 0.9, faculae);
          float emission = 0.3 + faculae * 0.4;
          gl_FragColor = vec4(chromoColor, emission);
        }
      `,
      transparent: true,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, []);
  
  // Photosphere shader - granulation and sunspots
  const photosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        
        float noise(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453);
        }
        
        void main() {
          vec2 uv = vUv * 30.0;
          float grain = noise(uv + time * 0.1);
          float spot1 = smoothstep(0.4, 0.35, distance(vUv, vec2(0.3, 0.4)));
          float spot2 = smoothstep(0.3, 0.25, distance(vUv, vec2(0.7, 0.6)));
          float spots = max(spot1, spot2) * 0.6;
          vec3 baseColor = vec3(1.0, 0.9, 0.2);
          baseColor += (grain - 0.5) * 0.15;
          baseColor = mix(baseColor, vec3(0.2, 0.1, 0.0), spots);
          gl_FragColor = vec4(baseColor, 1.0);
        }
      `,
      side: THREE.FrontSide
    });
  }, []);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
    coronaMaterial.uniforms.time.value = time;
    chromoMaterial.uniforms.time.value = time;
    photosphereMaterial.uniforms.time.value = time;
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
      {/* CORONA - outermost (khu vực ngoài cùng, mở rộng vào không gian) */}
      <mesh>
        <sphereGeometry args={[6.5, 64, 64]} />
        <primitive object={coronaMaterial} attach="material" />
      </mesh>
      
      {/* Corona outer glow */}
      <mesh>
        <sphereGeometry args={[5.8, 32, 32]} />
        <meshBasicMaterial color={0xff8800} transparent opacity={0.15} side={THREE.BackSide} />
      </mesh>
      
      {/* CHROMOSPHERE - tầng sắc tố (faculae và pháo sáng) */}
      <mesh>
        <sphereGeometry args={[4.5, 64, 64]} />
        <primitive object={chromoMaterial} attach="material" />
      </mesh>
      
      {/* Chromosphere glow */}
      <mesh>
        <sphereGeometry args={[4.3, 32, 32]} />
        <meshBasicMaterial color={0xff4400} transparent opacity={0.2} />
      </mesh>
      
      {/* PHOTOSPHERE - quang quyển (bề mặt nhìn thấy, có vết đen) */}
      <mesh 
        ref={sunRef} 
        onPointerDown={handlePointerDown}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[4, 64, 64]} />
        <primitive object={photosphereMaterial} attach="material" />
      </mesh>
      
      {/* Core - nóng nhất bên trong */}
      <mesh>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color={0xffffff} />
      </mesh>
      
      {/* Inner core glow */}
      <mesh>
        <sphereGeometry args={[3.0, 32, 32]} />
        <meshBasicMaterial color={0xffffaa} transparent opacity={0.5} />
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