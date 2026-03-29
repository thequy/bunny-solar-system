# Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan.

**Goal:** Migrate Solar System Explorer từ vanilla JS sang Next.js App Router với Vercel deployment

**Architecture:** Next.js 14+ App Router với Clean Architecture

**Tech Stack:** Next.js, React, TypeScript, Three.js

---

## File Structure Target

```
project/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── api/
│   ├── components/
│   │   ├── three/
│   │   │   ├── SolarSystemScene.tsx
│   │   │   ├── Sun.tsx
│   │   │   ├── Planet.tsx
│   │   │   └── Stars.tsx
│   │   ├── ui/
│   │   │   ├── Header.tsx
│   │   │   ├── InfoPanel.tsx
│   │   │   ├── Toolbar.tsx
│   │   │   └── ComparisonModal.tsx
│   │   └── layout/
│   │       └── index.tsx
│   ├── hooks/
│   │   └── useSolarSystem.ts
│   ├── lib/
│   │   └── three-utils.ts
│   ├── data/
│   │   └── planets.ts
│   └── types/
│       └── index.ts
├── public/
├── package.json
├── next.config.js
├── tsconfig.json
├── vercel.json
├── .github/
│   └── workflows/
│       └── deploy.yml
└── docs/
```

---

## Task 1: Initialize Next.js Project

**Files:**
- Create: All Next.js config files

- [ ] **Step 1: Create package.json**

```json
{
  "name": "solar-system-explorer",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.99.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/three": "^0.160.0",
    "typescript": "^5.0.0"
  }
}
```

- [ ] **Step 2: Create next.config.js**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
}

module.exports = nextConfig
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create vercel.json**

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

- [ ] **Step 5: Commit**

```bash
git add package.json next.config.js tsconfig.json vercel.json
git commit -m "feat: setup Next.js project configuration"
```

---

## Task 2: Create Type Definitions

**Files:**
- Create: `src/types/index.ts`

- [ ] **Step 1: Create types**

```typescript
export interface PlanetData {
  name: { vi: string; en: string };
  type: 'star' | 'rocky' | 'gas_giant' | 'ice_giant';
  diameter: number;
  temperature: number;
  distanceFromSun: number;
  orbitalPeriod: number;
  moons: number;
  color: number;
  size: number;
  distance: number;
  speed: number;
  hasRings?: boolean;
  features: string[];
  description: { vi: string; en: string };
}

export type ViewMode = 'solar' | 'exoplanet' | 'compare' | 'quiz';
export type ToolMode = 'select' | 'measure' | 'zoom' | 'play' | 'settings';
```

- [ ] **Step 2: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add TypeScript types"
```

---

## Task 3: Create Planet Data

**Files:**
- Create: `src/data/planets.ts`

- [ ] **Step 1: Create planet data**

```typescript
import { PlanetData } from '@/types';

export const PLANET_DATA: Record<string, PlanetData> = {
  sun: {
    name: { vi: "Mặt Trời", en: "Sun" },
    type: "star",
    diameter: 1392700,
    temperature: 5500,
    distanceFromSun: 0,
    orbitalPeriod: 0,
    moons: 0,
    color: 0xffdd00,
    size: 4,
    distance: 0,
    speed: 0,
    features: ["Ngôi sao trung tâm hệ mặt trời", "Chiếm 99.86% khối lượng hệ mặt trời"],
    description: { 
      vi: "Mặt Trời là ngôi sao trung tâm của hệ mặt trời, chiếm khoảng 99.86% tổng khối lượng của hệ.",
      en: "The Sun is the star at the center of the Solar System."
    }
  },
  mercury: {
    name: { vi: "Sao Thủy", en: "Mercury" },
    type: "rocky",
    diameter: 4879,
    temperature: 167,
    distanceFromSun: 57.9,
    orbitalPeriod: 88,
    moons: 0,
    color: 0xb5b5b5,
    size: 0.8,
    distance: 10,
    speed: 0.02,
    features: ["Hành tinh nhỏ nhất", "Không có khí quyển"],
    description: { 
      vi: "Sao Thủy là hành tinh nhỏ nhất và gần Mặt Trời nhất.",
      en: "Mercury is the smallest planet in the Solar System."
    }
  },
  venus: {
    name: { vi: "Sao Kim", en: "Venus" },
    type: "rocky",
    diameter: 12104,
    temperature: 464,
    distanceFromSun: 108.2,
    orbitalPeriod: 225,
    moons: 0,
    color: 0xe6c87a,
    size: 1.2,
    distance: 15,
    speed: 0.015,
    features: ["Nóng nhất", "Quay ngược"],
    description: { 
      vi: "Sao Kim là hành tinh nóng nhất trong hệ mặt trời.",
      en: "Venus is the hottest planet in the Solar System."
    }
  },
  earth: {
    name: { vi: "Trái Đất", en: "Earth" },
    type: "rocky",
    diameter: 12742,
    temperature: 15,
    distanceFromSun: 149.6,
    orbitalPeriod: 365.25,
    moons: 1,
    color: 0x4a90d9,
    size: 1.3,
    distance: 20,
    speed: 0.01,
    features: ["Hành tinh duy nhất có sự sống", "71% bề mặt là nước"],
    description: { 
      vi: "Trái Đất là hành tinh thứ ba từ Mặt Trời và là hành tinh duy nhất có sự sống.",
      en: "Earth is the third planet from the Sun and the only planet with life."
    }
  },
  mars: {
    name: { vi: "Sao Hỏa", en: "Mars" },
    type: "rocky",
    diameter: 6779,
    temperature: -65,
    distanceFromSun: 227.9,
    orbitalPeriod: 687,
    moons: 2,
    color: 0xd94a3a,
    size: 0.9,
    distance: 25,
    speed: 0.008,
    features: ["Hành tinh đỏ", "Có nước đóng băng"],
    description: { 
      vi: "Sao Hỏa được gọi là hành tinh đỏ do oxit sắt trên bề mặt.",
      en: "Mars is known as the Red Planet."
    }
  },
  jupiter: {
    name: { vi: "Sao Mộc", en: "Jupiter" },
    type: "gas_giant",
    diameter: 139820,
    temperature: -110,
    distanceFromSun: 778.5,
    orbitalPeriod: 4333,
    moons: 95,
    color: 0xd9a86a,
    size: 3.5,
    distance: 35,
    speed: 0.004,
    features: ["Lớn nhất", "Có cơn bão Đỏ"],
    description: { 
      vi: "Sao Mộc là hành tinh lớn nhất trong hệ mặt trời.",
      en: "Jupiter is the largest planet in the Solar System."
    }
  },
  saturn: {
    name: { vi: "Sao Thổ", en: "Saturn" },
    type: "gas_giant",
    diameter: 116460,
    temperature: -140,
    distanceFromSun: 1432,
    orbitalPeriod: 10759,
    moons: 146,
    color: 0xe6d98a,
    size: 3.0,
    distance: 45,
    speed: 0.003,
    hasRings: true,
    features: ["Có vành đai đẹp", "Nhiều vệ tinh"],
    description: { 
      vi: "Sao Thổ nổi tiếng với hệ vành đai tuyệt đẹp.",
      en: "Saturn is famous for its beautiful ring system."
    }
  },
  uranus: {
    name: { vi: "Sao Thiên Vương", en: "Uranus" },
    type: "ice_giant",
    diameter: 50724,
    temperature: -195,
    distanceFromSun: 2867,
    orbitalPeriod: 30687,
    moons: 28,
    color: 0x8ad9d9,
    size: 2.0,
    distance: 55,
    speed: 0.002,
    features: ["Quay nghiêng 98 độ", "Màu xanh lục"],
    description: { 
      vi: "Sao Thiên Vương là hành tinh duy nhất quay nghiêng.",
      en: "Uranus is the only planet that rotates on its side."
    }
  },
  neptune: {
    name: { vi: "Sao Hải Vương", en: "Neptune" },
    type: "ice_giant",
    diameter: 49244,
    temperature: -200,
    distanceFromSun: 4515,
    orbitalPeriod: 60190,
    moons: 16,
    color: 0x4a6ad9,
    size: 1.9,
    distance: 65,
    speed: 0.001,
    features: ["Gió mạnh nhất", "Hành tinh xa nhất"],
    description: { 
      vi: "Sao Hải Vương là hành tinh xa nhất từ Mặt Trời.",
      en: "Neptune is the farthest planet from the Sun."
    }
  }
};
```

- [ ] **Step 2: Commit**

```bash
git add src/data/planets.ts
git commit -m "feat: add planet data"
```

---

## Task 4: Create App Structure

**Files:**
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

- [ ] **Step 1: Create globals.css**

```css
:root {
  --bg-primary: #0a0a1a;
  --bg-secondary: #101025;
  --bg-tertiary: #1a1a35;
  --accent: #ffd700;
  --accent-secondary: #4a90d9;
  --text-primary: #ffffff;
  --text-secondary: #aaa;
  --text-muted: #6a6a9a;
  --border: #2a2a4a;
  --highlight: #3a5a8a;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  overflow: hidden;
}
```

- [ ] **Step 2: Create layout.tsx**

```typescript
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Solar System Explorer',
  description: 'Khám phá hệ mặt trời tương tác',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Create page.tsx**

```typescript
import SolarSystemApp from '@/components/layout/SolarSystemApp';

export default function Home() {
  return <SolarSystemApp />;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/
git commit -m "feat: create Next.js app structure"
```

---

## Task 5: Create Three.js Components

**Files:**
- Create: `src/components/three/SolarSystemScene.tsx`, `Sun.tsx`, `Planet.tsx`, `Stars.tsx`

- [ ] **Step 1: Create Stars component**

```typescript
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Stars({ count = 2000 }) {
  const starsRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      const radius = 200 + Math.random() * 300;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, [count]);

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.5} />
    </points>
  );
}
```

- [ ] **Step 2: Create Sun component**

```typescript
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      <mesh ref={sunRef}>
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
```

- [ ] **Step 3: Create Planet component**

```typescript
'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PlanetData } from '@/types';

interface PlanetProps {
  data: PlanetData;
  onClick: (id: string) => void;
  isSelected: boolean;
}

export default function Planet({ data, onClick, isSelected }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [angle] = useState(Math.random() * Math.PI * 2);
  
  useFrame(() => {
    if (meshRef.current) {
      const time = Date.now() * 0.001;
      meshRef.current.position.x = Math.cos(angle + time * data.speed) * data.distance;
      meshRef.current.position.z = Math.sin(angle + time * data.speed) * data.distance;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[data.distance - 0.1, data.distance + 0.1, 64]} />
        <meshBasicMaterial color={0x3a3a5a} side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>
      <mesh
        ref={meshRef}
        onClick={() => onClick(Object.keys(data)[0])}
        position={[Math.cos(angle) * data.distance, 0, Math.sin(angle) * data.distance]}
      >
        <sphereGeometry args={[data.size, 32, 32]} />
        <meshStandardMaterial
          color={data.color}
          roughness={0.8}
          metalness={0.1}
          emissive={isSelected ? 0x222222 : 0x000000}
        />
        {data.hasRings && (
          <mesh rotation={[Math.PI / 2.5, 0, 0]}>
            <ringGeometry args={[data.size * 1.4, data.size * 2.2, 32]} />
            <meshBasicMaterial color={0xc9b96a} side={THREE.DoubleSide} transparent opacity={0.7} />
          </mesh>
        )}
      </mesh>
    </group>
  );
}
```

- [ ] **Step 4: Create SolarSystemScene component**

```typescript
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useState } from 'react';
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
        <Sun />
        {planetIds.map((id) => (
          <Planet
            key={id}
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
```

- [ ] **Step 5: Commit**

```bash
git add src/components/three/
git commit -m "feat: add Three.js components"
```

---

## Task 6: Create UI Components

**Files:**
- Create: `src/components/ui/Header.tsx`, `InfoPanel.tsx`, `Toolbar.tsx`, `ComparisonModal.tsx`

- [ ] **Step 1: Create Header component**

```typescript
'use client';

import { ViewMode } from '@/types';

interface HeaderProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export default function Header({ activeView, onViewChange }: HeaderProps) {
  const views: { id: ViewMode; label: string }[] = [
    { id: 'solar', label: 'Hệ Mặt Trời' },
    { id: 'exoplanet', label: 'Exoplanets' },
    { id: 'compare', label: 'So sánh' },
    { id: 'quiz', label: 'Quiz' },
  ];

  return (
    <header className="header">
      <div className="logo">
        <div className="logo-icon" />
        <span className="logo-text">Solar System Explorer</span>
      </div>
      <nav className="nav">
        {views.map((view) => (
          <button
            key={view.id}
            className={`nav-btn ${activeView === view.id ? 'active' : ''}`}
            onClick={() => onViewChange(view.id)}
          >
            {view.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: Create InfoPanel component**

```typescript
'use client';

import { PlanetData } from '@/types';

interface InfoPanelProps {
  planetData: PlanetData | null;
}

export default function InfoPanel({ planetData }: InfoPanelProps) {
  if (!planetData) {
    return (
      <aside className="info-panel">
        <div className="panel-section">
          <div className="panel-title">Thông tin hành tinh</div>
          <p>Chọn một hành tinh để xem thông tin</p>
        </div>
      </aside>
    );
  }

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      star: 'Ngôi sao',
      rocky: 'Hành tinh đá',
      gas_giant: 'Khí khổng lồ',
      ice_giant: 'Băng khổng lồ',
    };
    return types[type] || type;
  };

  const colorHex = planetData.color.toString(16).padStart(6, '0');

  return (
    <aside className="info-panel">
      <div className="panel-section">
        <div className="panel-title">Thông tin hành tinh</div>
        <div className="planet-card">
          <div className="planet-header">
            <div
              className="planet-avatar"
              style={{
                background: `radial-gradient(circle at 30% 30%, #${colorHex}, #${(planetData.color * 0.5).toString(16).padStart(6, '0')})`,
              }}
            />
            <div>
              <div className="planet-name">{planetData.name.vi}</div>
              <div className="planet-type">{getTypeLabel(planetData.type)}</div>
            </div>
          </div>
          <div className="planet-stats">
            <div className="stat-item">
              <div className="stat-label">Đường kính</div>
              <div className="stat-value">
                {planetData.diameter.toLocaleString()} <span className="stat-unit">km</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Nhiệt độ</div>
              <div className="stat-value">{planetData.temperature}°C</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Khoảng cách</div>
              <div className="stat-value">
                {planetData.distanceFromSun} <span className="stat-unit">triệu km</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Chu kỳ quỹ đạo</div>
              <div className="stat-value">{planetData.orbitalPeriod} ngày</div>
            </div>
          </div>
          <p className="planet-description">{planetData.description.vi}</p>
        </div>
      </div>
      <div className="panel-section">
        <div className="panel-title">Thông số nhanh</div>
        <div className="quick-facts">
          <div className="fact-item">
            <span className="fact-label">Số vệ tinh</span>
            <span className="fact-value">{planetData.moons}</span>
          </div>
          <div className="fact-item">
            <span className="fact-label">Loại</span>
            <span className="fact-value">{getTypeLabel(planetData.type)}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
```

- [ ] **Step 3: Create Toolbar component**

```typescript
'use client';

import { ToolMode } from '@/types';

interface ToolbarProps {
  activeTool: ToolMode;
  isPlaying: boolean;
  onToolChange: (tool: ToolMode) => void;
  onPlayToggle: () => void;
}

export default function Toolbar({ activeTool, isPlaying, onToolChange, onPlayToggle }: ToolbarProps) {
  const tools: { id: ToolMode; icon: string; label: string }[] = [
    { id: 'select', icon: '👆', label: 'Chọn hành tinh' },
    { id: 'measure', icon: '📏', label: 'Đo khoảng cách' },
    { id: 'zoom', icon: '🔍', label: 'Zoom' },
    { id: 'play', icon: isPlaying ? '⏸️' : '▶️', label: isPlaying ? 'Tạm dừng' : 'Chơi tiếp' },
    { id: 'settings', icon: '⚙️', label: 'Cài đặt' },
  ];

  return (
    <footer className="toolbar">
      {tools.map((tool) => (
        <button
          key={tool.id}
          className={`tool-btn ${activeTool === tool.id ? 'active' : ''}`}
          onClick={() => {
            if (tool.id === 'play') {
              onPlayToggle();
            } else {
              onToolChange(tool.id);
            }
          }}
        >
          {tool.icon} {tool.label}
        </button>
      ))}
    </footer>
  );
}
```

- [ ] **Step 4: Create ComparisonModal component**

```typescript
'use client';

import { PLANET_DATA } from '@/data/planets';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComparisonModal({ isOpen, onClose }: ComparisonModalProps) {
  if (!isOpen) return null;

  const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
  const maxDiameter = 139820;

  return (
    <div className="modal-overlay visible" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">So sánh kích thước các hành tinh</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="comparison-container">
          {planets.map((id) => {
            const data = PLANET_DATA[id];
            const height = Math.max(15, (data.diameter / maxDiameter) * 200);
            const width = Math.max(20, height);
            const colorHex = data.color.toString(16).padStart(6, '0');

            return (
              <div key={id} className="comparison-bar">
                <div
                  style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    background: `radial-gradient(circle at 30% 30%, #${colorHex}, #${(data.color * 0.5).toString(16).padStart(6, '0')})`,
                    borderRadius: '50%',
                    marginBottom: '8px',
                  }}
                />
                <div style={{ fontSize: '11px', color: '#6a6a9a' }}>{data.name.vi}</div>
                <div style={{ fontSize: '10px', color: '#666' }}>{data.diameter.toLocaleString()}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add UI components"
```

---

## Task 7: Create Main App Component

**Files:**
- Create: `src/components/layout/SolarSystemApp.tsx`

- [ ] **Step 1: Create SolarSystemApp component**

```typescript
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/ui/Header';
import InfoPanel from '@/components/ui/InfoPanel';
import Toolbar from '@/components/ui/Toolbar';
import ComparisonModal from '@/components/ui/ComparisonModal';
import { PLANET_DATA } from '@/data/planets';
import { ViewMode, ToolMode } from '@/types';

const SolarSystemScene = dynamic(
  () => import('@/components/three/SolarSystemScene'),
  { ssr: false }
);

export default function SolarSystemApp() {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>('earth');
  const [activeView, setActiveView] = useState<ViewMode>('solar');
  const [activeTool, setActiveTool] = useState<ToolMode>('select');
  const [isPlaying, setIsPlaying] = useState(true);
  const [showComparison, setShowComparison] = useState(false);

  const handleViewChange = (view: ViewMode) => {
    setActiveView(view);
    if (view === 'compare') {
      setShowComparison(true);
    }
  };

  const handleToolChange = (tool: ToolMode) => {
    setActiveTool(tool);
  };

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const planetData = selectedPlanet ? PLANET_DATA[selectedPlanet] : null;

  return (
    <div className="app">
      <Header activeView={activeView} onViewChange={handleViewChange} />
      <main className="canvas-area">
        <SolarSystemScene
          onPlanetSelect={setSelectedPlanet}
          selectedPlanet={selectedPlanet}
        />
      </main>
      <InfoPanel planetData={planetData} />
      <Toolbar
        activeTool={activeTool}
        isPlaying={isPlaying}
        onToolChange={handleToolChange}
        onPlayToggle={handlePlayToggle}
      />
      <ComparisonModal
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
      />
    </div>
  );
}
```

- [ ] **Step 2: Update globals.css with full styles**

```css
:root {
  --bg-primary: #0a0a1a;
  --bg-secondary: #101025;
  --bg-tertiary: #1a1a35;
  --accent: #ffd700;
  --accent-secondary: #4a90d9;
  --text-primary: #ffffff;
  --text-secondary: #aaa;
  --text-muted: #6a6a9a;
  --border: #2a2a4a;
  --highlight: #3a5a8a;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  overflow: hidden;
}

.app {
  display: grid;
  grid-template-columns: 1fr 320px;
  grid-template-rows: 60px 1fr 80px;
  height: 100vh;
}

.header {
  grid-column: 1 / -1;
  background: linear-gradient(180deg, #1a1a3a 0%, var(--bg-primary) 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-bottom: 1px solid var(--border);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 36px;
  height: 36px;
  background: radial-gradient(circle, #ffd700 30%, #ff8c00 100%);
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(255, 200, 0, 0.5);
}

.logo-text {
  font-size: 20px;
  font-weight: 600;
  background: linear-gradient(90deg, #ffd700, #ff8c00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav {
  display: flex;
  gap: 8px;
}

.nav-btn {
  padding: 8px 16px;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.nav-btn:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.nav-btn.active {
  background: linear-gradient(135deg, #4a4a7a, #3a3a6a);
  border-color: #6a6a9a;
  color: var(--text-primary);
}

.canvas-area {
  position: relative;
  background: radial-gradient(ellipse at center, #0d0d20 0%, #050510 100%);
}

.info-panel {
  background: var(--bg-secondary);
  border-left: 1px solid var(--border);
  padding: 20px;
  overflow-y: auto;
}

.panel-section {
  margin-bottom: 24px;
}

.panel-title {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
  margin-bottom: 12px;
}

.planet-card {
  background: linear-gradient(135deg, var(--bg-tertiary) 0%, #15152a 100%);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid var(--border);
}

.planet-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.planet-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.planet-name {
  font-size: 24px;
  font-weight: 600;
}

.planet-type {
  font-size: 12px;
  color: #6a8aba;
  background: rgba(106, 138, 186, 0.2);
  padding: 4px 8px;
  border-radius: 4px;
}

.planet-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stat-item {
  background: #0d0d20;
  padding: 12px;
  border-radius: 8px;
}

.stat-label {
  font-size: 11px;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.stat-value {
  font-size: 16px;
  font-weight: 500;
}

.stat-unit {
  font-size: 12px;
  color: var(--text-secondary);
}

.planet-description {
  margin-top: 16px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-secondary);
}

.quick-facts {
  background: #0d0d20;
  border-radius: 8px;
  padding: 12px;
}

.fact-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #1a1a2a;
  font-size: 13px;
}

.fact-item:last-child {
  border-bottom: none;
}

.fact-label {
  color: var(--text-muted);
}

.fact-value {
  color: var(--text-secondary);
}

.toolbar {
  grid-column: 1 / -1;
  background: #12122a;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 0 24px;
  border-top: 1px solid var(--border);
}

.tool-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #1a1a3a;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.tool-btn:hover {
  background: #2a2a4a;
  color: var(--text-primary);
  transform: translateY(-2px);
}

.tool-btn.active {
  background: linear-gradient(135deg, #3a5a8a, #2a4a7a);
  border-color: #5a8aba;
  color: var(--text-primary);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-overlay.visible {
  display: flex;
}

.modal {
  background: var(--bg-secondary);
  border-radius: 16px;
  padding: 32px;
  max-width: 800px;
  width: 90%;
  border: 1px solid var(--border);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-title {
  font-size: 24px;
  font-weight: 600;
}

.modal-close {
  width: 32px;
  height: 32px;
  background: #1a1a3a;
  border: none;
  color: var(--text-primary);
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
}

.comparison-container {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 8px;
  height: 250px;
  padding: 20px;
  background: #0a0a15;
  border-radius: 12px;
}

.comparison-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

@media (max-width: 1024px) {
  .app {
    grid-template-columns: 1fr;
  }
  .info-panel {
    display: none;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/
git add src/app/globals.css
git commit -m "feat: add main app component and styles"
```

---

## Task 8: Setup GitHub Actions CI/CD

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create deploy workflow**

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "feat: add GitHub Actions workflow for Vercel deployment"
```

---

## Task 9: Final Setup & Deploy

**Files:**
- Update: package.json scripts

- [ ] **Step 1: Update package.json scripts**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

- [ ] **Step 2: Create next-env.d.ts**

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

- [ ] **Step 3: Build and test**

```bash
npm install
npm run build
```

- [ ] **Step 4: Commit final**

```bash
git add .
git commit -m "feat: complete Next.js migration with Vercel deployment"
```

---

## Summary

| Task | Description |
|------|-------------|
| 1 | Initialize Next.js project |
| 2 | Create TypeScript types |
| 3 | Create planet data |
| 4 | Create app structure |
| 5 | Create Three.js components |
| 6 | Create UI components |
| 7 | Create main app component |
| 8 | Setup GitHub Actions CI/CD |
| 9 | Final setup & deploy |

---

*Plan created: 2026-03-29*
*Version: 1.0*
