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

const CROSS_SECTION_DATA: Record<string, PlanetLayer[]> = {
  mercury: [
    { name: "Vỏ ngoài", color: "#B5B5B5", percentage: 20, thickness: "500-600 km", desc: "Bề mặt gồ ghề với nhiều hố va chạm" },
    { name: "Mantel", color: "#9E9E9E", percentage: 42, thickness: "~1.300 km", desc: "Đá silicate dày đặc" },
    { name: "Lõi sắt", color: "#FF8C00", percentage: 38, thickness: "Radii ~2.000 km", desc: "Lõi sắt-niken lớn, có thể lỏng một phần" }
  ],
  venus: [
    { name: "Vỏ ngoài", color: "#D4A574", percentage: 15, thickness: "~50 km", desc: "Đá bazan và granit tương tự Trái Đất" },
    { name: "Mantel", color: "#B8966C", percentage: 40, thickness: "~2.900 km", desc: "Nóng chảy một phần, gây núi lửa hoạt động" },
    { name: "Lõi sắt", color: "#FF7F00", percentage: 45, thickness: "~3.000 km", desc: "Lõi sắt-niken, có thể chưa đông đặc hoàn toàn" }
  ],
  earth: [
    { name: "Vỏ ngoài", color: "#4A90D9", percentage: 10, thickness: "5-70 km", desc: "Thạch quyển mỏng, nơi tồn tại sự sống và đại dương" },
    { name: "Mantel", color: "#8B4513", percentage: 45, thickness: "~2.900 km", desc: "Đá nóng chảy chậm (asthenosphere), đối lưu tạo mảng kiến tạo" },
    { name: "Lõi ngoài", color: "#FF6347", percentage: 28, thickness: "~2.200 km", desc: "Sắt-niken lỏng, tạo từ trường Trái Đất" },
    { name: "Lõi trong", color: "#FFD700", percentage: 17, thickness: "Radii ~1.220 km", desc: "Chất rắn do áp suất cực cao, nhiệt độ ~5.700°C" }
  ],
  mars: [
    { name: "Vỏ ngoài", color: "#D94A3A", percentage: 12, thickness: "~50-72 km", desc: "Đá bazan đỏ với oxit sắt" },
    { name: "Mantel", color: "#8B2500", percentage: 43, thickness: "~1.500 km", desc: "Đá silicate, có thể có nước đóng băng sâu bên trong" },
    { name: "Lõi sắt", color: "#CD853F", percentage: 45, thickness: "Radii ~1.700-1.800 km", desc: "Sắt-niken với lưu huỳnh, có thể lỏng một phần" }
  ],
  jupiter: [
    { name: "Khí quyển", color: "#D9A86A", percentage: 20, thickness: "~1.000 km", desc: "Hydrogen & helium với các dải mây màu" },
    { name: "Mantel Hydro kim loại", color: "#B8860B", percentage: 50, thickness: "~40.000-50.000 km", desc: "Hydrogen ở áp suất cực cao, dẫn điện tạo từ trường mạnh" },
    { name: "Lõi đá/băng", color: "#8B4513", percentage: 30, thickness: "Radii ~15.000-25.000 km", desc: "Hỗn hợp đá, kim loại và băng, nặng gấp Trái Đất" }
  ],
  saturn: [
    { name: "Khí quyển", color: "#E6D98A", percentage: 20, thickness: "~1.000 km", desc: "Hydrogen & helium với các dải mây vàng nhạt" },
    { name: "Mantel Hydro kim loại", color: "#DAA520", percentage: 50, thickness: "~38.000-47.000 km", desc: "Hydrogen lỏng dẫn điện tạo từ trường mạnh" },
    { name: "Lõi đá/băng", color: "#8B4513", percentage: 30, thickness: "Radii ~16.000-24.000 km", desc: "Hỗn hợp đá, băng và kim loại" }
  ],
  uranus: [
    { name: "Khí quyển", color: "#8AD9D9", percentage: 20, thickness: "~500 km", desc: "Hydrogen, helium và methane tạo màu xanh lục" },
    { name: "Mantel băng", color: "#5F9EA0", percentage: 55, thickness: "~8.000-10.000 km", desc: "Nước, ammonia và methane ở trạng thái siêu tới hạn (ice giant)" },
    { name: "Lõi đá", color: "#4682B4", percentage: 25, thickness: "Radii ~7.000-10.000 km", desc: "Đá và băng silicate" }
  ],
  neptune: [
    { name: "Khí quyển", color: "#4A6AD9", percentage: 20, thickness: "~500 km", desc: "Hydrogen, helium và methane tạo màu xanh đậm" },
    { name: "Mantel băng", color: "#4169E1", percentage: 55, thickness: "~8.000-10.000 km", desc: "Nước, ammonia và methane siêu tới hạn, gió mạnh nhất hệ mặt trời" },
    { name: "Lõi đá", color: "#1E90FF", percentage: 25, thickness: "Radii ~7.000-10.000 km", desc: "Đá và băng silicate" }
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
            {layers.map((layer, index) => (
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
                    {layer.thickness && `Độ dày: ${layer.thickness} • `}
                    {layer.percentage}% tổng đường kính
                  </div>
                  {layer.desc && (
                    <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>
                      {layer.desc}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
