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

        // Exoplanet data
        this.exoplanets = [];
        this.exoplanetMeshes = {};

        // Size comparison state
        this.sizeComparisonActive = false;
        this.comparisonPlanet1 = null;
        this.comparisonPlanet2 = null;
        this.originalSizes = new Map();

        // Cross-section state
        this.crossSectionActive = false;
        this.crossSectionPlanet = null;
        this.crossSectionLayers = [];

        // Asteroid belt
        this.asteroidBelt = null;
    }

    init() {
        this.createStars();
        this.createAsteroidBelt();
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

    createAsteroidBelt() {
        // Create asteroid belt between Mars (distance 25) and Jupiter (distance 35)
        const asteroidCount = 1000;
        const geometry = new THREE.BufferGeometry();
        const positions = [];

        for (let i = 0; i < asteroidCount; i++) {
            // Random distance between Mars and Jupiter orbits
            const distance = 28 + Math.random() * 6;
            const angle = Math.random() * Math.PI * 2;
            const spread = (Math.random() - 0.5) * 3; // Vertical spread

            positions.push(
                Math.cos(angle) * distance,
                spread,
                Math.sin(angle) * distance
            );
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
            color: 0x8b7765,
            size: 0.15,
            transparent: true,
            opacity: 0.8
        });

        this.asteroidBelt = new THREE.Points(geometry, material);
        this.scene.add(this.asteroidBelt);
    }

    createSun() {
        const data = PLANET_DATA.sun;

        const geometry = new THREE.SphereGeometry(data.size, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: data.color,
            emissive: data.emissive
        });
        this.sun = new THREE.Mesh(geometry, material);
        this.sun.userData = { id: 'sun', ...data };
        this.scene.add(this.sun);

        const glowGeometry = new THREE.SphereGeometry(data.size * 1.15, 32, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: data.emissive,
            transparent: true,
            opacity: 0.3
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        this.sun.add(glow);

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
        // Create orbit line
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

        // Create planet mesh
        const geometry = new THREE.SphereGeometry(data.size, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            color: data.color,
            roughness: 0.8,
            metalness: 0.1
        });
        const planet = new THREE.Mesh(geometry, material);

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

        // Create rings for Saturn
        if (data.hasRings) {
            const ringGeometry = new THREE.RingGeometry(data.size * 1.4, data.size * 2.2, 64);
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
        // Update planets
        Object.values(this.planets).forEach(planet => {
            planet.userData.angle += planet.userData.speed;
            planet.position.x = Math.cos(planet.userData.angle) * planet.userData.distance;
            planet.position.z = Math.sin(planet.userData.angle) * planet.userData.distance;
            planet.rotation.y += 0.01;
        });

        // Update sun rotation
        if (this.sun) {
            this.sun.rotation.y += 0.002;
        }

        // Rotate asteroid belt slowly
        if (this.asteroidBelt) {
            this.asteroidBelt.rotation.y += 0.0005;
        }
    }

    getClickableObjects() {
        const objects = [this.sun];
        Object.values(this.planets).forEach(p => objects.push(p));
        return objects;
    }

    selectPlanet(planetId) {
        if (this.selectedPlanet) {
            if (this.selectedPlanet === 'sun') {
                this.sun.material.emissive.setHex(0xffaa00);
            } else {
                const prev = this.planets[this.selectedPlanet];
                if (prev) prev.material.emissive.setHex(0x000000);
            }
        }

        this.selectedPlanet = planetId;

        if (planetId && planetId !== 'sun') {
            const planet = this.planets[planetId];
            if (planet) {
                planet.material.emissive.setHex(0x222222);
            }
        }
    }

    // Size comparison functionality
    startSizeComparison(planet1, planet2) {
        this.sizeComparisonActive = true;
        this.comparisonPlanet1 = planet1;
        this.comparisonPlanet2 = planet2;

        // Store original sizes
        if (this.planets[planet1]) {
            const originalSize = this.planets[planet1].scale.x;
            this.originalSizes.set(planet1, originalSize);
        }
        if (this.planets[planet2]) {
            const originalSize = this.planets[planet2].scale.x;
            this.originalSizes.set(planet2, originalSize);
        }

        // Scale planets for comparison
        if (this.planets[planet1]) {
            this.planets[planet1].scale.setScalar(1.0);
        }
        if (this.planets[planet2]) {
            const sizeRatio = PLANET_DATA[planet2].diameter / PLANET_DATA[planet1].diameter;
            this.planets[planet2].scale.setScalar(sizeRatio);
        }
    }

    resetSizeComparison() {
        this.sizeComparisonActive = false;

        // Restore original sizes
        this.originalSizes.forEach((original, planetId) => {
            if (this.planets[planetId]) {
                this.planets[planetId].scale.setScalar(original);
            }
        });

        this.comparisonPlanet1 = null;
        this.comparisonPlanet2 = null;
        this.originalSizes.clear();
    }

    // Cross-section functionality
    showCrossSection(planetId) {
        const data = PLANET_DATA[planetId];
        if (!data || !data.layers) return;

        this.crossSectionActive = true;
        this.crossSectionPlanet = planetId;

        const planet = this.planets[planetId];
        if (!planet) return;

        // Store original mesh
        const originalGeometry = planet.geometry.clone();
        const originalMaterial = planet.material.clone();

        // Create cross-section visualization with layers
        const layers = [];
        const layerData = data.layers || [];

        for (let i = 0; i < layerData.length; i++) {
            const layer = layerData[i];
            const radius = planet.geometry.parameters.radius * (layer.radiusPercent / 100);

            const geometry = new THREE.SphereGeometry(radius, 32, 32);
            const material = new THREE.MeshStandardMaterial({
                color: layer.color,
                transparent: true,
                opacity: 0.7,
                roughness: 0.5,
                metalness: 0.1
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.userData = {
                layerName: layer.name.vi,
                color: layer.color
            };

            layers.push(mesh);
            planet.add(mesh);
        }

        this.crossSectionLayers = layers;
    }

    hideCrossSection() {
        if (this.crossSectionPlanet && this.planets[this.crossSectionPlanet]) {
            const planet = this.planets[this.crossSectionPlanet];

            // Remove all layer meshes
            while (planet.children.length > 0) {
                planet.remove(planet.children[0]);
            }
        }

        this.crossSectionActive = false;
        this.crossSectionPlanet = null;
        this.crossSectionLayers = [];
    }

    // Exoplanet functionality
    createExoplanets() {
        const exoplanetIds = EXOPLANET_DATA.map(ep => ep.id);

        exoplanetIds.forEach(id => {
            const data = EXOPLANET_DATA.find(ep => ep.id === id);
            if (!data) return;

            // Create simplified exoplanet representation
            const geometry = new THREE.SphereGeometry(data.size * 0.5, 16, 16);
            const material = new THREE.MeshStandardMaterial({
                color: data.color,
                roughness: 0.8,
                metalness: 0.1
            });
            const planet = new THREE.Mesh(geometry, material);

            // Position exoplanets in a circular pattern around the solar system
            const angle = (exoPlanets.indexOf(id) / exoPlanets.length) * Math.PI * 2;
            const distance = 80 + Math.random() * 20;

            planet.position.x = Math.cos(angle) * distance;
            planet.position.z = Math.sin(angle) * distance;

            planet.userData = {
                id: id,
                isExoplanet: true,
                ...data
            };

            this.scene.add(planet);
            this.exoplanets.push(planet);
            this.exoplanetMeshes[id] = planet;
        });
    }

    getExoplanetById(id) {
        return EXOPLANET_DATA.find(ep => ep.id === id);
    }

    filterExoplanets(type) {
        if (type === 'all') {
            this.exoplanets.forEach(planet => planet.visible = true);
        } else {
            this.exoplanets.forEach(planet => {
                const data = EXOPLANET_DATA.find(ep => ep.id === planet.userData.id);
                planet.visible = data && data.type === type;
            });
        }
    }

    // Animation for size comparison zoom effect
    animateSizeComparison(callback) {
        let progress = 0;
        const duration = 1000; // ms
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            progress = Math.min(elapsed / duration, 1);

            // Easing function
            const eased = 1 - Math.pow(1 - progress, 3);

            if (callback) callback(eased);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                if (callback) callback(1);
            }
        };

        animate();
    }

    // Get planet layers for cross-section legend
    getPlanetLayers(planetId) {
        const data = PLANET_DATA[planetId];
        return data ? data.layers : null;
    }
}
