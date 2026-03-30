'use client';

import { PLANET_DATA } from '@/data/planets';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComparisonModal({ isOpen, onClose }: ComparisonModalProps) {
  if (!isOpen) return null;

  const planets = ['mercury', 'venus', 'earth', 'moon', 'mars', 'neptune', 'uranus', 'saturn', 'jupiter'];
  const maxDiameter = 139820;

  return (
    <div className="modal-overlay visible" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">So sánh kích thước các hành tinh</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="comparison-container" style={{ background: '#0a0a1e', minHeight: '400px', padding: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
          {planets.map((id) => {
            const data = PLANET_DATA[id];
            const baseDiameter = 4879;
            const size = Math.min(180, Math.max(8, (data.diameter / baseDiameter) * 10));
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
