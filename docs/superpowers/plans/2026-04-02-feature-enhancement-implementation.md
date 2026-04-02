# Feature Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Thêm 5 features: Sci-Fi UI (glass-morphism), Quiz mini-game, Cross-section, Exoplanets list, Asteroid Belt

**Architecture:** 5 module riêng biệt - CSS cho UI, components mới cho Quiz/Cross-section/Exoplanets, particle system cho Asteroid Belt

**Tech Stack:** React, Three.js, @react-three/fiber, CSS glass-morphism

---

### Task 1: Sci-Fi UI - Glass-morphism CSS

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/ui/InfoPanel.tsx`
- Modify: `src/components/ui/Toolbar.tsx`

- [ ] **Step 1: Thêm glass-morphism CSS base**

```css
.glass-panel {
  background: rgba(20, 20, 50, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(100, 150, 255, 0.3);
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(100, 150, 255, 0.1);
}

.neon-border {
  border: 1px solid rgba(100, 200, 255, 0.5);
  box-shadow: 0 0 10px rgba(100, 200, 255, 0.3), inset 0 0 10px rgba(100, 200, 255, 0.1);
}
```

- [ ] **Step 2: Áp dụng glass-panel vào InfoPanel, Toolbar**

Thêm class `glass-panel` vào các container chính

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css src/components/ui/InfoPanel.tsx src/components/ui/Toolbar.tsx
git commit -m "feat: add sci-fi glass-morphism UI"
```

---

### Task 2: Quiz Mode

**Files:**
- Create: `src/data/quiz.ts` - Quiz questions data
- Create: `src/components/ui/QuizModal.tsx` - Quiz component
- Modify: `src/components/layout/SolarSystemApp.tsx` - Add quiz state
- Modify: `src/components/ui/Header.tsx` - Handle quiz view

- [ ] **Step 1: Tạo quiz data với 10 câu hỏi**

```typescript
export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Hành tinh nào lớn nhất trong hệ mặt trời?",
    options: ["Sao Thổ", "Sao Mộc", "Sao Hải Vương", "Sao Thiên Vương"],
    correct: 1
  },
  // ... 9 câu tiếp theo
];
```

- [ ] **Step 2: Tạo QuizModal component**

Tạo component với:
- Hiển thị câu hỏi hiện tại
- 4 nút lựa chọn
- Timer 15 giây
- Progress bar
- Điểm số

- [ ] **Step 3: Thêm quiz state vào SolarSystemApp**

```typescript
const [showQuiz, setShowQuiz] = useState(false);
const [quizScore, setQuizScore] = useState(0);
```

- [ ] **Step 4: Thêm handler cho quiz view trong Header**

- [ ] **Step 5: Commit**

```bash
git add src/data/quiz.ts src/components/ui/QuizModal.tsx src/components/layout/SolarSystemApp.tsx src/components/ui/Header.tsx
git commit -m "feat: add quiz mini-game"
```

---

### Task 3: Cross-section (Mặt cắt)

**Files:**
- Create: `src/components/ui/CrossSectionModal.tsx` - Cross-section component
- Modify: `src/components/layout/SolarSystemApp.tsx` - Add cross-section state

- [ ] **Step 1: Tạo CrossSectionModal với cấu trúc 3 lớp**

```typescript
interface PlanetLayer {
  name: string;
  color: string;
  percentage: number;
}

const CROSS_SECTION_DATA: Record<string, PlanetLayer[]> = {
  mercury: [
    { name: "Vỏ ngoài", color: "#8B8B8B", percentage: 20 },
    { name: "Mantel", color: "#6B6B6B", percentage: 42 },
    { name: "Lõi", color: "#FF6B00", percentage: 38 }
  ],
  // ... các hành tinh khác
};
```

- [ ] **Step 2: Hiển thị cross-section khi click vào planet có data**

Thêm nút "Xem mặt cắt" trong InfoPanel cho các hành tinh đá

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/CrossSectionModal.tsx src/components/layout/SolarSystemApp.tsx
git commit -m "feat: add cross-section view for planets"
```

---

### Task 4: Exoplanets

**Files:**
- Create: `src/data/exoplanets.ts` - Exoplanet data (30 planets)
- Create: `src/components/ui/ExoplanetView.tsx` - Exoplanet list với filter
- Modify: `src/components/layout/SolarSystemApp.tsx` - Handle exoplanet view

- [ ] **Step 1: Tạo exoplanet data với 30 hành tinh**

```typescript
export const EXOPLANET_DATA = [
  {
    id: "kepler-186f",
    name: "Kepler-186f",
    distance: 582,
    size: 1.1,
    temperature: -85,
    type: "rocky",
    description: "Hành tinh đá ngoài hệ mặt trời đầu tiên được tìm thấy trong vùng có thể sống được"
  },
  // ... 29 planets tiếp theo
];
```

- [ ] **Step 2: Tạo ExoplanetView component**

- Danh sách dạng card grid
- Filter sidebar: kích thước, nhiệt độ, khoảng cách
- Search input

- [ ] **Step 3: Handle exoplanet view trong SolarSystemApp**

- [ ] **Step 4: Commit**

```bash
git add src/data/exoplanets.ts src/components/ui/ExoplanetView.tsx src/components/layout/SolarSystemApp.tsx
git commit -m "feat: add exoplanets list with filters"
```

---

### Task 5: Asteroid Belt

**Files:**
- Create: `src/components/three/AsteroidBelt.tsx` - Asteroid particles
- Modify: `src/components/three/SolarSystemScene.tsx` - Add asteroid belt

- [ ] **Step 1: Tạo AsteroidBelt component**

```typescript
'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function AsteroidBelt() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      const angle = (i / 100) * Math.PI * 2;
      const radius = 18 + Math.random() * 4;
      const height = (Math.random() - 0.5) * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.15} color={0x888888} />
    </points>
  );
}
```

- [ ] **Step 2: Thêm AsteroidBelt vào SolarSystemScene**

```typescript
import AsteroidBelt from './AsteroidBelt';
// Trong component:
<AsteroidBelt />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/three/AsteroidBelt.tsx src/components/three/SolarSystemScene.tsx
git commit -m "feat: add asteroid belt between Mars and Mercury"
```

---

### Task 6: Integration và Final Testing

**Files:**
- Modify: `src/app/globals.css` - Final UI polish
- Modify: `README.md` - Update features list

- [ ] **Step 1: Chạy build check lỗi**

```bash
npm run build
```

- [ ] **Step 2: Update README với features mới**

- [ ] **Step 3: Commit**

```bash
git add . && git commit -m "feat: complete feature enhancement - sci-fi UI, quiz, cross-section, exoplanets, asteroid belt"
```

---

## Plan Complete

**Implementation order:** Task 1 → Task 2 → Task 3 → Task 4 → Task 5 → Task 6
