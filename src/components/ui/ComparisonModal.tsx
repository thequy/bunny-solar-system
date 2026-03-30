'use client';

import { PLANET_DATA } from '@/data/planets';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComparisonModal({ isOpen, onClose }: ComparisonModalProps) {
  if (!isOpen) return null;

  const planets = ['mercury', 'venus', 'earth', 'moon', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
  const maxDiameter = 139820;
  const scaleFactors: Record<string, number> = {
    moon: 0.27,
    mars: 0.53,
    mercury: 0.38,
    venus: 1.2,
    earth: 1.3,
    uranus: 0.9,
    neptune: 0.5,
    saturn: 0.4,
    jupiter: 0.45
  };

  return (
    <div className="modal-overlay visible" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">So sánh kích thước các hành tinh</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="comparison-container" style={{ background: '#0a0a1e', minHeight: '600px', padding: '50px 40px', display: 'flex', justifyContent: 'center', gap: '50px', flexWrap: 'wrap' }}>
          {planets.map((id) => {
            const data = PLANET_DATA[id];
            const scale = scaleFactors[id] || 1;
            const size = Math.max(20, ((data.diameter / maxDiameter) * 300) * scale);
            const r = (data.color >> 16) & 255;
            const g = (data.color >> 8) & 255;
            const b = data.color & 255;
            const darkR = Math.max(0, r - 80);
            const darkG = Math.max(0, g - 80);
            const darkB = Math.max(0, b - 80);

            return (
              <div key={id} className="comparison-bar" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    background: `radial-gradient(circle at 35% 35%, rgb(${r},${g},${b}), rgb(${darkR},${darkG},${darkB}))`,
                    borderRadius: '50%',
                    marginBottom: '12px',
                    boxShadow: `0 0 25px rgba(${r},${g},${b},0.6)`,
                  }}
                />
                <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: '600' }}>{data.name.vi}</div>
                <div style={{ fontSize: '12px', color: '#aaa' }}>{data.diameter.toLocaleString()} km</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
