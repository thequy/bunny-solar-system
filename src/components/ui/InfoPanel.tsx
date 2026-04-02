'use client';

import { PlanetData } from '@/types';

interface InfoPanelProps {
  planetData: PlanetData | null;
  onViewCrossSection?: () => void;
  onClose?: () => void;
}

export default function InfoPanel({ planetData, onViewCrossSection, onClose }: InfoPanelProps) {
  if (!planetData) {
    return (
    <aside className="info-panel glass-panel">
        <div className="panel-section">
          <div className="panel-title">Thông tin hành tinh</div>
          <p>Chọn một hành tinh để xem thông tin</p>
        </div>
      </aside>
    );
  }

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      star: 'Ngôi sao',
      rocky: 'Hành tinh đá',
      gas_giant: 'Khí khổng lồ',
      ice_giant: 'Băng khổng lồ',
    };
    return types[type] || type;
  };

  const colorHex = planetData.color.toString(16).padStart(6, '0');
  const darkColor = (planetData.color * 0.5).toString(16).padStart(6, '0');

  return (
    <aside className="info-panel glass-panel">
      <div className="panel-section">
        <div className="panel-title">
          Thông tin hành tinh
          {onClose && (
            <button className="close-btn" onClick={onClose}>×</button>
          )}
        </div>
        <div className="planet-card">
          <div className="planet-header">
            <div
              className="planet-avatar"
              style={{
                background: `radial-gradient(circle at 30% 30%, #${colorHex}, #${darkColor})`,
              }}
            />
            <div>
              <div className="planet-name">{planetData.name.vi}</div>
              <div className="planet-type">{getTypeLabel(planetData.type)}</div>
            </div>
          </div>
          <div className="planet-stats">
            <div className="stat-item">
              <div className="stat-label">Đường kính</div>
              <div className="stat-value">
                {planetData.diameter.toLocaleString()} <span className="stat-unit">km</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Nhiệt độ</div>
              <div className="stat-value">{planetData.temperature}°C</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Khoảng cách</div>
              <div className="stat-value">
                {planetData.distanceFromSun} <span className="stat-unit">triệu km</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Chu kỳ quỹ đạo</div>
              <div className="stat-value">{planetData.orbitalPeriod} ngày</div>
            </div>
          </div>
          <p className="planet-description">{planetData.description.vi}</p>
          <button 
            onClick={() => onViewCrossSection?.()}
            style={{
              marginTop: '16px',
              padding: '10px 20px',
              background: 'rgba(100, 150, 255, 0.3)',
              border: '1px solid rgba(100, 150, 255, 0.5)',
              borderRadius: '8px',
              color: '#fff',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Xem mặt cắt
          </button>
        </div>
      </div>
      <div className="panel-section">
        <div className="panel-title">Thông số nhanh</div>
        <div className="quick-facts">
          <div className="fact-item">
            <span className="fact-label">Số vệ tinh</span>
            <span className="fact-value">{planetData.moons}</span>
          </div>
          <div className="fact-item">
            <span className="fact-label">Loại</span>
            <span className="fact-value">{getTypeLabel(planetData.type)}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
