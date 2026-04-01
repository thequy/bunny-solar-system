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

        // Check for solar system objects first
        let clickableObjects = this.solarSystem.getClickableObjects();
        const intersects = this.raycaster.intersectObjects(clickableObjects);

        if (intersects.length > 0) {
            const selected = intersects[0].object;
            const planetId = selected.userData.id;

            if (this.measureMode) {
                this.addMeasurePoint(selected.position.clone(), planetId);
            } else {
                window.dispatchEvent(new CustomEvent('planetSelected', { detail: planetId }));
            }
            return;
        }

        // Check for exoplanets
        clickableObjects = this.solarSystem.exoplanets;
        const exoIntersects = this.raycaster.intersectObjects(clickableObjects);

        if (exoIntersects.length > 0) {
            const selected = exoIntersects[0].object;
            const planetId = selected.userData.id;
            window.dispatchEvent(new CustomEvent('exoplanetSelected', { detail: planetId }));
            return;
        }

        // Click on empty space - deselect
        window.dispatchEvent(new CustomEvent('deselectPlanet'));
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

    // Focus on a specific planet
    focusOnPlanet(planetId) {
        const planet = this.solarSystem.planets[planetId];
        if (planet) {
            const targetDistance = planet.geometry.parameters.radius * 10;
            const lerpFactor = 0.05;

            // Animate camera to focus on planet
            const animateFocus = () => {
                const dx = planet.position.x - this.camera.position.x;
                const dy = planet.position.y - this.camera.position.y;
                const dz = planet.position.z - this.camera.position.z;

                this.camera.position.x += dx * lerpFactor;
                this.camera.position.y += dy * lerpFactor;
                this.camera.position.z += dz * lerpFactor;

                this.camera.lookAt(planet.position);

                if (this.cameraDistance > targetDistance) {
                    this.cameraDistance -= (this.cameraDistance - targetDistance) * 0.1;
                    requestAnimationFrame(animateFocus);
                }
            };

            animateFocus();
        }
    }
}
