class UIController {
    constructor(solarSystem) {
        this.solarSystem = solarSystem;
        this.isPlaying = true;
        this.currentTool = 'select';
        this.currentView = 'solar';
        this.selectedExoplanetType = 'all';

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

        window.addEventListener('exoplanetSelected', (e) => {
            this.showExoplanetModal(e.detail);
        });

        window.addEventListener('deselectPlanet', () => {
            if (this.solarSystem.selectedPlanet) {
                this.solarSystem.selectPlanet(null);
            }
        });

        window.addEventListener('measurementComplete', (e) => {
            this.showMeasurementResult(e.detail);
        });

        // Cross-section layer click handler
        window.addEventListener('crossSectionLayerClick', (e) => {
            const planetId = e.detail.planetId;
            const layerName = e.detail.layerName;
            this.showLayerInfo(planetId, layerName);
        });
    }

    handleViewChange(view) {
        this.currentView = view;

        switch (view) {
            case 'solar':
                this.hideAllModals();
                // Show exoplanets if they exist
                if (this.solarSystem.exoplanets.length === 0) {
                    this.solarSystem.createExoplanets();
                }
                break;

            case 'exoplanet':
                this.showExoplanetModal();
                break;

            case 'compare':
                this.showComparisonModal();
                break;

            case 'quiz':
                this.showQuizModal();
                break;
        }
    }

    handleToolChange(tool) {
        switch (tool) {
            case 'select':
                this.solarSystem.measureMode = false;
                // Hide cross-section if active
                if (this.solarSystem.crossSectionActive) {
                    this.solarSystem.hideCrossSection();
                }
                break;

            case 'measure':
                this.solarSystem.measureMode = true;
                break;

            case 'zoom':
                // Zoom tool - focus on selected planet
                if (this.solarSystem.selectedPlanet) {
                    const cameraController = window.app.cameraController;
                    if (cameraController) {
                        cameraController.focusOnPlanet(this.solarSystem.selectedPlanet);
                    }
                }
                break;

            case 'settings':
                this.showSettingsModal();
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
        let factsHtml = `
            <div class="fact-item">
                <span class="fact-label">Số vệ tinh</span>
                <span class="fact-value">${data.moons}</span>
            </div>
            <div class="fact-item">
                <span class="fact-label">Loại</span>
                <span class="fact-value">${this.getTypeLabel(data.type)}</span>
            </div>
        `;

        if (data.features) {
            factsHtml += data.features.map(f => `
                <div class="fact-item">
                    <span class="fact-label">Đặc điểm</span>
                    <span class="fact-value">${f}</span>
                </div>
            `).join('');
        }

        // Add cross-section button for planets with layers
        if (data.layers) {
            factsHtml += `
                <div class="fact-item" style="margin-top: 8px; border-top: 1px solid rgba(42, 42, 74, 0.5);">
                    <span class="fact-label">Cấu trúc</span>
                    <button class="cross-section-btn" onclick="window.uiController.showCrossSection('${planetId}')" style="background: linear-gradient(135deg, #4a90d9, #3a7a8a); border: none; color: white; padding: 4px 12px; border-radius: 6px; cursor: pointer; font-size: 12px;">
                        🔬 Xem mặt cắt
                    </button>
                </div>
            `;
        }

        quickFacts.innerHTML = factsHtml;
    }

    getTypeLabel(type) {
        const types = {
            'star': 'Ngôi sao',
            'rocky': 'Hành tinh đá',
            'gas_giant': 'Khí khổng lồ',
            'ice_giant': 'Băng khổng lồ',
            'super_earth': 'Siêu Trái Đất',
            'mini_neptune': 'Sao Hải Vương nhỏ',
            'hot_jupiter': 'Sao Mộc nóng',
            'hot_neptune': 'Sao Hải Vương nóng'
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

    hideAllModals() {
        const modalContainer = document.getElementById('modals');
        modalContainer.innerHTML = '';

        // Reset size comparison if active
        if (this.solarSystem.sizeComparisonActive) {
            this.solarSystem.resetSizeComparison();
        }

        // Hide cross-section if active
        if (this.solarSystem.crossSectionActive) {
            this.solarSystem.hideCrossSection();
        }
    }

    // Comparison Modal with size comparison
    showComparisonModal() {
        const modalContainer = document.getElementById('modals');
        modalContainer.innerHTML = `
            <div class="modal-overlay visible" id="compare-modal">
                <div class="modal">
                    <div class="modal-header">
                        <h2 class="modal-title">So sánh kích thước các hành tinh</h2>
                        <button class="modal-close" onclick="document.getElementById('compare-modal').remove()">×</button>
                    </div>
                    <div style="margin-bottom: 20px; text-align: center;">
                        <p style="color: var(--text-secondary); margin-bottom: 16px;">
                            Chọn một hành tinh để so sánh kích thước
                        </p>
                        <div class="comparison-container" id="comparison-planets">
                            ${this.renderComparisonPlanets()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderComparisonPlanets() {
        const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

        return planets.map(id => {
            const data = PLANET_DATA[id];
            const colorHex = data.color.toString(16).padStart(6, '0');
            const darkColor = Math.floor(data.color * 0.5).toString(16).padStart(6, '0');

            return `
                <div class="comparison-bar" onclick="window.uiController.startSizeComparison('${id}')">
                    <div class="size-comparison-planet" style="width: ${data.size * 20}px; height: ${data.size * 20}px; background: radial-gradient(circle at 30% 30%, #${colorHex}, #${darkColor}); border-radius: 50%; cursor: pointer; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 10px; color: white; text-shadow: 0 0 5px rgba(0,0,0,0.5);">${data.name.vi.substring(0, 2)}</span>
                    </div>
                    <div class="size-comparison-label">${data.name.vi}</div>
                </div>
            `;
        }).join('');
    }

    startSizeComparison(selectedPlanetId) {
        const modalContainer = document.getElementById('modals');
        const compareModal = document.getElementById('compare-modal');

        // Get the selected planet data
        const selectedData = PLANET_DATA[selectedPlanetId];
        if (!selectedData) return;

        // Create comparison view with Earth as reference and selected planet scaled
        modalContainer.innerHTML = `
            <div class="modal-overlay visible" id="compare-modal">
                <div class="modal">
                    <div class="modal-header">
                        <h2 class="modal-title">So sánh kích thước</h2>
                        <button class="modal-close" onclick="document.getElementById('compare-modal').remove()">×</button>
                    </div>
                    <div style="text-align: center; margin-bottom: 20px;">
                        <p style="color: var(--text-secondary);">
                            ${PLANET_DATA.earth.name.vi} (tham chiếu) so với ${selectedData.name.vi}
                        </p>
                    </div>
                    <div class="size-comparison-container" id="comparison-result">
                        <!-- Earth -->
                        <div style="text-align: center;">
                            <div class="size-comparison-planet" style="width: 26px; height: 26px; background: radial-gradient(circle at 30% 30%, #4a90d9, #2a5a8a); border-radius: 50%; margin-bottom: 12px;"></div>
                            <div class="size-comparison-label">${PLANET_DATA.earth.name.vi}</div>
                        </div>
                        <!-- Selected Planet -->
                        <div style="text-align: center;">
                            <div id="comparison-planet" class="size-comparison-planet" style="width: ${selectedData.size * 26}px; height: ${selectedData.size * 26}px; background: radial-gradient(circle at 30% 30%, #${selectedData.color.toString(16).padStart(6, '0')}, #${Math.floor(selectedData.color * 0.5).toString(16).padStart(6, '0')}); border-radius: 50%; margin-bottom: 12px; transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);"></div>
                            <div class="size-comparison-label">${selectedData.name.vi}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Animate the size comparison with zoom effect
        const comparisonPlanet = document.getElementById('comparison-planet');
        if (comparisonPlanet) {
            let currentSize = 26;
            const targetSize = selectedData.size * 26;
            const duration = 1000;
            const startTime = Date.now();

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);

                currentSize = 26 + (targetSize - 26) * eased;
                comparisonPlanet.style.width = `${currentSize}px`;
                comparisonPlanet.style.height = `${currentSize}px`;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            animate();
        }
    }

    // Exoplanet Modal with filtering
    showExoplanetModal(selectedId = null) {
        const modalContainer = document.getElementById('modals');

        // Get unique types for filters
        const types = ['all', ...new Set(EXOPLANET_DATA.map(ep => ep.type))];
        const typeLabels = {
            'all': 'Tất cả',
            'super_earth': 'Siêu Trái Đất',
            'mini_neptune': 'Sao Hải Vương nhỏ',
            'hot_jupiter': 'Sao Mộc nóng',
            'hot_neptune': 'Sao Hải Vương nóng'
        };

        modalContainer.innerHTML = `
            <div class="modal-overlay visible" id="exoplanet-modal">
                <div class="modal">
                    <div class="modal-header">
                        <h2 class="modal-title">Exoplanets - Hành tinh ngoài hệ mặt trời</h2>
                        <button class="modal-close" onclick="document.getElementById('exoplanet-modal').remove()">×</button>
                    </div>

                    <!-- Filters -->
                    <div class="exoplanet-filters">
                        ${types.map(type => `
                            <button class="filter-btn ${type === 'all' ? 'active' : ''}"
                                    onclick="window.uiController.filterExoplanets('${type}', this)">
                                ${typeLabels[type]}
                            </button>
                        `).join('')}
                    </div>

                    <!-- Exoplanet List -->
                    <div class="exoplanet-list" id="exoplanet-list">
                        ${this.renderExoplanetList()}
                    </div>
                </div>
            </div>
        `;

        // Highlight selected exoplanet if provided
        if (selectedId) {
            const selectedItem = document.querySelector(`[data-exoid="${selectedId}"]`);
            if (selectedItem) {
                selectedItem.classList.add('selected');
                selectedItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    renderExoplanetList() {
        return EXOPLANET_DATA.map(ep => `
            <div class="exoplanet-item" data-exoid="${ep.id}" onclick="window.uiController.selectExoplanet('${ep.id}')">
                <div class="exoplanet-avatar" style="background: radial-gradient(circle at 30% 30%, #${ep.color.toString(16).padStart(6, '0')}, #${Math.floor(ep.color * 0.5).toString(16).padStart(6, '0')});"></div>
                <div class="exoplanet-info">
                    <div class="exoplanet-name">${ep.name.vi}</div>
                    <div class="exoplanet-type">${this.getTypeLabel(ep.type)}</div>
                </div>
                <div class="exoplanet-stats">
                    <div class="exoplanet-stat">
                        <div class="exoplanet-stat-value">${ep.diameter.toLocaleString()}</div>
                        <div class="exoplanet-stat-label">Đường kính (km)</div>
                    </div>
                    <div class="exoplanet-stat">
                        <div class="exoplanet-stat-value">${ep.orbitalPeriod}</div>
                        <div class="exoplanet-stat-label">Năm</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    filterExoplanets(type, btn) {
        this.selectedExoplanetType = type;

        // Update active button
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        if (btn) btn.classList.add('active');

        // Filter list display
        const items = document.querySelectorAll('.exoplanet-item');
        items.forEach(item => {
            const exoid = item.dataset.exoid;
            const data = EXOPLANET_DATA.find(ep => ep.id === exoid);
            if (type === 'all' || data.type === type) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });

        // Filter 3D scene
        this.solarSystem.filterExoplanets(type);
    }

    selectExoplanet(id) {
        const data = this.solarSystem.getExoplanetById(id);
        if (!data) return;

        // Show exoplanet info in panel
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
                    <div class="stat-label">Chu kỳ quỹ đạo</div>
                    <div class="stat-value">${data.orbitalPeriod} <span class="stat-unit">ngày</span></div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Khoảng cách</div>
                    <div class="stat-value">${data.distanceFromSun} <span class="stat-unit">năm ánh sáng</span></div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Vệ tinh</div>
                    <div class="stat-value">${data.moons}</div>
                </div>
            </div>
            <p class="planet-description">
                ${data.name.vi} là một hành tinh ngoài hệ mặt trời thuộc loại ${this.getTypeLabel(data.type)}.
                ${data.features ? 'Đặc điểm: ' + data.features.join(', ') : ''}
            </p>
        `;

        // Focus camera on exoplanet if it exists in scene
        const exoPlanet = this.solarSystem.exoplanetMeshes[id];
        if (exoPlanet) {
            const cameraController = window.app.cameraController;
            if (cameraController) {
                cameraController.focusOnPlanet(id);
            }
        }

        // Close modal after selection
        setTimeout(() => {
            document.getElementById('exoplanet-modal')?.remove();
        }, 1000);
    }

    // Quiz Modal
    showQuizModal() {
        const modalContainer = document.getElementById('modals');
        this.currentQuestionIndex = 0;
        this.score = 0;

        modalContainer.innerHTML = `
            <div class="modal-overlay visible" id="quiz-modal">
                <div class="modal">
                    <div class="modal-header">
                        <h2 class="modal-title">Quiz - Kiểm tra kiến thức</h2>
                        <button class="modal-close" onclick="document.getElementById('quiz-modal').remove()">×</button>
                    </div>
                    <div id="quiz-content">
                        ${this.renderQuizQuestion()}
                    </div>
                </div>
            </div>
        `;
    }

    renderQuizQuestion() {
        const question = QUIZ_QUESTIONS[this.currentQuestionIndex];
        if (!question) {
            return this.renderQuizResults();
        }

        return `
            <div class="quiz-question">${question.question.vi}</div>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <button class="quiz-option" onclick="window.uiController.checkAnswer(${index})">
                        ${option}
                    </button>
                `).join('')}
            </div>
            <div style="margin-top: 16px; text-align: right;">
                <span style="color: var(--text-muted); font-size: 14px;">
                    Câu ${this.currentQuestionIndex + 1}/${QUIZ_QUESTIONS.length}
                </span>
            </div>
        `;
    }

    checkAnswer(selectedIndex) {
        const question = QUIZ_QUESTIONS[this.currentQuestionIndex];
        const options = document.querySelectorAll('.quiz-option');

        // Disable all buttons
        options.forEach(btn => btn.disabled = true);

        if (selectedIndex === question.correct) {
            options[selectedIndex].classList.add('correct');
            this.score++;
        } else {
            options[selectedIndex].classList.add('incorrect');
            options[question.correct].classList.add('correct');
        }

        // Show explanation after delay
        setTimeout(() => {
            const explanationDiv = document.getElementById('quiz-explanation');
            if (explanationDiv) {
                explanationDiv.remove();
            }

            const explanation = document.createElement('div');
            explanation.id = 'quiz-explanation';
            explanation.className = 'quiz-message';
            explanation.style.marginTop = '20px';
            explanation.innerHTML = `<strong>Giải thích:</strong> ${question.explanation.vi}`;
            document.getElementById('quiz-content').appendChild(explanation);

            // Show next question or results after delay
            setTimeout(() => {
                this.currentQuestionIndex++;
                if (this.currentQuestionIndex < QUIZ_QUESTIONS.length) {
                    document.getElementById('quiz-content').innerHTML = this.renderQuizQuestion();
                } else {
                    document.getElementById('quiz-content').innerHTML = this.renderQuizResults();
                }
            }, 2000);
        }, 1000);
    }

    renderQuizResults() {
        const percentage = (this.score / QUIZ_QUESTIONS.length) * 100;
        let message = '';

        if (percentage === 100) {
            message = 'Tuyệt vời! Bạn là chuyên gia hệ mặt trời! 🌟';
        } else if (percentage >= 75) {
            message = 'Rất tốt! Kiến thức của bạn rất vững! 👍';
        } else if (percentage >= 50) {
            message = 'Khá tốt! Hãy học thêm nhé! 📚';
        } else {
            message = 'Cố lên! Hãy tìm hiểu thêm về hệ mặt trời! 💪';
        }

        return `
            <div class="quiz-score">${this.score}/${QUIZ_QUESTIONS.length}</div>
            <div class="quiz-message">${message}</div>
            <button class="quiz-restart-btn" onclick="window.uiController.showQuizModal()">Chơi lại</button>
        `;
    }

    // Cross-section Modal
    showCrossSection(planetId) {
        const data = PLANET_DATA[planetId];
        if (!data || !data.layers) return;

        this.solarSystem.showCrossSection(planetId);

        const modalContainer = document.getElementById('modals');
        modalContainer.innerHTML = `
            <div class="modal-overlay visible" id="crosssection-modal">
                <div class="modal">
                    <div class="modal-header">
                        <h2 class="modal-title">Cấu trúc bên trong ${data.name.vi}</h2>
                        <button class="modal-close" onclick="window.uiController.hideCrossSection()">×</button>
                    </div>
                    <div style="text-align: center; margin-bottom: 20px;">
                        <p style="color: var(--text-secondary);">
                            Click vào các lớp để xem thông tin chi tiết
                        </p>
                    </div>
                    <div class="cross-section-container" id="crosssection-content">
                        ${this.renderCrossSectionLayers(planetId, data.layers)}
                    </div>
                </div>
            </div>
        `;
    }

    renderCrossSectionLayers(planetId, layers) {
        return `
            <div style="text-align: center;">
                <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">
                    ${PLANET_DATA[planetId].name.vi}
                </div>
                <div class="cross-section-layers">
                    ${layers.map((layer, index) => `
                        <div class="cross-section-layer" style="background: rgba(${parseInt(layer.color.toString(16).substring(0,2)), parseInt(layer.color.toString(16).substring(2,4)), parseInt(layer.color.toString(16).substring(4,6)}, 0.3); border-left-color: #${layer.color.toString(16).padStart(6, '0')}; cursor: pointer;"
                             onclick="window.dispatchEvent(new CustomEvent('crossSectionLayerClick', { detail: { planetId: '${planetId}', layerName: '${layer.name.vi}' } }))">
                            ${layer.name.vi}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    hideCrossSection() {
        this.solarSystem.hideCrossSection();
        document.getElementById('crosssection-modal')?.remove();
    }

    showLayerInfo(planetId, layerName) {
        const data = PLANET_DATA[planetId];
        if (!data || !data.layers) return;

        const layer = data.layers.find(l => l.name.vi === layerName);
        if (!layer) return;

        alert(`Lớp: ${layer.name.vi}\nMàu sắc đại diện: #${layer.color.toString(16).padStart(6, '0')}`);
    }

    // Settings Modal
    showSettingsModal() {
        const modalContainer = document.getElementById('modals');
        modalContainer.innerHTML = `
            <div class="modal-overlay visible" id="settings-modal">
                <div class="modal">
                    <div class="modal-header">
                        <h2 class="modal-title">Cài đặt</h2>
                        <button class="modal-close" onclick="document.getElementById('settings-modal').remove()">×</button>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <div>
                            <label style="color: var(--text-secondary); font-size: 14px;">Tốc độ mô phỏng</label>
                            <input type="range" min="0.5" max="3" step="0.5" value="1"
                                   onchange="window.app.solarSystem.speedMultiplier = parseFloat(this.value)"
                                   style="width: 100%; margin-top: 8px;">
                        </div>
                        <div>
                            <label style="color: var(--text-secondary); font-size: 14px;">Hiển thị vành đai tiểu hành tinh</label>
                            <button onclick="window.uiController.toggleAsteroidBelt()"
                                    style="margin-top: 8px; padding: 8px 16px; background: linear-gradient(135deg, #4a90d9, #3a7a8a); border: none; color: white; border-radius: 6px; cursor: pointer;">
                                Toggle Asteroid Belt
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    toggleAsteroidBelt() {
        if (this.solarSystem.asteroidBelt) {
            this.solarSystem.asteroidBelt.visible = !this.solarSystem.asteroidBelt.visible;
        }
    }
}
