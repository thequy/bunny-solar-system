export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Câu hỏi về Mặt Trời
  {
    id: 1,
    question: "Mặt Trời là gì?",
    options: ["Một ngôi sao", "Một hành tinh", "Một vệ tinh", "Một thiên thạch"],
    correct: 0
  },
  {
    id: 2,
    question: "Mặt Trời có màu gì?",
    options: ["Xanh lá", "Đỏ", "Vàng cam", "Trắng"],
    correct: 2
  },
  {
    id: 3,
    question: "Trái Đất quay quanh Mặt Trời mất bao lâu?",
    options: ["1 ngày", "1 tháng", "1 năm", "1 tuần"],
    correct: 2
  },
  // Câu hỏi về các hành tinh
  {
    id: 4,
    question: "Hành tinh nào lớn nhất?",
    options: ["Sao Thổ", "Sao Mộc", "Sao Hải Vương", "Sao Thiên Vương"],
    correct: 1
  },
  {
    id: 5,
    question: "Hành tinh nào nhỏ nhất?",
    options: ["Sao Thủy", "Sao Hỏa", "Sao Kim", "Trái Đất"],
    correct: 0
  },
  {
    id: 6,
    question: "Hành tinh nào gần Mặt Trời nhất?",
    options: ["Sao Thủy", "Sao Kim", "Sao Hỏa", "Trái Đất"],
    correct: 0
  },
  {
    id: 7,
    question: "Hành tinh nào xa Mặt Trời nhất?",
    options: ["Sao Thổ", "Sao Mộc", "Sao Hải Vương", "Sao Thiên Vương"],
    correct: 2
  },
  {
    id: 8,
    question: "Chúng ta sống trên hành tinh nào?",
    options: ["Sao Kim", "Trái Đất", "Sao Hỏa", "Sao Thủy"],
    correct: 1
  },
  {
    id: 9,
    question: "Hành tinh nào được gọi là 'Hành tinh đỏ'?",
    options: ["Sao Thủy", "Sao Hỏa", "Sao Kim", "Sao Mộc"],
    correct: 1
  },
  {
    id: 10,
    question: "Hành tinh nào có vành đai đẹp nhất?",
    options: ["Sao Mộc", "Sao Thổ", "Sao Hải Vương", "Sao Thiên Vương"],
    correct: 1
  },
  {
    id: 11,
    question: "Hành tinh nào có sự sống?",
    options: ["Sao Hỏa", "Trái Đất", "Sao Kim", "Sao Thủy"],
    correct: 1
  },
  {
    id: 12,
    question: "Hành tinh nào lạnh nhất?",
    options: ["Sao Thủy", "Sao Hải Vương", "Sao Thiên Vương", "Sao Thổ"],
    correct: 1
  },
  {
    id: 13,
    question: "Hành tinh nào nóng nhất?",
    options: ["Sao Thủy", "Sao Hỏa", "Sao Kim", "Sao Mộc"],
    correct: 2
  },
  {
    id: 14,
    question: "Sao Thổ có màu gì?",
    options: ["Xanh", "Vàng nhạt", "Đỏ", "Tím"],
    correct: 1
  },
  {
    id: 15,
    question: "Hành tinh nào quay nhanh nhất quanh Mặt Trời?",
    options: ["Sao Thủy", "Trái Đất", "Sao Hỏa", "Sao Kim"],
    correct: 0
  },
  // Câu hỏi về Mặt Trăng
  {
    id: 16,
    question: "Trái Đất có bao nhiêu Mặt Trăng?",
    options: ["0", "1", "2", "3"],
    correct: 1
  },
  {
    id: 17,
    question: "Mặt Trăng sáng nhờ ánh sáng gì?",
    options: ["Đèn", "Mặt Trời", "Sao", "Lửa"],
    correct: 1
  },
  {
    id: 18,
    question: "Ai là người đầu tiên đặt chân lên Mặt Trăng?",
    options: ["Neil Armstrong", "Bill Gates", "Elon Musk", "Mark Zuckerberg"],
    correct: 0
  },
  {
    id: 19,
    question: "Mặt Trăng có bầu khí quyển không?",
    options: ["Có", "Không", "Có một ít", "Không chắc chắn"],
    correct: 1
  },
  {
    id: 20,
    question: "Mặt Trăng cách Trái Đất bao xa?",
    options: ["38 km", "384.000 km", "1 triệu km", "100 km"],
    correct: 1
  },
  // Câu hỏi về vệ tinh
  {
    id: 21,
    question: "Hành tinh nào có nhiều vệ tinh nhất?",
    options: ["Sao Mộc", "Sao Thổ", "Trái Đất", "Sao Hỏa"],
    correct: 1
  },
  {
    id: 22,
    question: "Sao Mộc có bao nhiêu vệ tinh?",
    options: ["Khoảng 50", "Khoảng 95", "Khoảng 20", "Khoảng 10"],
    correct: 1
  },
  {
    id: 23,
    question: "Sao Thổ có vành đai được làm bằng gì?",
    options: ["Đá", "Băng và đá", "Khí", "Lửa"],
    correct: 1
  },
  // Câu hỏi về sao chổi và thiên thạch
  {
    id: 24,
    question: "Sao chổi có đuôi sáng nhờ gì?",
    options: ["Nước đóng băng bốc hơi", "Lửa", "Đèn", "Điện"],
    correct: 0
  },
  {
    id: 25,
    question: "Thiên thạch là gì?",
    options: ["Một loại sao", "Đá từ không gian rơi xuống Trái Đất", "Một hành tinh", "Một loại mây"],
    correct: 1
  },
  {
    id: 26,
    question: "Vành đai tiểu hành tinh nằm ở đâu?",
    options: ["Giữa Sao Thủy và Sao Kim", "Giữa Sao Kim và Trái Đất", "Giữa Sao Hỏa và Sao Mộc", "Giữa Sao Mộc và Sao Thổ"],
    correct: 2
  },
  {
    id: 27,
    question: "Vành đai tiểu hành tinh có bao nhiêu tiểu hành tinh?",
    options: ["Khoảng 1 triệu", "Khoảng 100", "Khoảng 10", "Khoảng 10.000"],
    correct: 0
  },
  // Câu hỏi về không gian
  {
    id: 28,
    question: "Con người có thể sống trên hành tinh nào?",
    options: ["Chỉ Trái Đất", "Trái Đất và Sao Hỏa", "Tất cả hành tinh", "Không hành tinh nào"],
    correct: 0
  },
  {
    id: 29,
    question: "Ai là người đầu tiên bay vào vũ trụ?",
    options: ["Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "Elon Musk"],
    correct: 1
  },
  {
    id: 30,
    question: "Trạm Vũ trụ Quốc tế (ISS) bay ở độ cao bao nhiêu?",
    options: ["100 km", "400 km", "1000 km", "10.000 km"],
    correct: 1
  },
  {
    id: 31,
    question: "Tên lửa đưa con người lên Mặt Trăng có tên là gì?",
    options: ["Apollo", "SpaceX", "Sputnik", "Voyager"],
    correct: 0
  },
  {
    id: 32,
    question: "Trái Đất hình gì?",
    options: ["Vuông", "Tròn", "Bầu dục", "Tam giác"],
    correct: 1
  },
  {
    id: 33,
    question: "Bầu trời có màu gì vào ban ngày?",
    options: ["Đen", "Xanh", "Đỏ", "Vàng"],
    correct: 1
  },
  {
    id: 34,
    question: "Sao Hỏa có màu gì?",
    options: ["Xanh", "Vàng", "Đỏ", "Trắng"],
    correct: 2
  },
  {
    id: 35,
    question: "Sao Thiên Vương có màu gì?",
    options: ["Đỏ", "Xanh lục", "Vàng", "Tím"],
    correct: 1
  },
  {
    id: 36,
    question: "Sao Hải Vương có màu gì?",
    options: ["Xanh lam đậm", "Đỏ", "Vàng", "Trắng"],
    correct: 0
  },
  {
    id: 37,
    question: "Có bao nhiêu hành tinh trong hệ mặt trời?",
    options: ["7", "8", "9", "10"],
    correct: 1
  },
  {
    id: 38,
    question: "Hành tinh nào không có vệ tinh?",
    options: ["Sao Kim", "Trái Đất", "Sao Hỏa", "Sao Mộc"],
    correct: 0
  },
  {
    id: 39,
    question: "Ngày trên Sao Kim dài bao lâu?",
    options: ["1 ngày Trái Đất", "243 ngày Trái Đất", "24 giờ", "1 năm"],
    correct: 1
  },
  {
    id: 40,
    question: "Hành tinh nào quay nghiêng?",
    options: ["Sao Thủy", "Sao Hỏa", "Sao Thiên Vương", "Sao Mộc"],
    correct: 2
  },
  // Câu hỏi về các thiên thể khác
  {
    id: 41,
    question: "Pluto là gì?",
    options: ["Hành tinh", "Sao lùn", "Vệ tinh", "Sao chổi"],
    correct: 1
  },
  {
    id: 42,
    question: "Sao Bắc Đẩu dùng để làm gì?",
    options: ["Nấu ăn", "Chỉ hướng Bắc", "Chiếu sáng", "Trang trí"],
    correct: 1
  },
  {
    id: 43,
    question: "Dải Ngân Hà là gì?",
    options: ["Một con sông", "Thiên hà của chúng ta", "Một ngôi sao", "Một hành tinh"],
    correct: 1
  },
  {
    id: 44,
    question: "Mặt Trời có bao nhiêu tuổi?",
    options: ["4.6 tỷ năm", "1 triệu năm", "100 năm", "1000 năm"],
    correct: 0
  },
  {
    id: 45,
    question: "Hành tinh nào có ngày ngắn nhất?",
    options: ["Sao Thủy", "Sao Mộc", "Trái Đất", "Sao Hỏa"],
    correct: 1
  },
  {
    id: 46,
    question: "Vệ tinh Titan thuộc hành tinh nào?",
    options: ["Sao Mộc", "Sao Thổ", "Sao Hải Vương", "Sao Thiên Vương"],
    correct: 1
  },
  {
    id: 47,
    question: "Hành tinh nào có lớp băng?",
    options: ["Sao Thiên Vương", "Sao Hải Vương", "Cả hai", "Không hành tinh nào"],
    correct: 2
  },
  {
    id: 48,
    question: "Thứ tự các hành tinh từ Mặt Trời ra xa là gì?",
    options: ["Sao Thủy, Sao Kim, Trái Đất, Sao Hỏa, Sao Mộc, Sao Thổ, Sao Thiên Vương, Sao Hải Vương", "Trái Đất, Sao Kim, Sao Thủy, Sao Mộc, Sao Hỏa, Sao Thổ, Sao Hải Vương, Sao Thiên Vương", "Sao Mộc, Sao Thổ, Sao Thủy, Sao Kim, Trái Đất, Sao Hỏa, Sao Hải Vương, Sao Thiên Vương", "Sao Hỏa, Trái Đất, Sao Kim, Sao Thủy, Sao Mộc, Sao Thổ, Sao Thiên Vương, Sao Hải Vương"],
    correct: 0
  },
  {
    id: 49,
    question: "Hành tinh nào được gọi là 'Người khổng lồ băng'?",
    options: ["Sao Mộc", "Sao Thổ", "Sao Thiên Vương", "Sao Hải Vương"],
    correct: 2
  },
  {
    id: 50,
    question: "Hành tinh nào được gọi là 'Người khổng lồ khí'?",
    options: ["Sao Mộc và Sao Thổ", "Sao Thủy và Sao Kim", "Trái Đất và Sao Hỏa", "Sao Thiên Vương và Sao Hải Vương"],
    correct: 0
  },
  // Câu hỏi bổ sung
  {
    id: 51,
    question: "Nhiệt độ trên Mặt Trời là bao nhiêu?",
    options: ["100 độ C", "5.500 độ C", "1.000 độ C", "100.000 độ C"],
    correct: 1
  },
  {
    id: 52,
    question: "Sao Thủy có bầu khí quyển không?",
    options: ["Có", "Không", "Có một ít", "Không rõ"],
    correct: 1
  },
  {
    id: 53,
    question: "Đường kính Trái Đất là bao nhiêu km?",
    options: ["6.000 km", "12.742 km", "50.000 km", "100.000 km"],
    correct: 1
  },
  {
    id: 54,
    question: "Trái Đất quay quanh trục mất bao lâu?",
    options: ["1 năm", "1 ngày", "1 tháng", "1 giờ"],
    correct: 1
  },
  {
    id: 55,
    question: "Hành tinh nào có núi lửa cao nhất?",
    options: ["Trái Đất", "Sao Hỏa", "Sao Kim", "Sao Mộc"],
    correct: 1
  },
  {
    id: 56,
    question: "Sao Hỏa có nước không?",
    options: ["Có ở dạng băng", "Có ở dạng lỏng", "Không", "Có mây"],
    correct: 0
  },
  {
    id: 57,
    question: "Vệ tinh Phobos thuộc hành tinh nào?",
    options: ["Trái Đất", "Sao Hỏa", "Sao Mộc", "Sao Thổ"],
    correct: 1
  },
  {
    id: 58,
    question: "Hành tinh nào có Great Red Spot?",
    options: ["Sao Mộc", "Sao Thổ", "Sao Hải Vương", "Sao Hỏa"],
    correct: 0
  },
  {
    id: 59,
    question: "Kính viễn vọng không gian Hubble được đặt theo tên ai?",
    options: ["Edwin Hubble", "Albert Einstein", "Isaac Newton", "Neil Armstrong"],
    correct: 0
  },
  {
    id: 60,
    question: "Tên lửa đẩy SpaceX có tên là gì?",
    options: ["Atlas", "Falcon", "Saturn", "Titan"],
    correct: 1
  },
  {
    id: 61,
    question: "Hành tinh nào có mùa thay đổi?",
    options: ["Chỉ Trái Đất", "Tất cả hành tinh có trục nghiêng", "Không hành tinh nào", "Chỉ Sao Mộc"],
    correct: 1
  },
  {
    id: 62,
    question: "Sao Kim có màu gì?",
    options: ["Xanh", "Vàng nhạt", "Đỏ", "Trắng"],
    correct: 1
  },
  {
    id: 63,
    question: "Hành tinh nào quay ngược chiều?",
    options: ["Sao Kim", "Sao Hỏa", "Trái Đất", "Sao Mộc"],
    correct: 0
  },
  {
    id: 64,
    question: "Khoảng cách từ Trái Đất đến Mặt Trời là bao nhiêu?",
    options: ["150 triệu km", "50 triệu km", "300 triệu km", "1 triệu km"],
    correct: 0
  },
  {
    id: 65,
    question: "Hành tinh nào được khám phá bằng toán học trước khi nhìn thấy?",
    options: ["Sao Hải Vương", "Sao Thiên Vương", "Sao Mộc", "Sao Thổ"],
    correct: 0
  },
  {
    id: 66,
    question: "Sao chổi nổi tiếng nhất có tên gì?",
    options: ["Halley", "Newton", "Einstein", "Galileo"],
    correct: 0
  },
  {
    id: 67,
    question: "Thiên hà gần nhất với Ngân Hà là gì?",
    options: ["Andromeda", "Orion", "Pegasus", "Leo"],
    correct: 0
  },
  {
    id: 68,
    question: "Mặt Trời chiếm bao nhiêu % khối lượng hệ mặt trời?",
    options: ["50%", "75%", "99.86%", "25%"],
    correct: 2
  },
  {
    id: 69,
    question: "Hành tinh nào có chu kỳ quỹ đạo dài nhất?",
    options: ["Sao Mộc", "Sao Thổ", "Sao Hải Vương", "Sao Thiên Vương"],
    correct: 2
  },
  {
    id: 70,
    question: "Vệ tinh Europa thuộc hành tinh nào?",
    options: ["Sao Thổ", "Sao Mộc", "Sao Hải Vương", "Sao Hỏa"],
    correct: 1
  },
  {
    id: 71,
    question: "Hành tinh nào có bề mặt rắn nhất?",
    options: ["Sao Mộc", "Sao Thổ", "Sao Thủy", "Sao Hải Vương"],
    correct: 2
  },
  {
    id: 72,
    question: "Sao Thủy có bao nhiêu vệ tinh?",
    options: ["0", "1", "2", "Nhiều"],
    correct: 0
  },
  {
    id: 73,
    question: "Hành tinh nào có nhiệt độ bề mặt thay đổi nhiều nhất?",
    options: ["Sao Thủy", "Trái Đất", "Sao Hỏa", "Sao Kim"],
    correct: 0
  },
  {
    id: 74,
    question: "Tàu vũ trụ Voyager 1 đã bay đến đâu?",
    options: ["Sao Hỏa", "Vũ trụ liên thiên hà", "Sao Mộc và Sao Thổ", "Ra khỏi hệ mặt trời"],
    correct: 3
  },
  {
    id: 75,
    question: "Hành tinh nào có nhiều vành đai nhất?",
    options: ["Sao Mộc", "Sao Thổ", "Sao Hải Vương", "Sao Thiên Vương"],
    correct: 1
  },
  {
    id: 76,
    question: "Sao Hỏa có bao nhiêu vệ tinh?",
    options: ["0", "1", "2", "Nhiều"],
    correct: 2
  },
  {
    id: 77,
    question: "Hành tinh nào có nước lỏng trên bề mặt?",
    options: ["Sao Hỏa", "Trái Đất", "Sao Kim", "Không hành tinh nào"],
    correct: 1
  },
  {
    id: 78,
    question: "Nguyệt thực xảy ra khi nào?",
    options: ["Khi Mặt Trời bị che", "Khi Mặt Trăng đi vào bóng Trái Đất", "Khi có sao băng", "Khi có nhật thực"],
    correct: 1
  },
  {
    id: 79,
    question: "Nhật thực xảy ra khi nào?",
    options: ["Khi Mặt Trăng che Mặt Trời", "Khi Trái Đất che Mặt Trăng", "Khi có sao băng", "Khi có nguyệt thực"],
    correct: 0
  },
  {
    id: 80,
    question: "Hành tinh nào có chu kỳ ngày dài nhất?",
    options: ["Sao Mộc", "Sao Thủy", "Sao Thiên Vương", "Sao Hải Vương"],
    correct: 2
  },
  {
    id: 81,
    question: "Có bao nhiêu vệ tinh trong hệ mặt trời?",
    options: ["Khoảng 20", "Khoảng 200", "Khoảng 500", "Khoảng 50"],
    correct: 1
  },
  {
    id: 82,
    question: "Hành tinh lùn đầu tiên được phát hiện là gì?",
    options: ["Pluto", "Ceres", "Eris", "Haumea"],
    correct: 1
  },
  {
    id: 83,
    question: "Tàu vũ trụ đầu tiên đổ bộ xuống Sao Hỏa là gì?",
    options: ["Apollo 1", "Viking 1", "Voyager 1", "Hubble"],
    correct: 1
  },
  {
    id: 84,
    question: "Hành tinh nào có lớp khí quyển dày nhất?",
    options: ["Sao Mộc", "Sao Thổ", "Sao Kim", "Sao Hải Vương"],
    correct: 2
  },
  {
    id: 85,
    question: "Sao Kim còn được gọi là gì?",
    options: ["Sao Mai", "Sao Hôm", "Cả hai", "Sao Bắc"],
    correct: 2
  },
  {
    id: 86,
    question: "Trái Đất có bao nhiêu % là nước?",
    options: ["50%", "61%", "71%", "80%"],
    correct: 2
  },
  {
    id: 87,
    question: "Hành tinh nào có bão xoáy lớn nhất?",
    options: ["Sao Mộc", "Sao Thổ", "Sao Hải Vương", "Sao Thiên Vương"],
    correct: 0
  },
  {
    id: 88,
    question: "Sao Thổ nổi tiếng với gì?",
    options: ["Màu đỏ", "Vành đai", "Núi lửa", "Bão lớn"],
    correct: 1
  },
  {
    id: 89,
    question: "Vệ tinh Ganymede thuộc hành tinh nào?",
    options: ["Sao Mộc", "Sao Thổ", "Sao Hải Vương", "Sao Thiên Vương"],
    correct: 0
  },
  {
    id: 90,
    question: "Hành tinh nào có trục quay gần nhất với mặt phẳng quỹ đạo?",
    options: ["Sao Thủy", "Sao Kim", "Trái Đất", "Sao Hỏa"],
    correct: 0
  },
  {
    id: 91,
    question: "Sao Hỏa còn được gọi là gì?",
    options: ["Hành tinh xanh", "Hành tinh đỏ", "Hành tinh vàng", "Hành tinh trắng"],
    correct: 1
  },
  {
    id: 92,
    question: "Nơi nào trong hệ mặt trời có nhiều nước nhất ngoài Trái Đất?",
    options: ["Sao Hỏa", "Sao Mộc (vệ tinh Europa)", "Sao Thổ (vệ tinh Enceladus)", "Sao Kim"],
    correct: 1
  },
  {
    id: 93,
    question: "Hành tinh nào được khám phá gần đây nhất?",
    options: ["Sao Hải Vương", "Sao Thiên Vương", "Pluto", "Sao Mộc"],
    correct: 0
  },
  {
    id: 94,
    question: "Tàu vũ trụ New Horizons đã thám hiểm gì?",
    options: ["Sao Hỏa", "Pluto", "Sao Mộc", "Sao Thổ"],
    correct: 1
  },
  {
    id: 95,
    question: "Sao chổi quay quanh Mặt Trời có hình dạng gì?",
    options: ["Tròn", "Elip", "Vuông", "Tam giác"],
    correct: 1
  },
  {
    id: 96,
    question: "Hành tinh nào có khối lượng nhỏ nhất?",
    options: ["Sao Thủy", "Sao Hỏa", "Pluto", "Sao Kim"],
    correct: 0
  },
  {
    id: 97,
    question: "Tên gọi khác của dải Ngân Hà là gì?",
    options: ["Sông Ngân", "Thiên hà của chúng ta", "Cả hai", "Không có"],
    correct: 2
  },
  {
    id: 98,
    question: "Hành tinh nào có tốc độ quay quanh Mặt Trời nhanh nhất?",
    options: ["Sao Mộc", "Sao Thủy", "Trái Đất", "Sao Hỏa"],
    correct: 1
  },
  {
    id: 99,
    question: "Có bao nhiêu ngôi sao trong dải Ngân Hà?",
    options: ["Khoảng 100 triệu", "Khoảng 100 tỷ", "Khoảng 1.000", "Khoảng 1 triệu"],
    correct: 1
  },
  {
    id: 100,
    question: "Hành tinh nào được coi là hành tinh đôi với Sao Diêm Vương?",
    options: ["Eris", "Haumea", "Makemake", "Ceres"],
    correct: 0
  }
];
