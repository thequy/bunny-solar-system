# Solar System Explorer MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build MVP of 3D solar system explorer with Three.js - includes sun + 8 planets, camera controls, planet info panel, toolbar, and size comparison

**Architecture:** Single-page web app using vanilla JS + Three.js. Modular file structure with separate files for planets data, controls, and UI components.

**Tech Stack:** HTML5, CSS3, JavaScript (ES6+), Three.js (via CDN)

---

## File Structure

```
project/
├── index.html              # Main entry point
├── css/
│   └── styles.css          # All styles
├── js/
│   ├── main.js             # App initialization & animation loop
│   ├── planets.js          # Planet creation & data
│   ├── controls.js         # Camera controls & interactions
│   ├── ui.js               # UI component handlers
│   └── data/
│       └── planets.json    # Planet data (all 8 planets + sun)
└── docs/
    └── specs/              # Already created
```

---

## Task 1: Project Setup & HTML Structure

**Files:**
- Create: `index.html`
- Create: `css/styles.css`
- Create: `js/data/planets.json`

- [ ] **Step 1: Create project directories**

```bash
mkdir -p css js/data
```

- [ ] **Step 2: Create index.html with Three.js CDN**

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solar System Explorer</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div id="app">
        <!-- Header -->
        <header id="header">
            <div class="logo">
                <div class="logo-icon"></div>
                <span class="logo-text">Solar System Explorer</span>
            </div>
            <nav id="nav">
                <button class="nav-btn active" data-view="solar">Hệ Mặt Trời</button>
                <button class="nav-btn" data-view="exoplanet">Exoplanets</button>
                <button class="nav-btn" data-view="compare">So sánh</button>
                <button class="nav-btn" data-view="quiz">Quiz</button>
            </nav>
        </header>

        <!-- Main Canvas Area -->
        <main id="canvas-container"></main>

        <!-- Info Panel -->
        <aside id="info-panel">
            <div class="panel-section">
                <div class="panel-title">Thông tin hành tinh</div>
                <div id="planet-card"></div>
            </div>
            <div class="panel-section">
                <div class="panel-title">Thông số nhanh</div>
                <div id="quick-facts"></div>
            </div>
        </aside>

        <!-- Toolbar -->
        <footer id="toolbar">
            <button class="tool-btn active" data-tool="select">👆 Chọn hành tinh</button>
            <button class="tool-btn" data-tool="measure">📏 Đo khoảng cách</button>
            <button class="tool-btn" data-tool="zoom">🔍 Zoom</button>
            <button class="tool-btn" data-tool="play">▶️ Chơi/Tạm dừng</button>
            <button class="tool-btn" data-tool="settings">⚙️ Cài đặt</button>
        </footer>
    </div>

    <!-- Modals Container -->
    <div id="modals"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="js/data/planets.js"></script>
    <script src="js/planets.js"></script>
    <script src="js/controls.js"></script>
    <script src="js/ui.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create planets.json with all planet data**

```javascript
// js/data/planets.js
const PLANET_DATA = {
    sun: {
        name: { vi: "Mặt Trời", en: "Sun" },
        type: "star",
        diameter: 1392700,
        temperature: 5500,
        distanceFromSun: 0,
        orbitalPeriod: 0,
        moons: 0,
        color: 0xffdd00,
        emissive: 0xffaa00,
        features: ["Ngôi sao trung tâm hệ mặt trời", "Chiếm 99.86% khối lượng hệ mặt trời"],
        description: { 
            vi: "Mặt Trời là ngôi sao trung tâm của hệ mặt trời, chiếm khoảng 99.86% tổng khối lượng của hệ. Năng lượng từ Mặt Trời duy trì sự sống trên Trái Đất.",
            en: "The Sun is the star at the center of the Solar System. It contains 99.86% of the total mass of the Solar System."
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
        features: ["Hành tinh nhỏ nhất hệ mặt trời", "Không có khí quyển"],
        description: { 
            vi: "Sao Thủy là hành tinh nhỏ nhất và gần Mặt Trời nhất. Nó có bề mặt giống Mặt Trăng với nhiều hố va chạm.",
            en: "Mercury is the smallest planet in the Solar System and the closest to the Sun."
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
        features: ["Nóng nhất trong các hành tinh", "Quay ngược hướng"],
        description: { 
            vi: "Sao Kim là hành tinh nóng nhất trong hệ mặt trời do hiệu ứng nhà kính. Nó quay ngược so với các hành tinh khác.",
            en: "Venus is the hottest planet in the Solar System due to greenhouse effect."
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
            vi: "Trái Đất là hành tinh thứ ba từ Mặt Trời và là hành tinh duy nhất được biết là có sự sống.",
            en: "Earth is the third planet from the Sun and the only astronomical object known to harbor life."
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
            vi: "Sao Hỏa được gọi là hành tinh đỏ do oxit sắt trên bề mặt. Nó có núi lửa cao nhất hệ mặt trời.",
            en: "Mars is known as the Red Planet due to iron oxide on its surface."
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
        features: ["Lớn nhất trong các hành tinh", "Có vệ tinh Europa"],
        description: { 
            vi: "Sao Mộc là hành tinh lớn nhất trong hệ mặt trời. Nó có cơn bão lớn Đỏ đã tồn tại hàng trăm năm.",
            en: "Jupiter is the largest planet in the Solar System with a Great Red Spot storm."
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
        features: ["Có hệ vành đai đẹp nhất", "Nhiều vệ tinh nhất"],
        description: { 
            vi: "Sao Thổ nổi tiếng với hệ vành đai tuyệt đẹp được tạo từ băng và đá.",
            en: "Saturn is famous for its beautiful ring system made of ice and rock."
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
        features: ["Quay nghiêng 98 độ", "Khí quyển màu xanh lục"],
        description: { 
            vi: "Sao Thiên Vương là hành tinh duy nhất quay nghiêng trên quỹ đạo. Nó có màu xanh lục do khí metan.",
            en: "Uranus is the only planet that rotates on its side, with a blue-green color from methane."
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
        features: ["Gió mạnh nhất hệ mặt trời", "Hành tinh xa nhất"],
        description: { 
            vi: "Sao Hải Vương là hành tinh xa nhất từ Mặt Trời. Nó có những cơn gió mạnh nhất trong hệ mặt trời.",
            en: "Neptune is the farthest planet from the Sun with the strongest winds in the Solar System."
        }
    }
};

if (typeof module !== 'undefined') module.exports = PLANET_DATA;
```

- [ ] **Step 4: Create basic CSS styles**

```css
/* css/styles.css */
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

#app {
    display: grid;
    grid-template-columns: 1fr 320px;
    grid-template-rows: 60px 1fr 80px;
    height: 100vh;
}

/* Header */
#header {
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

#nav {
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

/* Canvas */
#canvas-container {
    position: relative;
    background: radial-gradient(ellipse at center, #0d0d20 0%, #050510 100%);
}

/* Info Panel */
#info-panel {
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
    box-shadow: 0 0 20px rgba(74, 144, 217, 0.3);
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

/* Toolbar */
#toolbar {
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

/* Modals */
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

/* Measurement Result */
.measurement-result {
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(20, 20, 40, 0.95);
    padding: 16px 32px;
    border-radius: 12px;
    border: 1px solid #4a7aaa;
    display: none;
}

.measurement-result.visible {
    display: block;
}

.measure-value {
    font-size: 28px;
    font-weight: 600;
    color: #7aaaee;
}

.measure-label {
    font-size: 12px;
    color: var(--text-muted);
    text-align: center;
}

/* Responsive */
@media (max-width: 1024px) {
    #app {
        grid-template-columns: 1fr;
    }
    #info-panel {
        display: none;
    }
}
```

- [ ] **Step 5: Commit**

```bash
git add index.html css/styles.css js/data/planets.js
git commit -m "feat: setup project structure and HTML/CSS"
```

---

## Task 2: Three.js Scene & Planets

**Files:**
- Modify: `js/planets.js` (create)

- [ ] **Step 1: Create planets.js with Three.js scene setup**

```javascript
// js/planets.js
class SolarSystem {
    constructor(scene) {
        this.scene = scene;
        this.planets = {};
        this.orbits = [];
        this.selectedPlanet = null;
        this.sun = null;
        this.measureMode = false;
        this.measurePoints = [];
        this.measureLine = null;
    }

    init() {
        this.createStars();
        this.createSun();
        this.createPlanets();
    }

    createStars() {
        const starsGeometry = new THREE.BufferGeometry();
        const starsCount = 2000;
        const positions = new Float32Array(starsCount * 3);

        for (let i = 0; i < starsCount * 3; i += 3) {
            const radius = 200 + Math.random() * 300;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i + 2] = radius * Math.cos(phi);
        }

        starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
        const stars = new THREE.Points(starsGeometry, starsMaterial);
        this.scene.add(stars);
    }

    createSun() {
        const data = PLANET_DATA.sun;
        
        // Sun sphere
        const geometry = new THREE.SphereGeometry(4, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: data.color,
            emissive: data.emissive
        });
        this.sun = new THREE.Mesh(geometry, material);
        this.sun.userData = { id: 'sun', ...data };
        this.scene.add(this.sun);

        // Sun glow
        const glowGeometry = new THREE.SphereGeometry(4.5, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: data.emissive,
            transparent: true,
            opacity: 0.3
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        this.sun.add(glow);

        // Point light
        const sunLight = new THREE.PointLight(0xffffee, 2, 300);
        this.scene.add(sunLight);
    }

    createPlanets() {
        const planetIds = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

        planetIds.forEach(id => {
            const data = PLANET_DATA[id];
            this.createPlanet(id, data);
        });
    }

    createPlanet(id, data) {
        // Orbit
        const orbitGeometry = new THREE.RingGeometry(data.distance - 0.1, data.distance + 0.1, 64);
        const orbitMaterial = new THREE.MeshBasicMaterial({
            color: 0x3a3a5a,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.3
        });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2;
        orbit.userData = { planetId: id };
        this.scene.add(orbit);
        this.orbits.push(orbit);

        // Planet
        const geometry = new THREE.SphereGeometry(data.size, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            color: data.color,
            roughness: 0.8,
            metalness: 0.1
        });
        const planet = new THREE.Mesh(geometry, material);

        // Random starting position
        const angle = Math.random() * Math.PI * 2;
        planet.position.x = Math.cos(angle) * data.distance;
        planet.position.z = Math.sin(angle) * data.distance;

        planet.userData = {
            id: id,
            distance: data.distance,
            speed: data.speed,
            angle: angle,
            ...data
        };

        this.scene.add(planet);
        this.planets[id] = planet;

        // Saturn's rings
        if (data.hasRings) {
            const ringGeometry = new THREE.RingGeometry(data.size * 1.4, data.size * 2.2, 32);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0xc9b96a,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.7
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2.5;
            planet.add(ring);
        }
    }

    update() {
        // Rotate planets around sun
        Object.values(this.planets).forEach(planet => {
            planet.userData.angle += planet.userData.speed;
            planet.position.x = Math.cos(planet.userData.angle) * planet.userData.distance;
            planet.position.z = Math.sin(planet.userData.angle) * planet.userData.distance;
            planet.rotation.y += 0.01;
        });

        // Rotate sun
        if (this.sun) {
            this.sun.rotation.y += 0.002;
        }
    }

    getClickableObjects() {
        const objects = [this.sun];
        Object.values(this.planets).forEach(p => objects.push(p));
        return objects;
    }

    selectPlanet(planetId) {
        // Deselect previous
        if (this.selectedPlanet) {
            const prev = this.planets[this.selectedPlanet];
            if (prev) prev.material.emissive.setHex(0x000000);
            if (this.selectedPlanet === 'sun') this.sun.material.emissive.setHex(0xffaa00);
        }

        this.selectedPlanet = planetId;

        // Highlight selected
        if (planetId && planetId !== 'sun') {
            const planet = this.planets[planetId];
            if (planet) {
                planet.material.emissive.setHex(0x222222);
            }
        }
    }
}
```

- [ ] **Step 2: Commit**

```bash
git add js/planets.js
git commit -m "feat: add Three.js scene with sun and 8 planets"
```

---

## Task 3: Camera Controls & Interactions

**Files:**
- Modify: `js/controls.js` (create)

- [ ] **Step 1: Create controls.js with camera controls**

```javascript
// js/controls.js
class CameraController {
    constructor(camera, domElement, solarSystem) {
        this.camera = camera;
        this.domElement = domElement;
        this.solarSystem = solarSystem;
        
        this.cameraAngle = 0;
        this.cameraHeight = 30;
        this.cameraDistance = 60;
        
        this.isDragging = false;
        this.previousMousePosition = { x: 0, y: 0 };
        
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        this.measureMode = false;
        this.measurePoints = [];
        
        this.init();
    }

    init() {
        this.domElement.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.domElement.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.domElement.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.domElement.addEventListener('wheel', this.onWheel.bind(this));
        this.domElement.addEventListener('click', this.onClick.bind(this));
        
        // Touch support
        this.domElement.addEventListener('touchstart', this.onTouchStart.bind(this));
        this.domElement.addEventListener('touchmove', this.onTouchMove.bind(this));
        this.domElement.addEventListener('touchend', this.onTouchEnd.bind(this));
    }

    onMouseDown(e) {
        if (e.button === 0) {
            this.isDragging = false;
            this.previousMousePosition = { x: e.clientX, y: e.clientY };
        }
    }

    onMouseUp(e) {
        this.isDragging = false;
    }

    onMouseMove(e) {
        const deltaX = e.clientX - this.previousMousePosition.x;
        const deltaY = e.clientY - this.previousMousePosition.y;
        
        if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
            this.isDragging = true;
        }
        
        if (this.isDragging) {
            this.cameraAngle += deltaX * 0.01;
            this.cameraHeight = Math.max(5, Math.min(80, this.cameraHeight - deltaY * 0.3));
            this.previousMousePosition = { x: e.clientX, y: e.clientY };
        }
    }

    onWheel(e) {
        this.cameraDistance = Math.max(20, Math.min(150, this.cameraDistance + e.deltaY * 0.05));
    }

    onClick(e) {
        if (this.isDragging) return;
        
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        const clickableObjects = this.solarSystem.getClickableObjects();
        const intersects = this.raycaster.intersectObjects(clickableObjects);
        
        if (intersects.length > 0) {
            const selected = intersects[0].object;
            const planetId = selected.userData.id;
            
            if (this.measureMode) {
                this.addMeasurePoint(selected.position.clone(), planetId);
            } else {
                window.dispatchEvent(new CustomEvent('planetSelected', { detail: planetId }));
            }
        }
    }

    onTouchStart(e) {
        if (e.touches.length === 1) {
            this.previousMousePosition = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        }
    }

    onTouchMove(e) {
        if (e.touches.length === 1) {
            const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
            const deltaY = e.touches[0].clientY - this.previousMousePosition.y;
            
            this.cameraAngle += deltaX * 0.01;
            this.cameraHeight = Math.max(5, Math.min(80, this.cameraHeight - deltaY * 0.3));
            
            this.previousMousePosition = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            };
        }
    }

    onTouchEnd(e) {
        // Handle tap for selection
    }

    update() {
        this.camera.position.x = Math.cos(this.cameraAngle) * this.cameraDistance;
        this.camera.position.z = Math.sin(this.cameraAngle) * this.cameraDistance;
        this.camera.position.y = this.cameraHeight;
        this.camera.lookAt(0, 0, 0);
    }

    reset() {
        this.cameraAngle = 0;
        this.cameraHeight = 30;
        this.cameraDistance = 60;
    }

    setMeasureMode(enabled) {
        this.measureMode = enabled;
        this.measurePoints = [];
    }

    addMeasurePoint(position, planetId) {
        this.measurePoints.push({ position, planetId });
        
        if (this.measurePoints.length === 2) {
            const distance = this.measurePoints[0].position.distanceTo(this.measurePoints[1].position);
            window.dispatchEvent(new CustomEvent('measurementComplete', { 
                detail: { 
                    distance: distance,
                    from: this.measurePoints[0].planetId,
                    to: this.measurePoints[1].planetId
                }
            }));
            this.measurePoints = [];
        }
    }
}
```

- [ ] **Step 2: Commit**

```bash
git add js/controls.js
git commit -m "feat: add camera controls and click interactions"
```

---

## Task 4: UI Components

**Files:**
- Modify: `js/ui.js` (create)

- [ ] **Step 1: Create ui.js with UI handlers**

```javascript
// js/ui.js
class UIController {
    constructor(solarSystem) {
        this.solarSystem = solarSystem;
        this.isPlaying = true;
        this.currentTool = 'select';
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupToolbar();
        this.setupEventListeners();
        
        // Show default planet info
        this.showPlanetInfo('earth');
    }

    setupNavigation() {
        const navBtns = document.querySelectorAll('.nav-btn');
        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                navBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const view = btn.dataset.view;
                this.handleViewChange(view);
            });
        });
    }

    setupToolbar() {
        const toolBtns = document.querySelectorAll('.tool-btn');
        toolBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tool = btn.dataset.tool;
                
                if (tool === 'play') {
                    this.togglePlay();
                    return;
                }
                
                // Toggle tool active state
                toolBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                this.currentTool = tool;
                this.handleToolChange(tool);
            });
        });
    }

    setupEventListeners() {
        window.addEventListener('planetSelected', (e) => {
            this.solarSystem.selectPlanet(e.detail);
            this.showPlanetInfo(e.detail);
        });

        window.addEventListener('measurementComplete', (e) => {
            this.showMeasurementResult(e.detail);
        });
    }

    handleViewChange(view) {
        switch(view) {
            case 'compare':
                this.showComparisonModal();
                break;
            case 'quiz':
                // TODO: Quiz implementation
                break;
            case 'exoplanet':
                // TODO: Exoplanet implementation
                break;
        }
    }

    handleToolChange(tool) {
        switch(tool) {
            case 'select':
                this.solarSystem.measureMode = false;
                break;
            case 'measure':
                this.solarSystem.measureMode = true;
                break;
            case 'zoom':
                // Handled by camera controller
                break;
        }
    }

    togglePlay() {
        this.isPlaying = !this.isPlaying;
        window.dispatchEvent(new CustomEvent('playToggle', { detail: this.isPlaying }));
        
        const playBtn = document.querySelector('[data-tool="play"]');
        playBtn.innerHTML = this.isPlaying ? '⏸️ Tạm dừng' : '▶️ Chơi tiếp';
    }

    showPlanetInfo(planetId) {
        const data = PLANET_DATA[planetId];
        if (!data) return;

        const planetCard = document.getElementById('planet-card');
        planetCard.innerHTML = `
            <div class="planet-header">
                <div class="planet-avatar" style="background: radial-gradient(circle at 30% 30%, #${data.color.toString(16).padStart(6, '0')}, #${Math.floor(data.color * 0.5).toString(16).padStart(6, '0')})"></div>
                <div>
                    <div class="planet-name">${data.name.vi}</div>
                    <div class="planet-type">${this.getTypeLabel(data.type)}</div>
                </div>
            </div>
            <div class="planet-stats">
                <div class="stat-item">
                    <div class="stat-label">Đường kính</div>
                    <div class="stat-value">${data.diameter.toLocaleString()} <span class="stat-unit">km</span></div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Nhiệt độ</div>
                    <div class="stat-value">${data.temperature}°C</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Khoảng cách</div>
                    <div class="stat-value">${data.distanceFromSun} <span class="stat-unit">triệu km</span></div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Chu kỳ quỹ đạo</div>
                    <div class="stat-value">${data.orbitalPeriod} <span class="stat-unit">${data.orbitalPeriod > 365 ? 'ngày' : 'ngày'}</span></div>
                </div>
            </div>
            <p class="planet-description">${data.description.vi}</p>
        `;

        const quickFacts = document.getElementById('quick-facts');
        quickFacts.innerHTML = `
            <div class="fact-item">
                <span class="fact-label">Số vệ tinh</span>
                <span class="fact-value">${data.moons}</span>
            </div>
            <div class="fact-item">
                <span class="fact-label">Loại</span>
                <span class="fact-value">${this.getTypeLabel(data.type)}</span>
            </div>
            ${data.features.map(f => `
                <div class="fact-item">
                    <span class="fact-label">Đặc điểm</span>
                    <span class="fact-value">${f}</span>
                </div>
            `).join('')}
        `;
    }

    getTypeLabel(type) {
        const types = {
            'star': 'Ngôi sao',
            'rocky': 'Hành tinh đá',
            'gas_giant': 'Khí khổng lồ',
            'ice_giant': 'Băng khổng lồ'
        };
        return types[type] || type;
    }

    showMeasurementResult(result) {
        let measureDisplay = document.getElementById('measure-display');
        if (!measureDisplay) {
            measureDisplay = document.createElement('div');
            measureDisplay.id = 'measure-display';
            measureDisplay.className = 'measurement-result';
            document.getElementById('canvas-container').appendChild(measureDisplay);
        }
        
        // Convert to real scale (approximate)
        const realDistance = result.distance * 1000000; // Simplified conversion
        
        measureDisplay.innerHTML = `
            <div class="measure-value">${realDistance.toLocaleString()} km</div>
            <div class="measure-label">${PLANET_DATA[result.from]?.name.vi || 'Điểm 1'} → ${PLANET_DATA[result.to]?.name.vi || 'Điểm 2'}</div>
        `;
        measureDisplay.classList.add('visible');
        
        setTimeout(() => {
            measureDisplay.classList.remove('visible');
        }, 5000);
    }

    showComparisonModal() {
        const modalContainer = document.getElementById('modals');
        modalContainer.innerHTML = `
            <div class="modal-overlay visible" id="compare-modal">
                <div class="modal">
                    <div class="modal-header">
                        <h2 class="modal-title">So sánh kích thước các hành tinh</h2>
                        <button class="modal-close" onclick="document.getElementById('compare-modal').remove()">×</button>
                    </div>
                    <div class="comparison-container" style="display: flex; align-items: flex-end; justify-content: center; gap: 8px; height: 250px; padding: 20px; background: #0a0a15; border-radius: 12px;">
                        ${this.renderComparisonBars()}
                    </div>
                </div>
            </div>
        `;
    }

    renderComparisonBars() {
        const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
        const maxDiameter = 139820; // Jupiter
        
        return planets.map(id => {
            const data = PLANET_DATA[id];
            const height = (data.diameter / maxDiameter) * 200;
            const width = Math.max(20, height);
            
            return `
                <div class="comparison-bar">
                    <div style="width: ${width}px; height: ${height}px; background: radial-gradient(circle at 30% 30%, #${data.color.toString(16).padStart(6, '0')}, #${Math.floor(data.color * 0.5).toString(16).padStart(6, '0')}); border-radius: 50%; margin-bottom: 8px;"></div>
                    <div style="font-size: 11px; color: #6a6a9a;">${data.name.vi}</div>
                    <div style="font-size: 10px; color: #666;">${data.diameter.toLocaleString()}</div>
                </div>
            `;
        }).join('');
    }
}
```

- [ ] **Step 2: Commit**

```bash
git add js/ui.js
git commit -m "feat: add UI controllers and event handlers"
```

---

## Task 5: Main Application

**Files:**
- Modify: `js/main.js` (create)

- [ ] **Step 1: Create main.js with app initialization**

```javascript
// js/main.js
class SolarSystemApp {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.solarSystem = null;
        this.cameraController = null;
        this.uiController = null;
        this.isPlaying = true;
        
        this.init();
    }

    init() {
        this.initThreeJS();
        this.initSolarSystem();
        this.initControllers();
        this.initEventListeners();
        this.animate();
    }

    initThreeJS() {
        // Scene
        this.scene = new THREE.Scene();
        
        // Camera
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth - 320, window.innerHeight - 140);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000000, 0);
        
        const container = document.getElementById('canvas-container');
        container.appendChild(this.renderer.domElement);
        
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x333333);
        this.scene.add(ambientLight);
    }

    initSolarSystem() {
        this.solarSystem = new SolarSystem(this.scene);
        this.solarSystem.init();
    }

    initControllers() {
        this.cameraController = new CameraController(
            this.camera,
            this.renderer.domElement,
            this.solarSystem
        );
        
        this.uiController = new UIController(this.solarSystem);
    }

    initEventListeners() {
        // Window resize
        window.addEventListener('resize', () => this.onResize());
        
        // Play toggle
        window.addEventListener('playToggle', (e) => {
            this.isPlaying = e.detail;
        });
    }

    onResize() {
        const container = document.getElementById('canvas-container');
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.isPlaying) {
            this.solarSystem.update();
        }
        
        this.cameraController.update();
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SolarSystemApp();
});
```

- [ ] **Step 2: Commit**

```bash
git add js/main.js
git commit -m "feat: add main app initialization and animation loop"
```

---

## Task 6: Testing & Verification

**Files:**
- Test: Open in browser

- [ ] **Step 1: Verify HTML/CSS loads correctly**

```bash
# Open index.html in browser and check:
# - Header displays with logo and navigation
# - 3D canvas renders with black background
# - Info panel shows Earth info
# - Toolbar displays 5 buttons
```

- [ ] **Step 2: Verify Three.js scene**

```bash
# Check in browser console:
# - No errors
# - Sun visible at center with yellow glow
# - 8 planets visible orbiting
# - Stars in background
```

- [ ] **Step 3: Verify interactions**

```bash
# Test:
# - Drag mouse: camera rotates
# - Scroll: zoom in/out
# - Click planet: info panel updates
# - Click "So sánh": modal opens
# - Click play/pause: animation toggles
```

- [ ] **Step 4: Fix any issues and commit**

```bash
git add -A
git commit -m "fix: resolve any issues found during testing"
```

---

## Task 7: Add GitHub Folder (Optional)

**Files:**
- Create: `.gitignore`

- [ ] **Step 1: Create .gitignore**

```
node_modules/
.DS_Store
*.log
```

- [ ] **Step 2: Final commit**

```bash
git add .gitignore
git commit -m "chore: add .gitignore"
```

---

## Summary

| Task | Description | Status |
|------|-------------|--------|
| 1 | Project setup (HTML, CSS, Data) | ⬜ |
| 2 | Three.js scene & planets | ⬜ |
| 3 | Camera controls | ⬜ |
| 4 | UI components | ⬜ |
| 5 | Main app | ⬜ |
| 6 | Testing & verification | ⬜ |
| 7 | GitHub setup | ⬜ |

**Estimated time:** 2-3 hours for MVP

---

*Plan created: 2026-03-29*
*Version: 1.0*
