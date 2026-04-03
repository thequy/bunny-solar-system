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
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        float hash(float n) { return fract(sin(n) * 43758.5453); }
        
        // Sunspot positions based on typical solar cycle patterns
        vec2 spotPositions[6];
        float spotSizes[6];
        
        void initSpots() {
          // Mid-latitude sunspot groups - realistic distribution
          spotPositions[0] = vec2(0.25, 0.35);
          spotSizes[0] = 0.08;
          spotPositions[1] = vec2(0.28, 0.32);
          spotSizes[1] = 0.05;
          
          spotPositions[2] = vec2(0.65, 0.60);
          spotSizes[2] = 0.12;
          spotPositions[3] = vec2(0.68, 0.55);
          spotSizes[3] = 0.07;
          
          spotPositions[4] = vec2(0.45, 0.25);
          spotSizes[4] = 0.06;
          spotPositions[5] = vec2(0.82, 0.75);
          spotSizes[5] = 0.09;
        }
        
        void main() {
          initSpots();
          
          // Granulation - solar surface texture
          vec2 uv = vUv * 40.0;
          float grain = hash(floor(uv.x) + floor(uv.y) * 100.0) * 0.3;
          
          // Base photosphere color - yellow
          vec3 baseColor = vec3(1.0, 0.92, 0.3);
          baseColor += grain * 0.12;
          
          // Sunspots - dark regions (4000°C vs 5500°C)
          float totalDarkening = 0.0;
          
          for (int i = 0; i < 6; i++) {
            vec2 spotPos = spotPositions[i];
            float spotSize = spotSizes[i];
            
            // Distance from spot center
            float dist = distance(vUv, spotPos);
            
            // Umbra - dark center (~4000°C)
            float umbra = smoothstep(spotSize * 0.5, 0.0, dist);
            
            // Penumbra - lighter ring around umbra
            float penumbra = smoothstep(spotSize * 1.2, spotSize * 0.5, dist);
            penumbra = max(0.0, penumbra - umbra) * 0.4;
            
            totalDarkening += umbra * 0.85 + penumbra;
          }
          
          totalDarkening = min(totalDarkening, 1.0);
          
          // Apply darkening - umbra very dark, penumbra slightly darker
          vec3 umbraColor = vec3(0.08, 0.05, 0.02);
          baseColor = mix(baseColor, umbraColor, totalDarkening);
          
          gl_FragColor = vec4(baseColor, 1.0);
        }
      `,
      side: THREE.FrontSide
    });
  }, []);
  
  // Solar prominence shader - cool dense plasma loops anchored to photosphere
  const prominenceMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying float vHeight;
        void main() {
          vUv = uv;
          vPosition = position;
          vHeight = length(position) - 4.0; // height above photosphere
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;
        varying float vHeight;
        
        float hash(float n) { return fract(sin(n) * 43758.5453); }
        
        void main() {
          // Prominence loops - anchored at photosphere, extending into corona
          float angle = atan(vPosition.y, vPosition.x);
          
          // Multiple magnetic loop structures
          float loopPhase = angle * 3.0 + time * 0.15;
          
          // Create loop shape - rises from surface, peaks, returns
          float loopHeight = sin(loopPhase) * 0.5 + 0.5;
          float loopWidth = cos(loopPhase) * 0.5 + 0.5;
          
          // Height-based intensity - more visible higher up
          float heightIntensity = smoothstep(0.0, 2.5, vHeight);
          
          // Magnetic flux variations
          float flux = hash(floor(loopPhase * 2.0)) * 0.3 + 0.7;
          
          // Hydrogen/helium plasma - reddish pink
          vec3 plasmaColor = vec3(1.0, 0.25, 0.15);
          
          // Bright core, fainter edges
          float coreBrightness = smoothstep(0.8, 0.3, abs(sin(loopPhase * 1.5)));
          
          // Combine for final prominence
          float prominence = loopHeight * heightIntensity * flux * (0.6 + coreBrightness * 0.4);
          
          // Denser at base, wispy at top
          float density = smoothstep(2.5, 0.0, vHeight) * 0.7 + 0.3;
          
          float alpha = prominence * density * 0.9;
          
          gl_FragColor = vec4(plasmaColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
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
    chromoMaterial.uniforms.time.value = time;
    photosphereMaterial.uniforms.time.value = time;
    prominenceMaterial.uniforms.time.value = time;
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
      
      {/* Solar prominences - magnetic loops of cool plasma */}
      <mesh>
        <sphereGeometry args={[6.2, 32, 32]} />
        <primitive object={prominenceMaterial} attach="material" />
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