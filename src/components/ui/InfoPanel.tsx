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
      dwarf: 'Hành tinh lùn',
      satellite: 'Vệ tinh',
    };
    return types[type] || type;
  };

  const colorHex = planetData.color.toString(16).padStart(6, '0');
  const r = parseInt(colorHex.substring(0, 2), 16);
  const g = parseInt(colorHex.substring(2, 4), 16);
  const b = parseInt(colorHex.substring(4, 6), 16);
  
  const brightR = Math.min(Math.floor(r * 1.05), 255).toString(16).padStart(2, '0');
  const brightG = Math.min(Math.floor(g * 1.05), 255).toString(16).padStart(2, '0');
  const brightB = Math.min(Math.floor(b * 1.05), 255).toString(16).padStart(2, '0');
  
  const darkR = Math.floor(r * 0.5).toString(16).padStart(2, '0');
  const darkG = Math.floor(g * 0.5).toString(16).padStart(2, '0');
  const darkB = Math.floor(b * 0.5).toString(16).padStart(2, '0');
  
  const brightColor = `${brightR}${brightG}${brightB}`;
  const darkColor = `${darkR}${darkG}${darkB}`;

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
                background: `radial-gradient(circle at 30% 30%, #${brightColor}, #${darkColor})`,
              }}
            />
            <div>
              <div className="planet-name">{planetData.name.vi}</div>
              <div className="planet-type">{getTypeLabel(planetData.type)}</div>
            </div>
          </div>
          
          {/* NASA Data Section */}
          <div className="planet-stats">
            <div className="stat-item">
              <div className="stat-label">Đường kính</div>
              <div className="stat-value">
                {planetData.diameter.toLocaleString()} <span className="stat-unit">km</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Khoảng cách từ Mặt Trời</div>
              <div className="stat-value">
                {planetData.distanceFromSun} <span className="stat-unit">triệu km</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Chu kỳ quỹ đạo</div>
              <div className="stat-value">{planetData.orbitalPeriod.toLocaleString()} ngày</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Thời gian tự quay</div>
              <div className="stat-value">
                {planetData.rotationPeriod 
                  ? (planetData.rotationPeriod < 0 
                      ? `${Math.abs(planetData.rotationPeriod).toFixed(1)}h (ngược)'` 
                      : `${planetData.rotationPeriod}h`)
                  : '-'}
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Lực hấp dẫn</div>
              <div className="stat-value">
                {planetData.gravity ? `${planetData.gravity} m/s²` : '-'}
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Vận tốc thoát</div>
              <div className="stat-value">
                {planetData.escapeVelocity ? `${planetData.escapeVelocity} km/s` : '-'}
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Mật độ</div>
              <div className="stat-value">
                {planetData.density ? `${planetData.density} g/cm³` : '-'}
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Diện tích bề mặt</div>
              <div className="stat-value">
                {planetData.surfaceArea 
                  ? `${(planetData.surfaceArea / 1000000).toLocaleString()} triệu km²` 
                  : '-'}
              </div>
            </div>
          </div>
          
          {planetData.atmosphere && (
            <div style={{ marginTop: '12px' }}>
              <div className="stat-label" style={{ marginBottom: '6px' }}>Thành phần khí quyển</div>
              <div style={{ fontSize: '13px', color: '#ccc' }}>{planetData.atmosphere}</div>
            </div>
          )}
          
          <p className="planet-description" style={{ marginTop: '16px' }}>{planetData.description.vi}</p>
          
          {planetData.features && planetData.features.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              <div className="stat-label" style={{ marginBottom: '8px' }}>Đặc điểm nổi bật</div>
              <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '13px', color: '#ccc', lineHeight: '1.6' }}>
                {planetData.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          {planetData.type !== 'star' && planetData.type !== 'satellite' && (
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
          )}
        </div>
      </div>
    </aside>
  );
}