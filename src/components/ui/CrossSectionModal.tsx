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
  thickness?: string;
  desc?: string;
}

// Helper to lighten/darken colors based on planet base color
function getLayerColors(baseColorHex: number, isGasOrIceGiant: boolean, has4Layers: boolean): string[] {
  // Convert hex to RGB
  const r = (baseColorHex >> 16) & 0xff;
  const g = (baseColorHex >> 8) & 0xff;
  const b = baseColorHex & 0xff;
  
  if (has4Layers) {
    // Earth: crust → mantle → outer core → inner core
    // Lightest to darkest
    return [
      `rgb(${Math.min(255, r + 40)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 40)})`, // crust - lightest
      `rgb(${r}, ${g}, ${b})`, // mantle - base
      `rgb(${Math.max(0, r - 30)}, ${Math.max(0, g - 30)}, ${Math.max(0, b - 30)})`, // outer core - darker
      `rgb(${Math.max(0, r - 60)}, ${Math.max(0, g - 60)}, ${Math.max(0, b - 60)})`  // inner core - darkest
    ];
  }
  
  if (isGasOrIceGiant) {
    // Atmosphere → Mantle → Core (light → dark)
    return [
      `rgb(${Math.min(255, r + 50)}, ${Math.min(255, g + 50)}, ${Math.min(255, b + 50)})`, // atmosphere - lightest
      `rgb(${r}, ${g}, ${b})`, // mantle - base
      `rgb(${Math.max(0, r - 50)}, ${Math.max(0, g - 50)}, ${Math.max(0, b - 50)})`  // core - darkest
    ];
  }
  
  // Rocky: crust → mantle → core
  return [
    `rgb(${Math.min(255, r + 30)}, ${Math.min(255, g + 30)}, ${Math.min(255, b + 30)})`, // crust - lightest
    `rgb(${r}, ${g}, ${b})`, // mantle - base
    `rgb(${Math.max(0, r - 40)}, ${Math.max(0, g - 40)}, ${Math.max(0, b - 40)})`  // core - darkest
  ];
}

// NASA-based cumulative radius percentages
// Outer layer = 100%, inner layers progressively smaller
const CROSS_SECTION_DATA: Record<string, PlanetLayer[]> = {
  mercury: (() => {
    const colors = getLayerColors(0xb5b5b5, false, false);
    return [
      { name: "Vỏ ngoài", color: colors[0], percentage: 100, thickness: "~50 km", desc: "Bề mặt gồ ghề với nhiều hố va chạm" },
      { name: "Mantel", color: colors[1], percentage: 55, thickness: "~1.300 km", desc: "Đá silicate dày đặc" },
      { name: "Lõi sắt", color: colors[2], percentage: 20, thickness: "Radii ~2.000 km", desc: "Lõi sắt-niken lớn, có thể lỏng một phần" }
    ];
  })(),
  venus: (() => {
    const colors = getLayerColors(0xe6c87a, false, false);
    return [
      { name: "Vỏ ngoài", color: colors[0], percentage: 100, thickness: "~50 km", desc: "Đá bazan và granit tương tự Trái Đất" },
      { name: "Mantel", color: colors[1], percentage: 55, thickness: "~2.900 km", desc: "Nóng chảy một phần, gây núi lửa hoạt động" },
      { name: "Lõi sắt", color: colors[2], percentage: 25, thickness: "~3.000 km", desc: "Lõi sắt-niken, có thể chưa đông đặc hoàn toàn" }
    ];
  })(),
  earth: (() => {
    const colors = getLayerColors(0x4a90d9, false, true);
    return [
      { name: "Vỏ ngoài", color: colors[0], percentage: 100, thickness: "5-70 km", desc: "Thạch quyển mỏng, nơi tồn tại sự sống và đại dương" },
      { name: "Mantel", color: colors[1], percentage: 55, thickness: "~2.900 km", desc: "Đá nóng chảy chậm (asthenosphere), đối lưu tạo mảng kiến tạo" },
      { name: "Lõi ngoài", color: colors[2], percentage: 28, thickness: "~2.200 km", desc: "Sắt-niken lỏng, tạo từ trường Trái Đất" },
      { name: "Lõi trong", color: colors[3], percentage: 12, thickness: "Radii ~1.220 km", desc: "Chất rắn do áp suất cực cao, nhiệt độ ~5.700°C" }
    ];
  })(),
  mars: (() => {
    const colors = getLayerColors(0xd94a3a, false, false);
    return [
      { name: "Vỏ ngoài", color: colors[0], percentage: 100, thickness: "~50-72 km", desc: "Đá bazan đỏ với oxit sắt" },
      { name: "Mantel", color: colors[1], percentage: 55, thickness: "~1.500 km", desc: "Đá silicate, có thể có nước đóng băng sâu bên trong" },
      { name: "Lõi sắt", color: colors[2], percentage: 25, thickness: "Radii ~1.700-1.800 km", desc: "Sắt-niken với lưu huỳnh, có thể lỏng một phần" }
    ];
  })(),
  jupiter: (() => {
    const colors = getLayerColors(0xd9a86a, true, false);
    return [
      { name: "Khí quyển", color: colors[0], percentage: 100, thickness: "~1.000 km", desc: "Hydrogen & helium với các dải mây màu nhạt" },
      { name: "Mantel Hydro kim loại", color: colors[1], percentage: 72, thickness: "~40.000-50.000 km", desc: "Hydrogen ở áp suất cực cao, dẫn điện tạo từ trường mạnh" },
      { name: "Lõi đá/băng", color: colors[2], percentage: 10, thickness: "Radii ~15.000-25.000 km", desc: "Hỗn hợp đá, kim loại và băng, nặng gấp Trái Đất" }
    ];
  })(),
  saturn: (() => {
    const colors = getLayerColors(0xe6d98a, true, false);
    return [
      { name: "Khí quyển", color: colors[0], percentage: 100, thickness: "~1.000 km", desc: "Hydrogen & helium với các dải mây vàng nhạt" },
      { name: "Mantel Hydro kim loại", color: colors[1], percentage: 72, thickness: "~38.000-47.000 km", desc: "Hydrogen lỏng dẫn điện tạo từ trường mạnh" },
      { name: "Lõi đá/băng", color: colors[2], percentage: 10, thickness: "Radii ~16.000-24.000 km", desc: "Hỗn hợp đá, băng và kim loại" }
    ];
  })(),
  uranus: (() => {
    const colors = getLayerColors(0x8ad9d9, true, false);
    return [
      { name: "Khí quyển", color: colors[0], percentage: 100, thickness: "~500 km", desc: "Hydrogen, helium và methane tạo màu xanh lục nhạt" },
      { name: "Mantel băng", color: colors[1], percentage: 64, thickness: "~8.000-10.000 km", desc: "Nước, ammonia và methane ở trạng thái siêu tới hạn (ice giant)" },
      { name: "Lõi đá", color: colors[2], percentage: 16, thickness: "Radii ~7.000-10.000 km", desc: "Đá và băng silicate" }
    ];
  })(),
  neptune: (() => {
    const colors = getLayerColors(0x4a6ad9, true, false);
    return [
      { name: "Khí quyển", color: colors[0], percentage: 100, thickness: "~500 km", desc: "Hydrogen, helium và methane tạo màu xanh đậm" },
      { name: "Mantel băng", color: colors[1], percentage: 64, thickness: "~8.000-10.000 km", desc: "Nước, ammonia và methane siêu tới hạn, gió mạnh nhất hệ mặt trời" },
      { name: "Lõi đá", color: colors[2], percentage: 16, thickness: "Radii ~7.000-10.000 km", desc: "Đá và băng silicate" }
    ];
  })()
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

  return (
    <div className="modal-overlay visible" onClick={onClose}>
      <div className="modal glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Mặt cắt - {planetData.name.vi}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div style={{ padding: '20px', display: 'flex', gap: '40px', alignItems: 'center' }}>
          {/* Cross-section circles */}
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
                    boxShadow: `inset 0 0 20px rgba(0,0,0,0.3)`,
                    zIndex: index
                  }}
                />
              );
            })}
          </div>
          {/* Layer list - showing outer to inner order */}
          <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: '20px' }}>Cấu trúc bên trong</h3>
            {layers.map((layer, index) => {
              // Calculate actual thickness for display
              const innerRadius = index < layers.length - 1 
                ? 100 * Math.sqrt(layers[index + 1].percentage / 100) 
                : 0;
              const outerRadius = 100 * Math.sqrt(layer.percentage / 100);
              const thicknessPercent = Math.round(outerRadius - innerRadius);
              
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
                      {layer.thickness && `${layer.thickness} • `}
                      {layer.percentage}% bán kính
                      {index < layers.length - 1 && ` (dày ${thicknessPercent}%)`}
                    </div>
                    {layer.desc && (
                      <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>
                        {layer.desc}
                      </div>
                    )}
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