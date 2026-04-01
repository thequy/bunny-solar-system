class SolarSystemApp {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.solarSystem = null;
        this.cameraController = null;
        this.uiController = null;
        this.isPlaying = true;
        this.speedMultiplier = 1;

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
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        const container = document.getElementById('canvas-container');
        const width = container.clientWidth;
        const height = container.clientHeight;

        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000000, 0);

        container.appendChild(this.renderer.domElement);

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
        window.addEventListener('resize', () => this.onResize());

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

document.addEventListener('DOMContentLoaded', () => {
    window.app = new SolarSystemApp();
});
