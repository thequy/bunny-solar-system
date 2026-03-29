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
                alert('Quiz sẽ được thêm trong phiên bản tới!');
                break;
            case 'exoplanet':
                alert('Exoplanets sẽ được thêm trong phiên bản tới!');
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

        const colorHex = data.color.toString(16).padStart(6, '0');
        const darkColor = Math.floor(data.color * 0.5).toString(16).padStart(6, '0');

        const planetCard = document.getElementById('planet-card');
        planetCard.innerHTML = `
            <div class="planet-header">
                <div class="planet-avatar" style="background: radial-gradient(circle at 30% 30%, #${colorHex}, #${darkColor})"></div>
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
            ${data.features ? data.features.map(f => `
                <div class="fact-item">
                    <span class="fact-label">Đặc điểm</span>
                    <span class="fact-value">${f}</span>
                </div>
            `).join('') : ''}
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
        
        const realDistance = result.distance * 1000000;
        
        measureDisplay.innerHTML = `
            <div class="measure-value">${Math.round(realDistance).toLocaleString()} km</div>
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
                    <div class="comparison-container">
                        ${this.renderComparisonBars()}
                    </div>
                </div>
            </div>
        `;
    }

    renderComparisonBars() {
        const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
        const maxDiameter = 139820;
        
        return planets.map(id => {
            const data = PLANET_DATA[id];
            const height = Math.max(15, (data.diameter / maxDiameter) * 200);
            const width = Math.max(20, height);
            const colorHex = data.color.toString(16).padStart(6, '0');
            const darkColor = Math.floor(data.color * 0.5).toString(16).padStart(6, '0');
            
            return `
                <div class="comparison-bar">
                    <div style="width: ${width}px; height: ${height}px; background: radial-gradient(circle at 30% 30%, #${colorHex}, #${darkColor}); border-radius: 50%; margin-bottom: 8px;"></div>
                    <div style="font-size: 11px; color: #6a6a9a;">${data.name.vi}</div>
                    <div style="font-size: 10px; color: #666;">${data.diameter.toLocaleString()}</div>
                </div>
            `;
        }).join('');
    }
}
