'use client';

import { PLANET_DATA } from '@/data/planets';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComparisonModal({ isOpen, onClose }: ComparisonModalProps) {
  if (!isOpen) return null;

  const planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
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
        <div className="comparison-container">
          {planets.map((id) => {
            const data = PLANET_DATA[id];
            const height = Math.max(15, (data.diameter / maxDiameter) * 200);
            const width = Math.max(20, height);
            const colorHex = data.color.toString(16).padStart(6, '0');
            const darkColor = (data.color * 0.5).toString(16).padStart(6, '0');

            return (
              <div key={id} className="comparison-bar">
                <div
                  style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    background: `radial-gradient(circle at 30% 30%, #${colorHex}, #${darkColor})`,
                    borderRadius: '50%',
                    marginBottom: '8px',
                  }}
                />
                <div style={{ fontSize: '11px', color: '#6a6a9a' }}>{data.name.vi}</div>
                <div style={{ fontSize: '10px', color: '#666' }}>{data.diameter.toLocaleString()}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
