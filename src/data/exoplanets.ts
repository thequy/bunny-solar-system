export interface Exoplanet {
  id: string;
  name: string;
  distance: number;
  size: number;
  temperature: number;
  type: 'rocky' | 'gas' | 'ice' | 'super-earth';
  year: number;
  description: string;
}

export const EXOPLANET_DATA: Exoplanet[] = [
  { id: "kepler-186f", name: "Kepler-186f", distance: 582, size: 1.17, temperature: -85, type: "rocky", year: 2014, description: "Hành tinh đá ngoài hệ mặt trời đầu tiên được tìm thấy trong vùng có thể sống được" },
  { id: "proxima-centauri-b", name: "Proxima Centauri b", distance: 4.24, size: 1.3, temperature: -39, type: "rocky", year: 2016, description: "Hành tinh gần Trái Đất nhất ngoài hệ mặt trời" },
  { id: "trappist-1e", name: "TRAPPIST-1e", distance: 39, size: 0.92, temperature: -22, type: "rocky", year: 2017, description: "Một trong 7 hành tinh trong hệ TRAPPIST-1" },
  { id: "kepler-452b", name: "Kepler-452b", distance: 1400, size: 1.6, temperature: -20, type: "super-earth", year: 2015, description: "Sup-Earth quay quanh ngôi sao giống Mặt Trời" },
  { id: "gliese-667c", name: "Gliese 667C c", distance: 23.6, size: 2.5, temperature: -28, type: "super-earth", year: 2011, description: "Nằm trong vùng có thể sống được của ngôi sao lạnh" },
  { id: "hd-40307g", name: "HD 40307 g", distance: 42, size: 7.2, temperature: 9, type: "super-earth", year: 2012, description: "Super-Earth có khối lượng lớn gấp 7 lần Trái Đất" },
  { id: "kepler-22b", name: "Kepler-22b", distance: 600, size: 2.4, temperature: -11, type: "super-earth", year: 2011, description: "Hành tinh đầu tiên được xác nhận trong vùng có thể sống" },
  { id: "55-cancri-f", name: "55 Cancri f", distance: 41, size: 2.3, temperature: 67, type: "gas", year: 2008, description: "Khí khổng lồ nóng trong hệ 55 Cancri" },
  { id: "wasp-12b", name: "WASP-12b", distance: 870, size: 1.9, temperature: 2500, type: "gas", year: 2008, description: "Bị nuốt chửng bởi ngôi sao chủ" },
  { id: "kepler-16b", name: "Kepler-16b", distance: 200, size: 0.73, temperature: -85, type: "gas", year: 2011, description: "Hành tinh quay quanh 2 ngôi sao" },
  { id: "kepler-7b", name: "Kepler-7b", distance: 1000, size: 1.5, temperature: 1540, type: "gas", year: 2010, description: "Khí khổng lồ với mật độ thấp" },
  { id: "hd-189733b", name: "HD 189733b", distance: 63, size: 1.13, temperature: 900, type: "gas", year: 2005, description: "Hành tinh nóng với mưa thủy tinh" },
  { id: "gj-1214b", name: "GJ 1214b", distance: 40, size: 2.7, temperature: 393, type: "ice", year: 2009, description: "Băng khổng lồ nước" },
  { id: "kepler-62f", name: "Kepler-62f", distance: 1200, size: 1.4, temperature: -65, type: "rocky", year: 2013, description: "Hành tinh đá trong vùng có thể sống" },
  { id: "kepler-283c", name: "Kepler-283c", distance: 1740, size: 1.8, temperature: -10, type: "rocky", year: 2014, description: "Hành tinh đá gần ngôi sao đỏ" },
  { id: "kepler-296f", name: "Kepler-296f", distance: 850, size: 1.5, temperature: -45, type: "rocky", year: 2014, description: "Hành tinh đá trong hệ sao đôi" },
  { id: "kepler-438b", name: "Kepler-438b", distance: 640, size: 1.12, temperature: -10, type: "rocky", year: 2015, description: "Hành tinh đá có kích thước gần Trái Đất" },
  { id: "kepler-442b", name: "Kepler-442b", distance: 1290, size: 1.33, temperature: -40, type: "rocky", year: 2015, description: "Hành tinh đá trong vùng có thể sống" },
  { id: "kepler-440b", name: "Kepler-440b", distance: 1016, size: 1.86, temperature: 14, type: "super-earth", year: 2015, description: "Super-Earth trong vùng có thể sống" },
  { id: "kepler-155b", name: "Kepler-155b", distance: 2100, size: 2.1, temperature: -35, type: "rocky", year: 2015, description: "Hành tinh đá ngoài hệ mặt trời" },
  { id: "kepler-61b", name: "Kepler-61b", distance: 1100, size: 2.2, temperature: 50, type: "super-earth", year: 2013, description: "Hành tinh ở rìa vùng có thể sống" },
  { id: "kepler-298d", name: "Kepler-298d", distance: 1480, size: 2.4, temperature: -35, type: "rocky", year: 2015, description: "Hành tinh đá trong vùng có thể sống" },
  { id: "kepler-163b", name: "Kepler-163b", distance: 2600, size: 2.4, temperature: 250, type: "super-earth", year: 2016, description: "Super-Earth nóng" },
  { id: "kepler-154b", name: "Kepler-154b", distance: 1180, size: 2.3, temperature: 75, type: "super-earth", year: 2016, description: "Super-Earth trong vùng có thể sống" },
  { id: "kepler-87b", name: "Kepler-87b", distance: 3700, size: 1.2, temperature: 80, type: "gas", year: 2013, description: "Khí khổng lồ trong hệ sao đôi" },
  { id: "kepler-90h", name: "Kepler-90h", distance: 2540, size: 1.01, temperature: -5, type: "gas", year: 2013, description: "Khí khổng lồ ngoài cùng trong hệ 8 hành tinh" },
  { id: "hd-10180g", name: "HD 10180 g", distance: 27, size: 1.3, temperature: 24, type: "super-earth", year: 2010, description: "Super-Earth trong vùng có thể sống" },
  { id: "hd-156668b", name: "HD 156668 b", distance: 80, size: 4.5, temperature: 75, type: "super-earth", year: 2011, description: "Super-Earth gần vùng có thể sống" },
  { id: "gliese-581d", name: "Gliese 581 d", distance: 20.3, size: 3.1, temperature: -34, type: "rocky", year: 2007, description: "Hành tinh đá trong vùng có thể sống" },
  { id: "gliese-581c", name: "Gliese 581 c", distance: 20.3, size: 1.9, temperature: 10, type: "rocky", year: 2007, description: "Hành tinh đá nóng đầu tiên được phát hiện" }
];
