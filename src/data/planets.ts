import { PlanetData } from '@/types';

export const PLANET_DATA: Record<string, PlanetData> = {
  sun: {
    name: { vi: "Mặt Trời", en: "Sun" },
    type: "star",
    diameter: 1392700,
    temperature: 5500,
    distanceFromSun: 0,
    orbitalPeriod: 0,
    moons: 0,
    color: 0xffdd00,
    size: 4,
    distance: 0,
    speed: 0,
    features: ["Ngôi sao trung tâm hệ mặt trời", "Chiếm 99.86% khối lượng hệ mặt trời"],
    description: { 
      vi: "Mặt Trời là ngôi sao trung tâm của hệ mặt trời, chiếm khoảng 99.86% tổng khối lượng của hệ.",
      en: "The Sun is the star at the center of the Solar System."
    }
  },
  mercury: {
    name: { vi: "Sao Thủy", en: "Mercury" },
    type: "rocky",
    diameter: 4879,
    temperature: 167,
    distanceFromSun: 57.9,
    orbitalPeriod: 88,
    moons: 0,
    color: 0xb5b5b5,
    size: 0.8,
    distance: 10,
    speed: 0.02,
    hasWater: false,
    features: ["Hành tinh nhỏ nhất", "Không có khí quyển", "Biên độ nhiệt lớn (-173°C đến 427°C)"],
    description: { 
      vi: "Sao Thủy là hành tinh nhỏ nhất và gần Mặt Trời nhất.",
      en: "Mercury is the smallest planet in the Solar System."
    }
  },
  venus: {
    name: { vi: "Sao Kim", en: "Venus" },
    type: "rocky",
    diameter: 12104,
    temperature: 464,
    distanceFromSun: 108.2,
    orbitalPeriod: 225,
    moons: 0,
    color: 0xe6c87a,
    size: 1.2,
    distance: 15,
    speed: 0.015,
    hasWater: false,
    features: ["Nóng nhất (464°C)", "Quay ngược (đông sang tây)", "Khí quyển dày CO₂"],
    description: { 
      vi: "Sao Kim là hành tinh nóng nhất trong hệ mặt trời.",
      en: "Venus is the hottest planet in the Solar System."
    }
  },
  earth: {
    name: { vi: "Trái Đất", en: "Earth" },
    type: "rocky",
    diameter: 12742,
    temperature: 15,
    distanceFromSun: 149.6,
    orbitalPeriod: 365.25,
    moons: 1,
    color: 0x4a90d9,
    size: 1.3,
    distance: 20,
    speed: 0.01,
    hasWater: true,
    features: ["Hành tinh duy nhất có sự sống", "71% bề mặt là nước lỏng", "Khí quyển giàu Nitrogen & Oxygen"],
    description: { 
      vi: "Trái Đất là hành tinh thứ ba từ Mặt Trời và là hành tinh duy nhất có sự sống.",
      en: "Earth is the third planet from the Sun and the only planet with life."
    }
  },
  mars: {
    name: { vi: "Sao Hỏa", en: "Mars" },
    type: "rocky",
    diameter: 6779,
    temperature: -65,
    distanceFromSun: 227.9,
    orbitalPeriod: 687,
    moons: 2,
    color: 0xd94a3a,
    size: 0.9,
    distance: 25,
    speed: 0.008,
    hasWater: true,
    features: ["Hành tinh đỏ (oxit sắt)", "Có nước đóng băng ở hai cực", "Núi Olympus cao nhất (21km)"],
    description: { 
      vi: "Sao Hỏa được gọi là hành tinh đỏ do oxit sắt trên bề mặt.",
      en: "Mars is known as the Red Planet."
    }
  },
  jupiter: {
    name: { vi: "Sao Mộc", en: "Jupiter" },
    type: "gas_giant",
    diameter: 139820,
    temperature: -110,
    distanceFromSun: 778.5,
    orbitalPeriod: 4333,
    moons: 95,
    color: 0xd9a86a,
    size: 3.5,
    distance: 35,
    speed: 0.004,
    hasWater: false,
    features: ["Lớn nhất (11 lần đường kính Trái Đất)", "Cơn bão Đỏ tồn tại 350+ năm", "Ít nhất 95 vệ tinh"],
    description: { 
      vi: "Sao Mộc là hành tinh lớn nhất trong hệ mặt trời.",
      en: "Jupiter is the largest planet in the Solar System."
    }
  },
  saturn: {
    name: { vi: "Sao Thổ", en: "Saturn" },
    type: "gas_giant",
    diameter: 116460,
    temperature: -140,
    distanceFromSun: 1432,
    orbitalPeriod: 10759,
    moons: 146,
    color: 0xe6d98a,
    size: 3.0,
    distance: 45,
    speed: 0.003,
    hasWater: false,
    hasRings: true,
    features: ["Vành đai đẹp và phức tạp nhất", "Nhiều vệ tinh nhất (146)", "Mật độ thấp hơn nước"],
    description: { 
      vi: "Sao Thổ nổi tiếng với hệ vành đai tuyệt đẹp.",
      en: "Saturn is famous for its beautiful ring system."
    }
  },
  uranus: {
    name: { vi: "Sao Thiên Vương", en: "Uranus" },
    type: "ice_giant",
    diameter: 50724,
    temperature: -195,
    distanceFromSun: 2867,
    orbitalPeriod: 30687,
    moons: 28,
    color: 0x8ad9d9,
    size: 2.0,
    distance: 55,
    speed: 0.002,
    hasWater: false,
    features: ["Quay nghiêng 98 độ (nằm ngang)", "Màu xanh lục do methane", "Ít vệ tinh nhất trong khí khổng lồ"],
    description: { 
      vi: "Sao Thiên Vương là hành tinh duy nhất quay nghiêng.",
      en: "Uranus is the only planet that rotates on its side."
    }
  },
  neptune: {
    name: { vi: "Sao Hải Vương", en: "Neptune" },
    type: "ice_giant",
    diameter: 49244,
    temperature: -200,
    distanceFromSun: 4515,
    orbitalPeriod: 60190,
    moons: 16,
    color: 0x4a6ad9,
    size: 1.9,
    distance: 65,
    speed: 0.001,
    hasWater: false,
    features: ["Gió mạnh nhất (2.100 km/h)", "Hành tinh xa nhất", "Được phát hiện bằng toán học"],
    description: { 
      vi: "Sao Hải Vương là hành tinh xa nhất từ Mặt Trời.",
      en: "Neptune is the farthest planet from the Sun."
    }
  },
  moon: {
    name: { vi: "Mặt Trăng", en: "Moon" },
    type: "satellite",
    diameter: 3474,
    temperature: -173,
    distanceFromSun: 149.6,
    orbitalPeriod: 27.3,
    moons: 0,
    color: 0xcccccc,
    size: 0.3,
    distance: 20,
    speed: 0,
    hasWater: true,
    features: ["Vệ tinh tự nhiên duy nhất của Trái Đất", "Lớn thứ 5 trong hệ mặt trời", "Người duy nhất đặt chân"],
    description: { 
      vi: "Mặt Trăng là vệ tinh tự nhiên duy nhất của Trái Đất và là vệ tinh lớn thứ 5 trong hệ mặt trời.",
      en: "The Moon is Earth's only natural satellite and the fifth largest moon in the Solar System."
    }
  }
};
