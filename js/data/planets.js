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
        },
        layers: [
            { name: { vi: "Lõi trong", en: "Inner Core" }, color: 0xffaa55, radiusPercent: 20 },
            { name: { vi: "Lõi ngoài", en: "Outer Core" }, color: 0xff8833, radiusPercent: 40 },
            { name: { vi: "Lớp phủ", en: "Mantle" }, color: 0xcc6622, radiusPercent: 75 },
            { name: { vi: "Vỏ", en: "Crust" }, color: 0x994411, radiusPercent: 100 }
        ]
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
        },
        layers: [
            { name: { vi: "Lõi", en: "Core" }, color: 0xffaa55, radiusPercent: 30 },
            { name: { vi: "Lớp phủ", en: "Mantle" }, color: 0xcc6622, radiusPercent: 70 },
            { name: { vi: "Vỏ", en: "Crust" }, color: 0x994411, radiusPercent: 100 }
        ]
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
        },
        layers: [
            { name: { vi: "Lõi trong", en: "Inner Core" }, color: 0xffaa55, radiusPercent: 20 },
            { name: { vi: "Lõi ngoài", en: "Outer Core" }, color: 0xff8833, radiusPercent: 40 },
            { name: { vi: "Lớp phủ dưới", en: "Lower Mantle" }, color: 0xcc6622, radiusPercent: 75 },
            { name: { vi: "Lớp phủ trên", en: "Upper Mantle" }, color: 0xaa4411, radiusPercent: 90 },
            { name: { vi: "Vỏ", en: "Crust" }, color: 0x882200, radiusPercent: 100 }
        ]
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
        },
        layers: [
            { name: { vi: "Lõi", en: "Core" }, color: 0xffaa55, radiusPercent: 35 },
            { name: { vi: "Lớp phủ", en: "Mantle" }, color: 0xcc6622, radiusPercent: 80 },
            { name: { vi: "Vỏ", en: "Crust" }, color: 0x994411, radiusPercent: 100 }
        ]
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
        },
        layers: [
            { name: { vi: "Lõi đá", en: "Rocky Core" }, color: 0xffaa55, radiusPercent: 20 },
            { name: { vi: "Lớp hydro kim loại", en: "Metallic Hydrogen" }, color: 0xcc6622, radiusPercent: 50 },
            { name: { vi: "Lớp hydro lỏng", en: "Liquid Hydrogen" }, color: 0xaa4411, radiusPercent: 80 },
            { name: { vi: "Khí quyển", en: "Atmosphere" }, color: 0x882200, radiusPercent: 100 }
        ]
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
        },
        layers: [
            { name: { vi: "Lõi", en: "Core" }, color: 0xffaa55, radiusPercent: 20 },
            { name: { vi: "Hydro kim loại", en: "Metallic Hydrogen" }, color: 0xcc6622, radiusPercent: 45 },
            { name: { vi: "Hydro lỏng", en: "Liquid Hydrogen" }, color: 0xaa4411, radiusPercent: 75 },
            { name: { vi: "Khí quyển", en: "Atmosphere" }, color: 0x882200, radiusPercent: 100 }
        ]
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
        },
        layers: [
            { name: { vi: "Lõi đá", en: "Rocky Core" }, color: 0xffaa55, radiusPercent: 25 },
            { name: { vi: "Lớp băng", en: "Ice Mantle" }, color: 0x66aacc, radiusPercent: 60 },
            { name: { vi: "Khí quyển", en: "Atmosphere" }, color: 0x4488aa, radiusPercent: 100 }
        ]
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
        },
        layers: [
            { name: { vi: "Lõi đá", en: "Rocky Core" }, color: 0xffaa55, radiusPercent: 25 },
            { name: { vi: "Lớp băng", en: "Ice Mantle" }, color: 0x66aacc, radiusPercent: 60 },
            { name: { vi: "Khí quyển", en: "Atmosphere" }, color: 0x4488aa, radiusPercent: 100 }
        ]
    }
};

// Exoplanet data (~30 simulated exoplanets)
const EXOPLANET_DATA = [
    { id: 'kepler-452b', name: { vi: "Kepler-452b", en: "Kepler-452b" }, type: 'super_earth', diameter: 16090, distanceFromSun: 1402, orbitalPeriod: 385, moons: 0, color: 0x4a90d9, size: 1.5, features: ["Vùng ở được", "Siêu Trái Đất"] },
    { id: 'trappist-1e', name: { vi: "TRAPPIST-1e", en: "TRAPPIST-1e" }, type: 'super_earth', diameter: 12400, distanceFromSun: 39, orbitalPeriod: 6.1, moons: 0, color: 0xd9a86a, size: 1.2, features: ["Hệ TRAPPIST-1", "Có thể có nước"] },
    { id: 'proxima-b', name: { vi: "Proxima Centauri b", en: "Proxima Centauri b" }, type: 'super_earth', diameter: 15000, distanceFromSun: 4.2, orbitalPeriod: 11.2, moons: 0, color: 0x8ad9d9, size: 1.4, features: ["Gần nhất", "Vùng ở được"] },
    { id: 'hd-40307g', name: { vi: "HD 40307 g", en: "HD 40307 g" }, type: 'super_earth', diameter: 16500, distanceFromSun: 42, orbitalPeriod: 198, moons: 0, color: 0x4a6ad9, size: 1.5, features: ["Vùng ở được"] },
    { id: 'kepler-186f', name: { vi: "Kepler-186f", en: "Kepler-186f" }, type: 'super_earth', diameter: 13000, distanceFromSun: 500, orbitalPeriod: 130, moons: 0, color: 0x4a90d9, size: 1.3, features: ["Vùng ở được", "Sao đỏ"] },
    { id: 'gliese-667c', name: { vi: "Gliese 667 Cc", en: "Gliese 667 Cc" }, type: 'super_earth', diameter: 14500, distanceFromSun: 23.6, orbitalPeriod: 28, moons: 0, color: 0xd9a86a, size: 1.4, features: ["Hệ ba sao"] },
    { id: 'kepler-22b', name: { vi: "Kepler-22b", en: "Kepler-22b" }, type: 'super_earth', diameter: 24800, distanceFromSun: 600, orbitalPeriod: 290, moons: 0, color: 0x8ad9d9, size: 1.9, features: ["Vùng ở được"] },
    { id: 'gJ-1214b', name: { vi: "GJ 1214 b", en: "GJ 1214 b" }, type: 'mini_neptune', diameter: 17000, distanceFromSun: 48, orbitalPeriod: 38, moons: 0, color: 0x6a8aba, size: 1.5, features: ["Đại dương nước"] },
    { id: 'hd-209458b', name: { vi: "HD 209458 b", en: "HD 209458 b" }, type: 'hot_jupiter', diameter: 140000, distanceFromSun: 150, orbitalPeriod: 3.5, moons: 0, color: 0xd9a86a, size: 3.8, features: ["Sao Mộc nóng", "Bốc hơi"] },
    { id: 'wasp-12b', name: { vi: "WASP-12 b", en: "WASP-12 b" }, type: 'hot_jupiter', diameter: 160000, distanceFromSun: 870, orbitalPeriod: 1.1, moons: 0, color: 0xffaa55, size: 4.2, features: ["Sao Mộc nóng", "Bị xé rách"] },
    { id: '55-cancri-e', name: { vi: "55 Cancri e", en: "55 Cancri e" }, type: 'super_earth', diameter: 16000, distanceFromSun: 41, orbitalPeriod: 0.7, moons: 0, color: 0xff4433, size: 1.5, features: ["Siêu nóng", "Kim cương?"] },
    { id: 'gJ-504b', name: { vi: "GJ 504 b", en: "GJ 504 b" }, type: 'hot_jupiter', diameter: 150000, distanceFromSun: 230, orbitalPeriod: 167, moons: 0, color: 0x8ad9d9, size: 4.0, features: ["Sao Mộc nóng"] },
    { id: 'tau-bootis-b', name: { vi: "Tau Boötis b", en: "Tau Boötis b" }, type: 'hot_jupiter', diameter: 155000, distanceFromSun: 620, orbitalPeriod: 3.3, moons: 0, color: 0xd9a86a, size: 4.1, features: ["Sao Mộc nóng"] },
    { id: 'upsilon-andromedae-b', name: { vi: "Upsilon Andromedae b", en: "Upsilon Andromedae b" }, type: 'hot_jupiter', diameter: 145000, distanceFromSun: 460, orbitalPeriod: 4.6, moons: 0, color: 0xe6d98a, size: 3.9, features: ["Hệ đa hành tinh"] },
    { id: 'mu-arc-hor-a-b', name: { vi: "Mu Arae b", en: "Mu Arae b" }, type: 'hot_jupiter', diameter: 140000, distanceFromSun: 50, orbitalPeriod: 9.6, moons: 0, color: 0xd9a86a, size: 3.7, features: ["Hệ đa hành tinh"] },
    { id: 'hd-217107-b', name: { vi: "HD 217107 b", en: "HD 217107 b" }, type: 'mini_neptune', diameter: 35000, distanceFromSun: 53, orbitalPeriod: 48, moons: 0, color: 0x6a8aba, size: 2.5, features: ["Đại dương nước"] },
    { id: 'kepler-9d', name: { vi: "Kepler-9 d", en: "Kepler-9 d" }, type: 'super_earth', diameter: 14000, distanceFromSun: 260, orbitalPeriod: 1.6, moons: 0, color: 0x8ad9d9, size: 1.4, features: ["Hệ đa hành tinh"] },
    { id: 'kepler-11f', name: { vi: "Kepler-11 f", en: "Kepler-11 f" }, type: 'mini_neptune', diameter: 20000, distanceFromSun: 240, orbitalPeriod: 47, moons: 0, color: 0x6a8aba, size: 1.8, features: ["Hệ đa hành tinh"] },
    { id: 'gJ-436b', name: { vi: "GJ 436 b", en: "GJ 436 b" }, type: 'hot_neptune', diameter: 50000, distanceFromSun: 33, orbitalPeriod: 2.6, moons: 0, color: 0x8ad9d9, size: 2.8, features: ["Sao Hải Vương nóng", "Khí methane"] },
    { id: 'hats-9b', name: { vi: "HAT-P-9 b", en: "HAT-P-9 b" }, type: 'hot_jupiter', diameter: 145000, distanceFromSun: 320, orbitalPeriod: 3.9, moons: 0, color: 0xd9a86a, size: 3.9, features: ["Sao Mộc nóng"] },
    { id: 'wasp-17b', name: { vi: "WASP-17 b", en: "WASP-17 b" }, type: 'hot_jupiter', diameter: 165000, distanceFromSun: 480, orbitalPeriod: 3.7, moons: 0, color: 0xe6d98a, size: 4.3, features: ["Sao Mộc nóng", "Quay ngược"] },
    { id: 'wasp-121b', name: { vi: "WASP-121 b", en: "WASP-121 b" }, type: 'hot_jupiter', diameter: 170000, distanceFromSun: 890, orbitalPeriod: 1.3, moons: 0, color: 0xffaa55, size: 4.4, features: ["Sao Mộc nóng", "Mưa thủy tinh"] },
    { id: 'kepler-7b', name: { vi: "Kepler-7 b", en: "Kepler-7 b" }, type: 'hot_jupiter', diameter: 150000, distanceFromSun: 360, orbitalPeriod: 4.9, moons: 0, color: 0xe6d98a, size: 4.0, features: ["Sao Mộc nóng", "Phản xạ cao"] },
    { id: 'hats-12b', name: { vi: "HAT-P-12 b", en: "HAT-P-12 b" }, type: 'hot_jupiter', diameter: 130000, distanceFromSun: 150, orbitalPeriod: 4.3, moons: 0, color: 0xd9a86a, size: 3.5, features: ["Sao Mộc nóng"] },
    { id: 'gJ-3470-b', name: { vi: "GJ 3470 b", en: "GJ 3470 b" }, type: 'hot_neptune', diameter: 60000, distanceFromSun: 100, orbitalPeriod: 3.4, moons: 0, color: 0x8ad9d9, size: 3.2, features: ["Sao Hải Vương nóng"] },
    { id: 'kepler-76b', name: { vi: "Kepler-76 b", en: "Kepler-76 b" }, type: 'hot_jupiter', diameter: 155000, distanceFromSun: 380, orbitalPeriod: 1.5, moons: 0, color: 0xffaa55, size: 4.1, features: ["Sao Mộc nóng", "Đêm muộn"] },
    { id: 'wasp-19b', name: { vi: "WASP-19 b", en: "WASP-19 b" }, type: 'hot_jupiter', diameter: 140000, distanceFromSun: 280, orbitalPeriod: 0.8, moons: 0, color: 0xd9a86a, size: 3.7, features: ["Sao Mộc nóng", "Biến dạng"] },
    { id: 'kepler-13b', name: { vi: "Kepler-13 b", en: "Kepler-13 b" }, type: 'hot_jupiter', diameter: 160000, distanceFromSun: 420, orbitalPeriod: 1.8, moons: 0, color: 0xffaa55, size: 4.2, features: ["Sao Mộc nóng"] },
    { id: 'hats-4b', name: { vi: "HAT-P-4 b", en: "HAT-P-4 b" }, type: 'hot_jupiter', diameter: 145000, distanceFromSun: 290, orbitalPeriod: 3.6, moons: 0, color: 0xd9a86a, size: 3.9, features: ["Sao Mộc nóng"] },
    { id: 'kepler-51b', name: { vi: "Kepler-51 b", en: "Kepler-51 b" }, type: 'mini_neptune', diameter: 70000, distanceFromSun: 680, orbitalPeriod: 45, moons: 0, color: 0x6a8aba, size: 3.5, features: ["Siêu phồng", "Mật độ thấp"] }
];

// Quiz questions
const QUIZ_QUESTIONS = [
    {
        question: { vi: "Hành tinh nào lớn nhất trong hệ mặt trời?", en: "Which planet is the largest in the Solar System?" },
        options: ['Jupiter', 'Saturn', 'Neptune', 'Earth'],
        correct: 0,
        explanation: { vi: "Sao Mộc là hành tinh lớn nhất với đường kính 139.820 km.", en: "Jupiter is the largest with a diameter of 139,820 km." }
    },
    {
        question: { vi: "Hành tinh nào gần Mặt Trời nhất?", en: "Which planet is closest to the Sun?" },
        options: ['Venus', 'Earth', 'Mercury', 'Mars'],
        correct: 2,
        explanation: { vi: "Sao Thủy là hành tinh gần Mặt Trời nhất.", en: "Mercury is the closest planet to the Sun." }
    },
    {
        question: { vi: "Hành tinh nào có nhiệt độ cao nhất?", en: "Which planet has the highest temperature?" },
        options: ['Mercury', 'Mars', 'Venus', 'Jupiter'],
        correct: 2,
        explanation: { vi: "Sao Kim nóng nhất do hiệu ứng nhà kính mạnh.", en: "Venus is hottest due to strong greenhouse effect." }
    },
    {
        question: { vi: "Hành tinh nào có nhiều vệ tinh tự nhiên nhất?", en: "Which planet has the most natural moons?" },
        options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
        correct: 1,
        explanation: { vi: "Sao Thổ có 146 vệ tinh được xác nhận.", en: "Saturn has 146 confirmed moons." }
    },
    {
        question: { vi: "Hành tinh nào là hành tinh đá?", en: "Which is a terrestrial planet?" },
        options: ['Jupiter', 'Saturn', 'Earth', 'Uranus'],
        correct: 2,
        explanation: { vi: "Trái Đất là hành tinh đá.", en: "Earth is a rocky planet." }
    },
    {
        question: { vi: "Hành tinh nào có vành đai rõ rệt nhất?", en: "Which planet has the most prominent rings?" },
        options: ['Jupiter', 'Uranus', 'Saturn', 'Neptune'],
        correct: 2,
        explanation: { vi: "Sao Thổ có hệ vành đai đẹp và rõ rệt nhất.", en: "Saturn has the most beautiful and prominent ring system." }
    },
    {
        question: { vi: "Hành tinh nào quay nghiêng nhiều nhất?", en: "Which planet rotates on its side?" },
        options: ['Neptune', 'Uranus', 'Mars', 'Venus'],
        correct: 1,
        explanation: { vi: "Sao Thiên Vương quay nghiêng 98 độ.", en: "Uranus rotates at a 98-degree tilt." }
    },
    {
        question: { vi: "Hành tinh nào xa Mặt Trời nhất?", en: "Which planet is farthest from the Sun?" },
        options: ['Uranus', 'Neptune', 'Pluto', 'Saturn'],
        correct: 1,
        explanation: { vi: "Sao Hải Vương là hành tinh xa nhất.", en: "Neptune is the farthest planet." }
    }
];
