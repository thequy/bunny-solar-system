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

  return (
    <div className="modal-overlay visible" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">So sánh kích thước các hành tinh</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="comparison-container" style={{ background: '#0a0a1e' }}>
          {planets.map((id) => {
            const data = PLANET_DATA[id];
            const height = Math.max(20, (data.diameter / maxDiameter) * 300);
            const width = Math.max(25, height);
            const colorHex = data.color.toString(16).padStart(6, '0');
            const darkColor = (data.color * 0.4).toString(16).padStart(6, '0');

            return (
              <div key={id} className="comparison-bar">
                <div
                  style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    background: `radial-gradient(circle at 30% 30%, #${colorHex}, #${darkColor})`,
                    borderRadius: '50%',
                    marginBottom: '12px',
                    boxShadow: `0 0 20px rgba(${parseInt(colorHex.slice(0,2), 16)}, ${parseInt(colorHex.slice(2,4), 16)}, ${parseInt(colorHex.slice(4,6), 16)}, 0.5)`,
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
