'use client';

import { PlanetData } from '@/types';

interface CrossSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  planetData: PlanetData | null;
  planetId: string;
}

interface PlanetLayer {
  name: string;
  color: string;
  percentage: number;
}

const CROSS_SECTION_DATA: Record<string, PlanetLayer[]> = {
  mercury: [
    { name: "Vỏ ngoài", color: "#8B8B8B", percentage: 20 },
    { name: "Mantel", color: "#6B6B6B", percentage: 42 },
    { name: "Lõi", color: "#FF6B00", percentage: 38 }
  ],
  venus: [
    { name: "Vỏ ngoài", color: "#C9B896", percentage: 15 },
    { name: "Mantel", color: "#A89676", percentage: 40 },
    { name: "Lõi", color: "#FF8C00", percentage: 45 }
  ],
  earth: [
    { name: "Vỏ ngoài", color: "#4A90D9", percentage: 10 },
    { name: "Mantel", color: "#8B4513", percentage: 45 },
    { name: "Lõi", color: "#FF4500", percentage: 45 }
  ],
  mars: [
    { name: "Vỏ ngoài", color: "#D94A3A", percentage: 12 },
    { name: "Mantel", color: "#8B2500", percentage: 43 },
    { name: "Lõi", color: "#CD853F", percentage: 45 }
  ],
  jupiter: [
    { name: "Khí quyển", color: "#D9A86A", percentage: 20 },
    { name: "Mantel Hydro", color: "#B8860B", percentage: 50 },
    { name: "Lõi", color: "#8B4513", percentage: 30 }
  ],
  saturn: [
    { name: "Khí quyển", color: "#E6D98A", percentage: 20 },
    { name: "Mantel Hydro", color: "#DAA520", percentage: 50 },
    { name: "Lõi", color: "#8B4513", percentage: 30 }
  ],
  uranus: [
    { name: "Khí quyển", color: "#8AD9D9", percentage: 20 },
    { name: "Mantel băng", color: "#5F9EA0", percentage: 55 },
    { name: "Lõi", color: "#4682B4", percentage: 25 }
  ],
  neptune: [
    { name: "Khí quyển", color: "#4A6AD9", percentage: 20 },
    { name: "Mantel băng", color: "#4169E1", percentage: 55 },
    { name: "Lõi", color: "#1E90FF", percentage: 25 }
  ]
};

export default function CrossSectionModal({ isOpen, onClose, planetData, planetId }: CrossSectionModalProps) {
  if (!isOpen || !planetData) return null;
  
  const layers = CROSS_SECTION_DATA[planetId];
  if (!layers) {
    return (
      <div className="modal-overlay visible" onClick={onClose}>
        <div className="modal glass-panel" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">Mặt cắt - {planetData.name.vi}</h2>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <p>Chưa có dữ liệu mặt cắt cho hành tinh này.</p>
          </div>
        </div>
      </div>
    );
  }

  const totalDiameter = planetData.diameter;

  return (
    <div className="modal-overlay visible" onClick={onClose}>
      <div className="modal glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Mặt cắt - {planetData.name.vi}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div style={{ padding: '20px', display: 'flex', gap: '40px', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '200px', height: '200px' }}>
            {layers.map((layer, index) => {
              const radius = 100 * Math.sqrt(layer.percentage / 100);
              return (
                <div
                  key={layer.name}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: `${radius * 2}px`,
                    height: `${radius * 2}px`,
                    borderRadius: '50%',
                    background: layer.color,
                    boxShadow: `inset 0 0 20px rgba(0,0,0,0.3)`
                  }}
                />
              );
            }).reverse()}
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: '20px' }}>Cấu trúc bên trong</h3>
            {layers.map((layer, index) => {
              const layerDiameter = (totalDiameter * layer.percentage / 100).toLocaleString();
              return (
                <div key={layer.name} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '16px',
                  padding: '12px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '8px'
                }}>
                  <div style={{ 
                    width: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    background: layer.color,
                    marginRight: '12px'
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500' }}>{layer.name}</div>
                    <div style={{ fontSize: '12px', color: '#aaa' }}>
                      Đường kính: ~{layerDiameter} km ({layer.percentage}%)
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
