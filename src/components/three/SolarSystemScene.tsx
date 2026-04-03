'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import Stars from './Stars';
import Sun from './Sun';
import Planet from './Planet';
import AsteroidBelt from './AsteroidBelt';
import KuiperBelt from './KuiperBelt';
import { PLANET_DATA } from '@/data/planets';

interface SolarSystemSceneProps {
  onPlanetSelect: (id: string) => void;
  selectedPlanet: string | null;
}

export default function SolarSystemScene({ onPlanetSelect, selectedPlanet }: SolarSystemSceneProps) {
  const planetIds = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
  const dwarfPlanetIds = ['pluto', 'haumea', 'makemake'];

  return (
    <Canvas camera={{ position: [0, 30, 60], fov: 60 }}>
      {/* Minimal ambient for deep space look */}
      <ambientLight intensity={0.15} />
      {/* Point light at sun position - creates day/night effect */}
      <pointLight position={[0, 0, 0]} intensity={2} distance={150} decay={0.5} />
      <Suspense fallback={null}>
        <Stars />
        <AsteroidBelt />
        <KuiperBelt />
        <Sun onClick={onPlanetSelect} />
        {planetIds.map((id) => (
          <Planet
            key={id}
            id={id}
            data={PLANET_DATA[id]}
            onClick={onPlanetSelect}
            isSelected={selectedPlanet === id}
          />
        ))}
        {dwarfPlanetIds.map((id) => (
          <Planet
            key={id}
            id={id}
            data={PLANET_DATA[id]}
            onClick={onPlanetSelect}
            isSelected={selectedPlanet === id}
          />
        ))}
      </Suspense>
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN
        }}
        minDistance={20}
        maxDistance={150}
      />
    </Canvas>
  );
}
