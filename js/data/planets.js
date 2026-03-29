const PLANET_DATA = {
    sun: {
        name: { vi: "Mặt Trời", en: "Sun" },
        type: "star",
        diameter: 1392700,
        temperature: 5500,
        distanceFromSun: 0,
        orbitalPeriod: 0,
        moons: 0,
        color: 0xffdd00,
        emissive: 0xffaa00,
        size: 4,
        distance: 0,
        speed: 0,
        features: ["Ngôi sao trung tâm hệ mặt trời", "Chiếm 99.86% khối lượng hệ mặt trời"],
        description: { 
            vi: "Mặt Trời là ngôi sao trung tâm của hệ mặt trời, chiếm khoảng 99.86% tổng khối lượng của hệ. Năng lượng từ Mặt Trời duy trì sự sống trên Trái Đất.",
            en: "The Sun is the star at the center of the Solar System. It contains 99.86% of the total mass of the Solar System."
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
        features: ["Hành tinh nhỏ nhất hệ mặt trời", "Không có khí quyển"],
        description: { 
            vi: "Sao Thủy là hành tinh nhỏ nhất và gần Mặt Trời nhất. Nó có bề mặt giống Mặt Trăng với nhiều hố va chạm.",
            en: "Mercury is the smallest planet in the Solar System and the closest to the Sun."
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
        features: ["Nóng nhất trong các hành tinh", "Quay ngược hướng"],
        description: { 
            vi: "Sao Kim là hành tinh nóng nhất trong hệ mặt trời do hiệu ứng nhà kính. Nó quay ngược so với các hành tinh khác.",
            en: "Venus is the hottest planet in the Solar System due to greenhouse effect."
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
        features: ["Hành tinh duy nhất có sự sống", "71% bề mặt là nước"],
        description: { 
            vi: "Trái Đất là hành tinh thứ ba từ Mặt Trời và là hành tinh duy nhất được biết là có sự sống.",
            en: "Earth is the third planet from the Sun and the only astronomical object known to harbor life."
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
        features: ["Hành tinh đỏ", "Có nước đóng băng"],
        description: { 
            vi: "Sao Hỏa được gọi là hành tinh đỏ do oxit sắt trên bề mặt. Nó có núi lửa cao nhất hệ mặt trời.",
            en: "Mars is known as the Red Planet due to iron oxide on its surface."
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
        features: ["Lớn nhất trong các hành tinh", "Có vệ tinh Europa"],
        description: { 
            vi: "Sao Mộc là hành tinh lớn nhất trong hệ mặt trời. Nó có cơn bão lớn Đỏ đã tồn tại hàng trăm năm.",
            en: "Jupiter is the largest planet in the Solar System with a Great Red Spot storm."
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
        hasRings: true,
        features: ["Có hệ vành đai đẹp nhất", "Nhiều vệ tinh nhất"],
        description: { 
            vi: "Sao Thổ nổi tiếng với hệ vành đai tuyệt đẹp được tạo từ băng và đá.",
            en: "Saturn is famous for its beautiful ring system made of ice and rock."
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
        features: ["Quay nghiêng 98 độ", "Khí quyển màu xanh lục"],
        description: { 
            vi: "Sao Thiên Vương là hành tinh duy nhất quay nghiêng trên quỹ đạo. Nó có màu xanh lục do khí metan.",
            en: "Uranus is the only planet that rotates on its side, with a blue-green color from methane."
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
        features: ["Gió mạnh nhất hệ mặt trời", "Hành tinh xa nhất"],
        description: { 
            vi: "Sao Hải Vương là hành tinh xa nhất từ Mặt Trời. Nó có những cơn gió mạnh nhất trong hệ mặt trời.",
            en: "Neptune is the farthest planet from the Sun with the strongest winds in the Solar System."
        }
    }
};
