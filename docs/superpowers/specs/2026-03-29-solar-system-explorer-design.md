# Solar System Explorer - Design Specification

## 1. Project Overview

**Project Name:** Solar System Explorer  
**Type:** Web Application (3D Interactive)  
**Core Functionality:** Mô hình 3D hệ mặt trời tương tác với công cụ đo lường và khám phá thông tin hành tinh  
**Target Users:** Học sinh, sinh viên, người yêu thiên văn học  
**Tech Stack:** HTML5, CSS3, JavaScript, Three.js

---

## 2. UI/UX Specification

### 2.1 Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (fixed, 60px)                                      │
│  [Logo] Solar System Explorer    [Nav: Hệ MT | Exo | So sánh | Quiz] │
├────────────────────────────────────────────┬────────────────┤
│                                            │                │
│                                            │   INFO PANEL   │
│           3D CANVAS AREA                   │   (320px)      │
│           (Three.js)                       │                │
│                                            │   - Planet     │
│                                            │     Info       │
│                                            │   - Stats      │
│                                            │   - Facts      │
│                                            │                │
├────────────────────────────────────────────┴────────────────┤
│  TOOLBAR (80px)                                            │
│  [Chọn] [Đo khoảng cách] [Phóng to] [Chơi/Tạm] [Cài đặt]   │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Responsive Breakpoints
- **Desktop:** > 1024px (full layout)
- **Tablet:** 768px - 1024px (collapsible sidebar)
- **Mobile:** < 768px (bottom sheet info panel)

### 2.3 Visual Design

**Color Palette:**
- Primary Background: `#0a0a1a` (deep space)
- Secondary Background: `#101025` (panel)
- Accent: `#ffd700` (sun gold)
- Accent Secondary: `#4a90d9` (earth blue)
- Text Primary: `#ffffff`
- Text Secondary: `#aaa`
- Text Muted: `#6a6a9a`
- Border: `#2a2a4a`
- Highlight: `#3a5a8a`

**Typography:**
- Font Family: `'Segoe UI', system-ui, sans-serif`
- Logo: 20px, 600 weight
- Headings: 24px, 600 weight
- Body: 14px, 400 weight
- Stats: 16px, 500 weight
- Labels: 11-12px, 400 weight

**Spacing System:**
- Base unit: 8px
- Panel padding: 20px
- Card padding: 16px
- Gap between elements: 8-12px

**Visual Effects:**
- Planet glow: box-shadow with planet color at 30% opacity
- Sun glow: animated pulse effect
- Stars: 2000 particles with random positions
- Orbit lines: subtle ring geometry with 30% opacity
- Hover states: scale(1.05) + brightness increase
- Transitions: 0.2s ease-out

### 2.4 Components

**Header:**
- Logo với icon mặt trời gradient
- Navigation tabs (4 tabs)
- Active state: gradient background

**3D Canvas:**
- Three.js WebGL renderer
- OrbitControls cho camera
- Raycaster cho click detection

**Info Panel:**
- Planet card với avatar, tên, loại
- Stats grid (2x2): đường kính, nhiệt độ, khoảng cách, chu kỳ
- Description text
- Quick facts list

**Toolbar:**
- 5 tool buttons với icons
- Active state highlighting
- Tooltip on hover

**Modals:**
- Size comparison modal
- Quiz modal
- Settings modal

---

## 3. Functionality Specification

### 3.1 MVP Features (Phase 1)

#### 3.1.1 3D Solar System Model
- **Sun:** Central sphere với glow effect, kích thước lớn nhất
- **8 Planets:** Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
- **Orbits:** Circular orbit paths cho mỗi planet
- **Saturn's Rings:** Decorative ring geometry
- **Starfield:** 2000 background stars
- **Animation:** Planets orbit around sun at different speeds

#### 3.1.2 Camera Controls
- **Rotate:** Drag mouse để xoay camera quanh center
- **Zoom:** Scroll wheel để zoom in/out
- **Pan:** Right-click drag (optional)
- **Reset:** Button để return to default view
- **Constraints:** Min/max zoom limits (20-150 units)

#### 3.1.3 Planet Selection
- **Click Detection:** Raycaster detect planet click
- **Highlight:** Selected planet có visual feedback
- **Info Panel Update:** Click vào planet → hiển thị thông tin trong side panel
- **Sun Selection:** Click sun → hiển thị thông tin mặt trời

#### 3.1.4 Information Display
Each planet displays:
- Name (Tiếng Việt + English)
- Type (rocky/gas giant/ice giant)
- Diameter (km)
- Surface temperature (°C)
- Distance from Sun (million km)
- Orbital period (days/years)
- Number of moons
- Notable features
- Description (2-3 sentences)

#### 3.1.5 Measurement Tool
- **Distance Measurement:** Click 2 points → hiển thị khoảng cách
- **Unit Toggle:** km / AU / million km
- **Visual Line:** Line geometry connecting two points
- **Result Display:** Floating label showing distance

#### 3.1.6 Size Comparison
- **Modal View:** Click "So sánh kích thước" → open modal
- **Visual Representation:** Side-by-side planet spheres
- **Scale:** Proportional to actual diameter
- **Labels:** Planet name + diameter value

#### 3.1.7 Play/Pause Animation
- **Toggle Button:** Start/stop orbital motion
- **Speed Control:** Optional slider for animation speed
- **Visual State:** Icon changes play ↔ pause

### 3.2 Phase 2 Features (Post-MVP)

#### 3.2.1 Exoplanets Module
- **Data Source:** NASA Exoplanet Archive API
- **Initial Dataset:** 20-30 notable exoplanets
- **Filter:** By type (gas giant, rocky, super-Earth)
- **Search:** By name
- **Display:** Separate view mode

#### 3.2.2 Cross-Section View
- **Modal:** Show planet interior structure
- **Layers:** Core, mantle, crust (where applicable)
- **Labels:** Each layer with description

#### 3.2.3 Orbital Animation Explanation
- **Educational Overlay:** Show orbital mechanics
- **Speed Control:** Adjust orbital speed
- **Labels:** Show orbital period in real-time

#### 3.2.4 Quiz Module
- **Question Types:** Multiple choice
- **Categories:** Planet facts, solar system knowledge
- **Score Tracking:** Local storage
- **Difficulty Levels:** Easy, Medium, Hard

### 3.3 Data Structure

```javascript
const planetData = {
    name: { vi: "Trái Đất", en: "Earth" },
    type: "rocky",
    diameter: 12742, // km
    temperature: 15, // °C
    distanceFromSun: 149.6, // million km
    orbitalPeriod: 365.25, // days
    moons: 1,
    features: ["唯一有生命的星球", "71% 表面被水覆盖"],
    description: { vi: "...", en: "..." }
};
```

### 3.4 User Interactions

| Action | Result |
|--------|--------|
| Click planet | Select & show info |
| Drag | Rotate camera |
| Scroll | Zoom in/out |
| Click "Đo khoảng cách" | Enter measurement mode |
| Click 2 points in measure mode | Show distance |
| Click "So sánh" | Open comparison modal |
| Click "Chơi/Tạm" | Toggle animation |
| Click nav tab | Switch view mode |

### 3.5 Edge Cases
- Click empty space → deselect current planet
- Mobile: Touch controls instead of mouse
- WebGL not supported → Show fallback message
- API failure → Use cached/mock data

---

## 4. Technical Architecture

### 4.1 File Structure
```
project/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── planets.js
│   ├── controls.js
│   ├── ui.js
│   └── data/
│       └── planets.json
├── assets/
│   └── textures/ (optional)
└── docs/
    └── specs/
```

### 4.2 Three.js Setup
- Scene, Camera (Perspective), Renderer
- OrbitControls for camera
- Raycaster for click detection
- Animation loop với requestAnimationFrame

---

## 5. Acceptance Criteria

### 5.1 Visual Checkpoints
- [ ] Header với logo và navigation hiển thị đúng
- [ ] 3D canvas fill available space
- [ ] Sun visible ở center với glow effect
- [ ] All 8 planets visible với distinct colors
- [ ] Orbit paths visible as subtle rings
- [ ] Starfield background renders
- [ ] Info panel shows planet data
- [ ] Toolbar buttons have icons và hover states

### 5.2 Functional Checkpoints
- [ ] Camera rotates smoothly on drag
- [ ] Zoom works within limits
- [ ] Clicking planet updates info panel
- [ ] Planets orbit when animation is playing
- [ ] Play/pause button toggles animation
- [ ] Size comparison modal opens
- [ ] Measurement tool shows distance

### 5.3 Performance Targets
- Initial load: < 3 seconds
- 60 FPS animation
- Responsive on desktop/tablet

---

## 6. Implementation Priority

### Phase 1 - MVP (Week 1-2)
1. Setup project structure
2. Three.js scene initialization
3. Sun + 8 planets rendering
4. Camera controls
5. Planet click detection
6. Info panel display
7. Toolbar actions
8. Basic styling

### Phase 2 - Enhancement (Week 3-4)
1. Size comparison modal
2. Exoplanets data integration
3. Measurement tool
4. Quiz module
5. Cross-section views

---

*Last Updated: 2026-03-29*
*Version: 1.0*
