# Solar System Explorer - Next.js Migration Design

## 1. Project Overview

**Project Name:** Solar System Explorer (Next.js Version)  
**Type:** Next.js Web Application (App Router)  
**Core Functionality:** Mô hình 3D hệ mặt trời tương tác với công cụ đo lường  
**Target Users:** Học sinh, sinh viên, người yêu thiên văn học  
**Tech Stack:** Next.js 14+ (App Router), React, Three.js, TypeScript

---

## 2. Architecture

### 2.1 Clean Architecture Layers

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css       # Global styles
│   └── api/              # API routes
├── components/            # React components
│   ├── three/            # Three.js 3D components
│   ├── ui/               # UI components
│   └── layout/           # Layout components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities & helpers
├── data/                 # Static data
├── types/                # TypeScript types
└── styles/              # Additional styles
```

### 2.2 Key Design Decisions

- **Three.js:** Client-side only (use 'use client')
- **State Management:** React Context + useReducer
- **Styling:** CSS Modules hoặc Tailwind (user preference - default CSS Modules)
- **Data:** Static JSON, no external API needed for MVP

---

## 3. Components Structure

### 3.1 Three.js Components (Client-Side)
- `SolarSystemScene.tsx` - Main 3D scene
- `Sun.tsx` - Sun with glow
- `Planet.tsx` - Planet with orbit
- `Stars.tsx` - Background stars
- `OrbitControls.tsx` - Camera controls hook

### 3.2 UI Components (Server/Client)
- `Header.tsx` - App header with navigation
- `InfoPanel.tsx` - Planet information display
- `Toolbar.tsx` - Action buttons
- `ComparisonModal.tsx` - Size comparison modal

---

## 4. Vercel Deployment

### 4.1 Configuration
- `vercel.json` - Vercel configuration
- `next.config.js` - Next.js configuration

### 4.2 CI/CD
- GitHub Actions workflow cho automatic deployment
- Deploy on push to main branch

---

## 5. Migration Tasks

1. Initialize Next.js project
2. Setup project structure (Clean Architecture)
3. Convert vanilla JS to TypeScript + React components
4. Setup Three.js với React
5. Implement UI components
6. Setup Vercel configuration
7. Setup GitHub Actions CI/CD
8. Deploy to Vercel

---

## 6. Acceptance Criteria

- [ ] Next.js App Router hoạt động
- [ ] Three.js 3D scene render đúng
- [ ] Tương tác (click, zoom, rotate) hoạt động
- [ ] Info panel hiển thị thông tin
- [ ] Toolbar buttons hoạt động
- [ ] Comparison modal mở đúng
- [ ] Deploy lên Vercel thành công
- [ ] CI/CD tự động deploy khi push

---

*Last Updated: 2026-03-29*
*Version: 1.0*
