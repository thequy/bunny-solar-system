# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Solar System Explorer is an interactive 3D web application for exploring the solar system. Currently in MVP phase using vanilla JavaScript and Three.js, with an active migration plan to Next.js 14+ with React, TypeScript, and @react-three/fiber.

## Development Commands

### Current MVP (Vanilla JS)
```bash
# Run directly in browser
# Open index.html in any modern browser

# Or use HTTP server
python -m http.server 8000
# or
npx serve .
```

### Next.js Migration (In Progress)
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture

### Current MVP Structure
```
bunny-solar-system/
├── index.html              # Entry point
├── css/
│   └── styles.css          # Global styles
├── js/
│   ├── main.js             # App initialization and lifecycle
│   ├── planets.js          # SolarSystem class - Three.js scene management
│   ├── controls.js         # CameraController class - Camera interactions
│   ├── ui.js               # UIController class - UI state and DOM manipulation
│   └── data/
│       └── planets.js      # PLANET_DATA constant - Planet information
├── docs/
│   ├── specs/              # Design specifications
│   └── plans/              # Implementation plans
└── public/                 # Static assets
```

### Planned Next.js Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   ├── globals.css         # Global styles
│   └── api/                # API routes (future)
├── components/
│   ├── three/              # Three.js components
│   │   ├── SolarSystemScene.tsx
│   │   ├── Sun.tsx
│   │   ├── Planet.tsx
│   │   └── Stars.tsx
│   ├── ui/                 # UI components
│   │   ├── Header.tsx
│   │   ├── InfoPanel.tsx
│   │   ├── Toolbar.tsx
│   │   └── ComparisonModal.tsx
│   └── layout/
│       └── SolarSystemApp.tsx
├── hooks/
│   └── useSolarSystem.ts   # Custom hooks (future)
├── lib/
│   └── three-utils.ts      # Three.js utilities (future)
├── data/
│   └── planets.ts          # Planet data
└── types/
    └── index.ts            # TypeScript types
```

### Key Classes (Current MVP)

**SolarSystem** (`js/planets.js`)
- Manages Three.js scene, camera, renderer
- Creates and animates planets and orbits
- Handles planet selection and highlighting
- Manages animation state (play/pause)

**CameraController** (`js/controls.js`)
- Handles mouse/touch camera rotation and zoom
- Raycaster for planet click detection
- Custom event dispatching for interactions

**UIController** (`js/ui.js`)
- Manages UI state (active view, tool, play state)
- Updates DOM elements based on solar system state
- Handles modal display (comparison, quiz placeholders)

**SolarSystemApp** (`js/main.js`)
- Orchestrates initialization and lifecycle
- Coordinates between Three.js scene and UI

### Three.js Patterns

- **Scene Setup**: Scene, PerspectiveCamera, WebGLRenderer with antialiasing
- **Lighting**: AmbientLight + PointLight for sun
- **Animation**: requestAnimationFrame loop with conditional updates based on `isPlaying` state
- **Raycasting**: For planet selection and measurement tool
- **Custom Events**: CustomEvent for decoupled communication between components

### Data Structure

Planet data is centralized in `PLANET_DATA` constant with properties:
- `name`: { vi, en } - Localized names
- `type`: 'star' | 'rocky' | 'gas_giant' | 'ice_giant'
- `diameter`: number (km)
- `temperature`: number (°C)
- `distanceFromSun`: number (million km)
- `orbitalPeriod`: number (days)
- `moons`: number
- `color`: number (hex)
- `size`: number (3D scale)
- `distance`: number (orbit radius)
- `speed`: number (orbital speed)
- `hasRings`: boolean (for Saturn)
- `features`: string[]
- `description`: { vi, en }

## Tech Stack

### Current MVP
- HTML5, CSS3, JavaScript (ES6+)
- Three.js r128 (3D rendering)
- Custom camera controls

### Planned Next.js Migration
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- @react-three/fiber (Three.js for React)
- @react-three/drei (Three.js helpers)
- Vercel deployment

## Important Notes

### Migration Status
- MVP is fully functional in vanilla JS
- Next.js migration plan exists in `docs/superpowers/plans/2026-03-29-nextjs-migration-implementation.md`
- Migration is in progress - some Next.js files may exist but are not yet complete

### Design Specifications
- See `docs/superpowers/specs/2026-03-29-solar-system-explorer-design.md` for detailed UI/UX requirements
- Color palette: Deep space theme with gold and blue accents
- Responsive design with breakpoints at 1024px and 768px

### Planet Scales
- Sizes are artistic representations, not to scale
- Distances are compressed for visibility
- Speeds are relative, not physically accurate

### Event System
- Custom events used for communication:
  - `planetSelected` - When a planet is clicked
  - `measurementComplete` - When distance measurement finishes
  - `playToggle` - When animation play/pause state changes

### Styling
- CSS variables for theming
- Grid layout for main structure
- Flexbox for component layouts
- Mobile-responsive with media queries