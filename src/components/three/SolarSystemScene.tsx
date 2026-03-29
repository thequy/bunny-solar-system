'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import Stars from './Stars';
import Sun from './Sun';
import Planet from './Planet';
import { PLANET_DATA } from '@/data/planets';

interface SolarSystemSceneProps {
  onPlanetSelect: (id: string) => void;
  selectedPlanet: string | null;
}

export default function SolarSystemScene({ onPlanetSelect, selectedPlanet }: SolarSystemSceneProps) {
  const planetIds = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

  return (
    <Canvas camera={{ position: [0, 30, 60], fov: 60 }}>
      <ambientLight intensity={0.3} />
      <Suspense fallback={null}>
        <Stars />
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
      </Suspense>
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={20}
        maxDistance={150}
      />
    </Canvas>
  );
}
