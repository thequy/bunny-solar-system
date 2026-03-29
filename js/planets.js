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
        Object.values(this.planets).forEach(planet => {
            planet.userData.angle += planet.userData.speed;
            planet.position.x = Math.cos(planet.userData.angle) * planet.userData.distance;
            planet.position.z = Math.sin(planet.userData.angle) * planet.userData.distance;
            planet.rotation.y += 0.01;
        });

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
}
