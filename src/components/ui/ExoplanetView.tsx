'use client';

import { useState, useMemo } from 'react';
import { EXOPLANET_DATA } from '@/data/exoplanets';

export default function ExoplanetView() {
  const [sizeFilter, setSizeFilter] = useState<string>('all');
  const [tempFilter, setTempFilter] = useState<string>('all');
  const [distanceFilter, setDistanceFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlanets = useMemo(() => {
    return EXOPLANET_DATA.filter(planet => {
      if (searchTerm && !planet.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (sizeFilter === 'small' && planet.size >= 1) return false;
      if (sizeFilter === 'medium' && (planet.size < 1 || planet.size > 2)) return false;
      if (sizeFilter === 'large' && planet.size <= 2) return false;
      if (tempFilter === 'cold' && planet.temperature >= 0) return false;
      if (tempFilter === 'moderate' && (planet.temperature < 0 || planet.temperature > 100)) return false;
      if (tempFilter === 'hot' && planet.temperature <= 100) return false;
      if (distanceFilter === 'near' && planet.distance >= 50) return false;
      if (distanceFilter === 'medium' && (planet.distance < 50 || planet.distance > 500)) return false;
      if (distanceFilter === 'far' && planet.distance <= 500) return false;
      return true;
    });
  }, [sizeFilter, tempFilter, distanceFilter, searchTerm]);

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      rocky: 'Hành tinh đá',
      gas: 'Khí khổng lồ',
      ice: 'Băng khổng lồ',
      'super-earth': 'Siêu Trái Đất'
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      rocky: '#D94A3A',
      gas: '#D9A86A',
      ice: '#8AD9D9',
      'super-earth': '#9B59B6'
    };
    return colors[type] || '#ccc';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', color: '#ffd700' }}>Danh sách Exoplanets ({filteredPlanets.length})</h2>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(100, 150, 255, 0.3)',
            background: 'rgba(20, 20, 50, 0.8)',
            color: '#fff',
            minWidth: '200px'
          }}
        />
        
        <select
          value={sizeFilter}
          onChange={(e) => setSizeFilter(e.target.value)}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(100, 150, 255, 0.3)',
            background: 'rgba(20, 20, 50, 0.8)',
            color: '#fff'
          }}
        >
          <option value="all">Tất cả kích thước</option>
          <option value="small">Nhỏ hơn Trái Đất</option>
          <option value="medium">Bằng Trái Đất</option>
          <option value="large">Lớn hơn Trái Đất</option>
        </select>
        
        <select
          value={tempFilter}
          onChange={(e) => setTempFilter(e.target.value)}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(100, 150, 255, 0.3)',
            background: 'rgba(20, 20, 50, 0.8)',
            color: '#fff'
          }}
        >
          <option value="all">Tất cả nhiệt độ</option>
          <option value="cold">Lạnh (&lt; 0°C)</option>
          <option value="moderate">Ấm (0-100°C)</option>
          <option value="hot">Nóng (&gt; 100°C)</option>
        </select>

        <select
          value={distanceFilter}
          onChange={(e) => setDistanceFilter(e.target.value)}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(100, 150, 255, 0.3)',
            background: 'rgba(20, 20, 50, 0.8)',
            color: '#fff'
          }}
        >
          <option value="all">Tất cả khoảng cách</option>
          <option value="near">Gần (&lt; 50 năm ánh sáng)</option>
          <option value="medium">Trung bình (50-500)</option>
          <option value="far">Xa (&gt; 500)</option>
        </select>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filteredPlanets.map(planet => (
          <div key={planet.id} style={{ 
            padding: '20px', 
            background: 'rgba(30, 30, 60, 0.8)', 
            borderRadius: '12px',
            border: '1px solid rgba(100, 150, 255, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: getTypeColor(planet.type),
                marginRight: '12px'
              }} />
              <div>
                <div style={{ fontWeight: '600', fontSize: '16px' }}>{planet.name}</div>
                <div style={{ fontSize: '12px', color: '#aaa' }}>{planet.year}</div>
              </div>
            </div>
            <div style={{ fontSize: '13px', color: '#ccc', marginBottom: '12px', lineHeight: '1.5' }}>
              {planet.description}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
              <div>
                <span style={{ color: '#aaa' }}>Khoảng cách:</span>
                <div style={{ color: '#fff' }}>{planet.distance} năm ánh sáng</div>
              </div>
              <div>
                <span style={{ color: '#aaa' }}>Kích thước:</span>
                <div style={{ color: '#fff' }}>{planet.size}x Trái Đất</div>
              </div>
              <div>
                <span style={{ color: '#aaa' }}>Nhiệt độ:</span>
                <div style={{ color: '#fff' }}>{planet.temperature}°C</div>
              </div>
              <div>
                <span style={{ color: '#aaa' }}>Loại:</span>
                <div style={{ color: getTypeColor(planet.type) }}>{getTypeLabel(planet.type)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
